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
// Arrays algorithm info
import { arrayOperationsInfo } from "@/core/algorithms/arrays/arrayOperationsInfo";
import { twoPointersInfo } from "@/core/algorithms/arrays/twoPointersInfo";
import { slidingWindowInfo } from "@/core/algorithms/arrays/slidingWindowInfo";
import { prefixSumInfo } from "@/core/algorithms/arrays/prefixSumInfo";
import { kadanesInfo } from "@/core/algorithms/arrays/kadanesInfo";
import { dutchNationalFlagInfo } from "@/core/algorithms/arrays/dutchNationalFlagInfo";
import { mooresVotingInfo } from "@/core/algorithms/arrays/mooresVotingInfo";
import { mergeSortedArraysInfo } from "@/core/algorithms/arrays/mergeSortedArraysInfo";
import { rotateArrayInfo } from "@/core/algorithms/arrays/rotateArrayInfo";
import { arrayRearrangementInfo } from "@/core/algorithms/arrays/arrayRearrangementInfo";
import { nextPermutationInfo } from "@/core/algorithms/arrays/nextPermutationInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDownUp, BarChart3 } from "lucide-react";

const defaultArray = [64, 34, 25, 12, 22, 11, 90];

// Algorithm-specific default arrays for better visualization
const algorithmDefaultArrays: Record<string, number[]> = {
  // Arrays topic
  "array-operations": [5, 12, 8, 3, 15, 7, 1, 10],
  "two-pointers": [1, 2, 3, 4, 5, 6, 7, 8, 9],  // Sorted for two-pointers
  "sliding-window": [2, 1, 5, 1, 3, 2, 8, 4, 6],
  "prefix-sum": [3, 1, 4, 1, 5, 9, 2, 6],
  "kadanes": [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  "dutch-national-flag": [2, 0, 1, 2, 0, 1, 0, 2, 1],
  "moores-voting": [2, 2, 1, 1, 2, 2, 2],
  "merge-sorted-arrays": [1, 3, 5, 7, 2, 4, 6, 8],
  "rotate-array": [1, 2, 3, 4, 5, 6, 7],
  "array-rearrangement": [1, -1, 3, -2, 5, -4, 7, -6],
  "next-permutation": [1, 2, 3, 4],
  // Sorting topic
  "counting-sort": [5, 3, 8, 3, 9, 1, 0, 4, 7, 2],
  "radix-sort": [27, 14, 6, 37, 5, 30, 16, 42],
  "bucket-sort": [42, 7, 99, 15, 76, 38, 58, 12],
  "pigeonhole-sort": [8, 3, 6, 2, 7, 4, 5, 1],
  "heap-sort": [13, 44, 1, 22, 22, 4, 42, 8, 11],
};

// Map algorithm IDs to their info
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const algorithmInfoMap: Record<string, any> = {
  // Arrays
  "array-operations": arrayOperationsInfo,
  "two-pointers": twoPointersInfo,
  "sliding-window": slidingWindowInfo,
  "prefix-sum": prefixSumInfo,
  "kadanes": kadanesInfo,
  "dutch-national-flag": dutchNationalFlagInfo,
  "moores-voting": mooresVotingInfo,
  "merge-sorted-arrays": mergeSortedArraysInfo,
  "rotate-array": rotateArrayInfo,
  "array-rearrangement": arrayRearrangementInfo,
  "next-permutation": nextPermutationInfo,
  // Sorting
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

// Map algorithm IDs to their category
const algorithmCategoryMap: Record<string, string> = {
  "array-operations": "arrays",
  "two-pointers": "arrays",
  "sliding-window": "arrays",
  "prefix-sum": "arrays",
  "kadanes": "arrays",
  "dutch-national-flag": "arrays",
  "moores-voting": "arrays",
  "merge-sorted-arrays": "arrays",
  "rotate-array": "arrays",
  "array-rearrangement": "arrays",
  "next-permutation": "arrays",
  "bubble-sort": "sorting",
  "selection-sort": "sorting",
  "insertion-sort": "sorting",
  "cocktail-shaker-sort": "sorting",
  "shell-sort": "sorting",
  "cycle-sort": "sorting",
  "merge-sort": "sorting",
  "quick-sort": "sorting",
  "heap-sort": "sorting",
  "counting-sort": "sorting",
  "radix-sort": "sorting",
  "bucket-sort": "sorting",
  "pigeonhole-sort": "sorting",
  "tim-sort": "sorting",
  "intro-sort": "sorting",
};

interface VisualizerClientProps {
  initialAlgorithm?: string;
  category?: string;
}

export function VisualizerClient({ initialAlgorithm, category }: VisualizerClientProps) {
  const t = useTranslations();

  const { currentSnapshot, loadAlgorithm, inputArray, algorithmId, status } =
    usePlayerStore();

  // Algorithm parameters state
  const [algorithmParams, setAlgorithmParams] = useState<Record<string, number | string>>({});

  const getDefaultArray = (algoId: string) => algorithmDefaultArrays[algoId] || defaultArray;

  // Determine the default algorithm based on category
  const getDefaultAlgorithmForCategory = (cat?: string) => {
    if (cat === "arrays") return "array-operations";
    if (cat === "sorting") return "bubble-sort";
    return "bubble-sort";
  };

  const selectedAlgorithm = algorithmId || initialAlgorithm || getDefaultAlgorithmForCategory(category);
  const currentInputArray = inputArray.length > 0 ? inputArray : getDefaultArray(selectedAlgorithm);

  const algorithm = getAlgorithm(selectedAlgorithm);
  const allAlgorithms = getAllAlgorithms();

  // Filter algorithms by category if provided
  const algorithms = category
    ? allAlgorithms.filter(algo => algorithmCategoryMap[algo.id] === category)
    : allAlgorithms;

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

  // Get formatted operation title for array operations
  const getOperationTitle = () => {
    const operation = algorithmParams?.operation as string || 'traversal';
    const targetIndex = algorithmParams?.targetIndex ?? 2;
    const newValue = algorithmParams?.newValue ?? 99;
    const searchValue = algorithmParams?.searchValue ?? 5;

    const titles: Record<string, string> = {
      'traversal': 'Traversal',
      'access-index': `Access Index (${targetIndex})`,
      'linear-search': `Searching Element (${searchValue})`,
      'find-min': 'Find Minimum',
      'find-max': 'Find Maximum',
      'insert-beginning': `Insert at Beginning (${newValue})`,
      'insert-middle': `Insert at Middle (${newValue})`,
      'insert-index': `Insert at Index ${targetIndex} (${newValue})`,
      'insert-end': `Insert at End (${newValue})`,
      'delete-beginning': 'Delete from Beginning',
      'delete-middle': 'Delete from Middle',
      'delete-index': `Delete at Index (${targetIndex})`,
      'delete-end': 'Delete from End',
      'update-beginning': `Update Beginning → ${newValue}`,
      'update-middle': `Update Middle → ${newValue}`,
      'update-index': `Update Index ${targetIndex} → ${newValue}`,
      'update-end': `Update End → ${newValue}`,
      'reverse': 'Reverse Array',
    };

    return titles[operation] || 'Array Operation';
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

          {/* Legend - context-aware based on algorithm type */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs ml-auto">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-compare)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparing")}</span>
            </div>
            {/* Show Window legend for sliding window/prefix sum, Swapping for sorting */}
            {(selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum') ? (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-secondary-500)" }} />
                <span className="text-[var(--text-secondary)]">Window</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-swap)" }} />
                <span className="text-[var(--text-secondary)]">{t("visualizer.swapping")}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-sorted)" }} />
              <span className="text-[var(--text-secondary)]">{selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum' ? 'Result' : t("visualizer.sorted")}</span>
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

        {/* MOBILE: Input Array after algorithm selector (< 1024px) */}
        <div className="lg:hidden p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <ArrayInputEditor
            value={currentInputArray}
            onChange={handleInputChange}
            onApply={() => handleRun()}
            algorithmParams={
              algorithm?.parameters && algorithm.parameters.length > 0 ? (
                <AlgorithmParams
                  parameters={algorithm.parameters}
                  values={algorithmParams}
                  onChange={setAlgorithmParams}
                />
              ) : undefined
            }
          />
        </div>

        {/* Array Bars Visualization */}
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          {/* Operation Display Header */}
          <div className="px-4 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
            {/* Operation Title - only for array-operations algorithm */}
            {selectedAlgorithm === 'array-operations' && (
              <div className="text-sm font-semibold text-[var(--color-primary-500)] mb-1">
                Operation: {getOperationTitle()}
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-[var(--text-secondary)] truncate">
                  {message || 'Ready'}
                </span>
              </div>
              {expression && (
                <span className="text-xs font-mono text-[var(--color-primary-500)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded flex-shrink-0">
                  {expression}
                </span>
              )}
            </div>
            {/* Show current variables if any */}
            {variables.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {variables.map((v, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono px-1.5 py-0.5 rounded ${v.highlight
                      ? 'bg-[var(--color-primary-500)]/20 text-[var(--color-primary-500)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                  >
                    {v.name}={v.value}
                  </span>
                ))}
              </div>
            )}
          </div>
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
        {/* Input editor with Algorithm Parameters */}
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-4">
          <ArrayInputEditor
            value={currentInputArray}
            onChange={handleInputChange}
            onApply={() => handleRun()}
            algorithmParams={
              algorithm?.parameters && algorithm.parameters.length > 0 ? (
                <AlgorithmParams
                  parameters={algorithm.parameters}
                  values={algorithmParams}
                  onChange={setAlgorithmParams}
                />
              ) : undefined
            }
          />
        </div>

        {/* Current Operation */}
        <CurrentOperation message={message} operationType={getOperationType()} />

        {/* Variables Panel */}
        <VariablesPanel variables={variables} expression={expression} />

        {/* Output Panel - Show when finished */}
        {status === 'finished' && (
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-green-500/50">
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {selectedAlgorithm === 'sliding-window' ? (
                <>Maximum sum: {auxiliaryState?.countArray?.reduce((sum, item) => sum + item.count, 0) || 0} at indices [{auxiliaryState?.countArray?.[0]?.index ?? 0}..{(auxiliaryState?.countArray?.[0]?.index ?? 0) + (auxiliaryState?.countArray?.length ?? 1) - 1}]</>
              ) : selectedAlgorithm === 'two-pointers' ? (
                'Two Pointers Result'
              ) : selectedAlgorithm === 'prefix-sum' && auxiliaryState?.countArray ? (
                <>Range sum: {auxiliaryState.countArray.reduce((sum, item) => sum + item.count, 0)} at indices [{auxiliaryState.countArray[0]?.index ?? 0}..{(auxiliaryState.countArray[0]?.index ?? 0) + auxiliaryState.countArray.length - 1}]</>
              ) : (
                'Output Array'
              )}
            </h3>
            {(selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum') && auxiliaryState?.countArray ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">Indices:</span>
                    <span className="font-mono text-sm text-[var(--color-primary-500)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      [{auxiliaryState.countArray[0]?.index ?? 0}..{(auxiliaryState.countArray[0]?.index ?? 0) + auxiliaryState.countArray.length - 1}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">Elements:</span>
                    <span className="font-mono text-sm text-[var(--color-secondary-500)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      [{auxiliaryState.countArray.map(item => item.count).join(', ')}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">{selectedAlgorithm === 'sliding-window' ? 'Max Sum:' : 'Range Sum:'}</span>
                    <span className="font-mono text-sm font-bold text-[var(--color-accent-sorted)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      {auxiliaryState.countArray.map(item => item.count).join(' + ')} = {auxiliaryState.countArray.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  {auxiliaryState.countArray.length} elements in {selectedAlgorithm === 'sliding-window' ? 'window' : 'range'}
                </p>
              </>
            ) : (
              <>
                <div className="font-mono text-sm text-[var(--color-primary-500)] bg-[var(--bg-secondary)] rounded-lg p-2 break-all">
                  [{arrayState.join(', ')}]
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  {arrayState.length} elements
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
