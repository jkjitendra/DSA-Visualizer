"use client";

import { useEffect, useState } from "react";
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
import { AlgorithmView } from "@/ui/visualizers/views/AlgorithmView";
import { AlgorithmParams } from "@/ui/components/AlgorithmParams";
import { bubbleSortInfo } from "@/core/algorithms/sorting/bubbleSortInfo";
import { selectionSortInfo } from "@/core/algorithms/sorting/selectionSortInfo";
import { insertionSortInfo } from "@/core/algorithms/sorting/insertionSortInfo";
import { cocktailShakerSortInfo } from "@/core/algorithms/sorting/cocktailShakerSortInfo";
import { shellSortInfo } from "@/core/algorithms/sorting/shellSortInfo";
import { cycleSortInfo } from "@/core/algorithms/sorting/cycleSortInfo";
import { mergeSortInfo } from "@/core/algorithms/sorting/mergeSortInfo";
import { quickSortInfo } from "@/core/algorithms/sorting/quickSortInfo";
import { heapSortInfo } from "@/core/algorithms/sorting/heapSortInfo";
import { countingSortInfo } from "@/core/algorithms/sorting/countingSortInfo";
import { radixSortInfo } from "@/core/algorithms/sorting/radixSortInfo";
import { bucketSortInfo } from "@/core/algorithms/sorting/bucketSortInfo";
import { pigeonholeSortInfo } from "@/core/algorithms/sorting/pigeonholeSortInfo";
import { timSortInfo } from "@/core/algorithms/sorting/timSortInfo";
import { introSortInfo } from "@/core/algorithms/sorting/introSortInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDownUp, BarChart3 } from "lucide-react";

const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45];

// Algorithm-specific default arrays for better visualization
const algorithmDefaultArrays: Record<string, number[]> = {
  "counting-sort": [5, 3, 8, 3, 9, 1, 0, 4, 7, 2],
  "radix-sort": [27, 14, 6, 37, 5, 30, 16, 42],
  "bucket-sort": [42, 7, 99, 15, 76, 38, 58, 12],
  "pigeonhole-sort": [8, 3, 6, 2, 7, 4, 5, 1],
  "heap-sort": [13, 44, 1, 22, 22, 4, 42, 8, 11],
};

// Map algorithm IDs to their info
const algorithmInfoMap: Record<string, typeof bubbleSortInfo> = {
  "bubble-sort": bubbleSortInfo,
  "selection-sort": selectionSortInfo,
  "insertion-sort": insertionSortInfo,
  "cocktail-shaker-sort": cocktailShakerSortInfo,
  "shell-sort": shellSortInfo,
  "cycle-sort": cycleSortInfo,
  "merge-sort": mergeSortInfo,
  "quick-sort": quickSortInfo,
  "heap-sort": heapSortInfo,
  "counting-sort": countingSortInfo,
  "radix-sort": radixSortInfo,
  "bucket-sort": bucketSortInfo,
  "pigeonhole-sort": pigeonholeSortInfo,
  "tim-sort": timSortInfo,
  "intro-sort": introSortInfo,
};

interface VisualizerClientProps {
  initialAlgorithm?: string;
}

export function VisualizerClient({ initialAlgorithm }: VisualizerClientProps) {
  const t = useTranslations();

  const { currentSnapshot, loadAlgorithm, inputArray, algorithmId } =
    usePlayerStore();

  // Algorithm parameters state
  const [algorithmParams, setAlgorithmParams] = useState<Record<string, number | string>>({});

  const getDefaultArray = (algoId: string) => algorithmDefaultArrays[algoId] || defaultArray;
  const selectedAlgorithm = algorithmId || initialAlgorithm || "bubble-sort";
  const currentInputArray = inputArray.length > 0 ? inputArray : getDefaultArray(selectedAlgorithm);

  const algorithm = getAlgorithm(selectedAlgorithm);
  const algorithms = getAllAlgorithms();
  const algorithmInfo = algorithmInfoMap[selectedAlgorithm];

  // Load initial algorithm from URL param on mount
  useEffect(() => {
    if (initialAlgorithm) {
      loadAlgorithm(initialAlgorithm, getDefaultArray(initialAlgorithm));
    }
    // eslint-disable-next-line react-hooks-exhaustive-deps
  }, [initialAlgorithm]);

  // Reset params when algorithm changes
  useEffect(() => {
    setAlgorithmParams({});
  }, [selectedAlgorithm]);

  const handleRun = () => {
    const state = usePlayerStore.getState();
    const algoId = state.algorithmId || "bubble-sort";
    const input = state.inputArray.length > 0 ? state.inputArray : getDefaultArray(algoId);
    if (input.length >= 2) {
      loadAlgorithm(algoId, input, algorithmParams);
    }
  };

  const handleAlgorithmChange = (algoId: string) => {
    // Always use the algorithm-specific default when switching
    const algoDefault = getDefaultArray(algoId);
    usePlayerStore.setState({ inputArray: algoDefault });
    loadAlgorithm(algoId, algoDefault);
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
  const auxiliaryState = currentSnapshot?.auxiliaryState;

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

        {/* Algorithm-Specific Visualization */}
        {auxiliaryState && (
          <AlgorithmView auxiliaryState={auxiliaryState} />
        )}

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

        {/* Algorithm Parameters */}
        {algorithm?.parameters && algorithm.parameters.length > 0 && (
          <AlgorithmParams
            parameters={algorithm.parameters}
            values={algorithmParams}
            onChange={setAlgorithmParams}
          />
        )}

        {/* Current Operation */}
        <CurrentOperation message={message} operationType={getOperationType()} />

        {/* Variables Panel */}
        <VariablesPanel variables={variables} expression={expression} />
      </div>
    </div>
  );
}
