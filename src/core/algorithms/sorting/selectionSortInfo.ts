import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const selectionSortInfo: AlgorithmInfo = {
  id: "selection-sort",
  name: "Selection Sort",
  description:
    "Selection Sort divides the array into sorted and unsorted portions. It repeatedly finds the minimum element from the unsorted part and places it at the beginning of the unsorted section.",
  howItWorks:
    "Scan the unsorted portion to find the smallest element, then swap it with the first unsorted position. The sorted portion grows from left to right.",
  keyInsight:
    "Unlike Bubble Sort, Selection Sort makes only O(n) swaps, making it efficient when writes are expensive (like flash memory).",
  bestFor: [
    "Small arrays",
    "When memory writes are costly",
    "Simple implementation needs",
    "Teaching sorting concepts",
  ],
  avoidWhen: [
    "Large datasets (O(n²) comparisons)",
    "Nearly sorted arrays (no advantage)",
    "Stability is required (unstable sort)",
  ],
  funFact:
    "Selection Sort always makes exactly n-1 swaps regardless of the input, which is the minimum possible for a comparison-based sort!",
  optimizationTips: [
    "Find both min and max in one pass (double selection sort)",
    "Use for small subarrays in hybrid algorithms",
  ],
  tags: ["Comparison Sort", "In-Place", "Unstable", "O(n²)"],
};
