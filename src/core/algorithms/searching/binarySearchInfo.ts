import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Binary Search algorithm info card data
 */
export const binarySearchInfo: AlgorithmInfo = {
  id: "binary-search",
  name: "Binary Search",
  description:
    "Binary Search is an efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.",
  howItWorks:
    "Compare the target with the middle element. If they match, return the index. If the target is less than the middle, search the left half; if greater, search the right half. Repeat until found or the interval is empty.",
  keyInsight:
    "Each comparison eliminates half of the remaining elements, giving O(log n) time complexity. For an array of 1 million elements, at most 20 comparisons are needed!",
  bestFor: [
    "Large sorted arrays",
    "Frequent searches on static data",
    "Finding insertion points",
    "Range queries",
    "When O(log n) is required",
  ],
  avoidWhen: [
    "Array is unsorted (sorting cost may exceed benefit)",
    "Array is very small (< 10 elements)",
    "Data changes frequently",
    "Linked lists (no random access)",
  ],
  funFact:
    "Binary Search was first described by John Mauchly in 1946, but the first bug-free implementation wasn't published until 1962! Even Jon Bentley found that 90% of professional programmers couldn't write a correct binary search in 2 hours.",
  optimizationTips: [
    "Use (low + (high - low) / 2) instead of (low + high) / 2 to avoid overflow",
    "For duplicates, use lower/upper bound variants",
    "Consider interpolation search for uniformly distributed data",
    "Use iterative version to avoid stack overflow on large arrays",
  ],
  tags: ["Divide & Conquer", "Sorted", "O(log n)", "Efficient"],
};
