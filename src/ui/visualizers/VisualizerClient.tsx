"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePlayerStore } from "@/core/player";
import { getAlgorithm, getAllAlgorithms } from "@/core/algorithms/registry";
import { ArrayBars } from "@/ui/visualizers/ArrayBars";
import { PlayerControls } from "@/ui/components/PlayerControls";
import { CodePanel } from "@/ui/components/CodePanel";
import { ArrayInputEditor } from "@/ui/components/ArrayInputEditor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDownUp, BarChart3 } from "lucide-react";

const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45];

export function VisualizerClient() {
  const t = useTranslations();

  const {
    currentSnapshot,
    loadAlgorithm,
    inputArray,
    algorithmId,
  } = usePlayerStore();

  // Use store's inputArray or default if empty
  const currentInputArray = inputArray.length > 0 ? inputArray : defaultArray;
  const selectedAlgorithm = algorithmId || "bubble-sort";

  const algorithm = getAlgorithm(selectedAlgorithm);
  const algorithms = getAllAlgorithms();

  // Load algorithm - get fresh state from store
  const handleRun = () => {
    const state = usePlayerStore.getState();
    const input = state.inputArray.length > 0 ? state.inputArray : defaultArray;
    const algoId = state.algorithmId || "bubble-sort";
    if (input.length >= 2) {
      loadAlgorithm(algoId, input);
    }
  };

  const handleAlgorithmChange = (algoId: string) => {
    const input = usePlayerStore.getState().inputArray;
    const finalInput = input.length > 0 ? input : defaultArray;
    loadAlgorithm(algoId, finalInput);
  };

  const handleInputChange = (values: number[]) => {
    // Store the values in Zustand store
    usePlayerStore.setState({ inputArray: values });
  };

  // Auto-load on mount
  useEffect(() => {
    handleRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayState = currentSnapshot?.arrayState ?? currentInputArray;
  const markedIndices = currentSnapshot?.markedIndices ?? new Map();
  const highlightedLines = currentSnapshot?.highlightedLines ?? [];
  const message = currentSnapshot?.message ?? t("player.ready");
  const metrics = currentSnapshot?.metrics ?? { comparisons: 0, swaps: 0 };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main visualizer area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          {/* Algorithm selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                {algorithm?.name ?? t("visualizer.selectAlgorithm")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {algorithms.map((algo) => (
                <DropdownMenuItem
                  key={algo.id}
                  onClick={() => handleAlgorithmChange(algo.id)}
                  className={selectedAlgorithm === algo.id ? "bg-[var(--bg-tertiary)]" : ""}
                >
                  {algo.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "var(--color-accent-compare)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparing")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "var(--color-accent-swap)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.swapping")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "var(--color-accent-sorted)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.sorted")}</span>
            </div>
          </div>

          {/* Metrics display */}
          <div className="flex items-center gap-4 ml-auto text-sm">
            <div className="flex items-center gap-1.5">
              <ArrowDownUp className="h-4 w-4 text-[var(--color-accent-compare)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparisons")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {metrics.comparisons}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDownUp className="h-4 w-4 text-[var(--color-accent-swap)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.swaps")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {metrics.swaps}
              </span>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
            <p className="text-sm text-[var(--text-secondary)]">{message}</p>
          </div>
          <div className="h-[300px] p-4">
            <ArrayBars
              values={arrayState}
              markedIndices={markedIndices}
            />
          </div>
        </div>

        {/* Player controls */}
        <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <PlayerControls />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Input editor */}
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <ArrayInputEditor
            value={currentInputArray}
            onChange={handleInputChange}
            onApply={() => handleRun()}
          />
        </div>

        {/* Pseudocode */}
        {algorithm && (
          <CodePanel
            lines={algorithm.pseudocodeLines}
            highlightedLines={highlightedLines}
          />
        )}

        {/* Complexity info */}
        {algorithm && (
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
              {t("visualizer.complexity")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeBest")}</span>
                <span className="font-mono text-[var(--text-primary)]">
                  {algorithm.timeComplexity.best}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeAvg")}</span>
                <span className="font-mono text-[var(--text-primary)]">
                  {algorithm.timeComplexity.average}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeWorst")}</span>
                <span className="font-mono text-[var(--text-primary)]">
                  {algorithm.timeComplexity.worst}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border-primary)]">
                <span className="text-[var(--text-secondary)]">{t("visualizer.space")}</span>
                <span className="font-mono text-[var(--text-primary)]">
                  {algorithm.spaceComplexity}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

