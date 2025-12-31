import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const mergeSortInfo: AlgorithmInfo = {
  id: "merge-sort",
  name: "Merge Sort",
  description:
    "Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges them back together in sorted order.",
  howItWorks:
    "1. Divide the array into two halves. 2. Recursively sort each half. 3. Merge the two sorted halves into one sorted array.",
  keyInsight:
    "The power of Merge Sort comes from the merge step - combining two sorted arrays into one sorted array takes only O(n) time.",
  bestFor: [
    "Large datasets",
    "Linked lists (O(1) space possible)",
    "External sorting (files on disk)",
    "When stable sort is required",
  ],
  avoidWhen: [
    "Memory is limited (uses O(n) extra space)",
    "Small arrays (overhead not worth it)",
    "In-place sorting is required",
  ],
  funFact:
    "Merge Sort was invented by John von Neumann in 1945! It's also the basis for Python's Tim Sort and is used for parallel sorting on multiple processors.",
  optimizationTips: [
    "Switch to Insertion Sort for small subarrays (< 10 elements)",
    "Use natural runs detection (Tim Sort) for nearly sorted data",
    "For linked lists, merge sort can be done in O(1) extra space",
  ],
  tags: ["Comparison Sort", "Stable", "Divide & Conquer", "O(n log n)"],
};
