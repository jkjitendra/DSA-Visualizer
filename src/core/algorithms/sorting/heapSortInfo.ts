import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const heapSortInfo: AlgorithmInfo = {
  id: "heap-sort",
  name: "Heap Sort",
  description:
    "Heap Sort uses a binary heap data structure. It first builds a max-heap, then repeatedly extracts the maximum element and rebuilds the heap.",
  howItWorks:
    "1. Build a max-heap from the array. 2. The root is the maximum. 3. Swap root with last element, reduce heap size, and heapify. 4. Repeat until sorted.",
  keyInsight:
    "The heap property guarantees the maximum is always at the root. By repeatedly removing the root, we get elements in sorted order.",
  bestFor: [
    "Guaranteed O(n log n) performance",
    "In-place sorting (O(1) space)",
    "Systems with limited memory",
    "Priority queue operations",
  ],
  avoidWhen: [
    "Stability is required (unstable)",
    "Cache efficiency matters (poor locality)",
    "Nearly sorted data (no advantage)",
  ],
  funFact:
    "Heap Sort has the best of both worlds - O(n log n) guaranteed like Merge Sort, but O(1) space like Quick Sort! It's the fallback for Intro Sort.",
  optimizationTips: [
    "Floyd's heap construction runs in O(n), not O(n log n)",
    "Bottom-up heapify is more efficient than top-down",
    "Used in Intro Sort as fallback when Quick Sort degrades",
  ],
  tags: ["Comparison Sort", "In-Place", "Unstable", "O(n log n)"],
};
