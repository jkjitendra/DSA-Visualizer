"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePlayerStore } from "@/core/player";
import { getAlgorithm, getAllAlgorithms } from "@/core/algorithms/registry";
import { ArrayBars } from "@/ui/visualizers/ArrayBars";
import { PlayerControls } from "@/ui/components/PlayerControls";
import { CodePanel } from "@/ui/components/CodePanel";
import { ArrayInputEditor } from "@/ui/components/ArrayInputEditor";
import { VariablesPanel } from "@/ui/components/VariablesPanel";
import { CurrentOperation } from "@/ui/components/CurrentOperation";
import { AlgorithmInfoCard } from "@/ui/components/AlgorithmInfoCard";
import { bubbleSortInfo } from "@/core/algorithms/sorting/bubbleSortInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDownUp, BarChart3 } from "lucide-react";

const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45];

// Map algorithm IDs to their info
const algorithmInfoMap: Record<string, typeof bubbleSortInfo> = {
  "bubble-sort": bubbleSortInfo,
};

export function VisualizerClient() {
  const t = useTranslations();

  const { currentSnapshot, loadAlgorithm, inputArray, algorithmId } =
    usePlayerStore();

  const currentInputArray = inputArray.length > 0 ? inputArray : defaultArray;
  const selectedAlgorithm = algorithmId || "bubble-sort";

  const algorithm = getAlgorithm(selectedAlgorithm);
  const algorithms = getAllAlgorithms();
  const algorithmInfo = algorithmInfoMap[selectedAlgorithm];

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
    usePlayerStore.setState({ inputArray: values });
  };

  useEffect(() => {
    handleRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayState = currentSnapshot?.arrayState ?? currentInputArray;
  const markedIndices = currentSnapshot?.markedIndices ?? new Map();
  const highlightedLines = currentSnapshot?.highlightedLines ?? [];
  const message = currentSnapshot?.message ?? t("player.ready");
  const metrics = currentSnapshot?.metrics ?? { comparisons: 0, swaps: 0 };
  const pointers = currentSnapshot?.pointers ?? [];
  const variables = currentSnapshot?.variables ?? [];
  const expression = currentSnapshot?.expression;

  const getOperationType = () => {
    if (message?.toLowerCase().includes("swap")) return "swap" as const;
    if (message?.toLowerCase().includes("compar")) return "compare" as const;
    if (message?.toLowerCase().includes("sorted") || message?.toLowerCase().includes("final"))
      return "mark" as const;
    return "idle" as const;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* LEFT SIDEBAR - Static Content (Desktop only) */}
      <div className="hidden lg:block lg:col-span-3 space-y-4 order-2 lg:order-1">
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
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.best}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeAvg")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.average}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeWorst")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.worst}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border-primary)]">
                <span className="text-[var(--text-secondary)]">{t("visualizer.space")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CENTER - Main Visualization */}
      <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
        {/* MOBILE: Input Array on top (< 1024px) */}
        <div className="lg:hidden p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <ArrayInputEditor
            value={currentInputArray}
            onChange={handleInputChange}
            onApply={() => handleRun()}
          />
        </div>

        {/* Header bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          {/* Algorithm selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden xs:inline">{algorithm?.name ?? t("visualizer.selectAlgorithm")}</span>
                <span className="xs:hidden">{algorithm?.name?.split(" ")[0] ?? "Select"}</span>
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

          {/* Legend - wrap on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs ml-auto">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-compare)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparing")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-swap)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.swapping")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-sorted)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.sorted")}</span>
            </div>
          </div>

          {/* Metrics - left aligned when wrapped */}
          <div className="flex items-center gap-3 sm:gap-4 sm:ml-auto text-xs sm:text-sm ml-auto">
            <div className="flex items-center gap-1">
              <ArrowDownUp className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--color-accent-compare)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparisons")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">{metrics.comparisons}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownUp className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--color-accent-swap)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.swaps")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">{metrics.swaps}</span>
            </div>
          </div>
        </div>

        {/* Array Bars Visualization */}
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <div className="h-[280px] sm:h-[320px] p-2 sm:p-4">
            <ArrayBars values={arrayState} markedIndices={markedIndices} pointers={pointers} />
          </div>
        </div>

        {/* Player controls */}
        <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <PlayerControls />
        </div>

        {/* MOBILE: Variables Panel (< 1024px) */}
        <div className="lg:hidden">
          <CurrentOperation message={message} operationType={getOperationType()} />
        </div>
        <div className="lg:hidden">
          <VariablesPanel variables={variables} expression={expression} />
        </div>

        {/* MOBILE: Pseudocode (< 1024px) */}
        <div className="lg:hidden">
          {algorithm && (
            <CodePanel lines={algorithm.pseudocodeLines} highlightedLines={highlightedLines} />
          )}
        </div>

        {/* MOBILE: Complexity (< 1024px) */}
        <div className="lg:hidden">
          {algorithm && (
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
              <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                {t("visualizer.complexity")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeBest")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.best}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeAvg")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.average}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeWorst")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.worst}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--border-primary)]">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.space")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Algorithm Info Card */}
        {algorithmInfo && <AlgorithmInfoCard info={algorithmInfo} />}
      </div>

      {/* RIGHT SIDEBAR - Dynamic Content (Desktop only) */}
      <div className="hidden lg:block lg:col-span-3 space-y-4 order-3">
        {/* Input editor */}
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <ArrayInputEditor
            value={currentInputArray}
            onChange={handleInputChange}
            onApply={() => handleRun()}
          />
        </div>

        {/* Current Operation */}
        <CurrentOperation message={message} operationType={getOperationType()} />

        {/* Variables Panel */}
        <VariablesPanel variables={variables} expression={expression} />
      </div>
    </div>
  );
}
