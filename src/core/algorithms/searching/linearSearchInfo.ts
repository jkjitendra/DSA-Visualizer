import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Linear Search algorithm info card data
 */
export const linearSearchInfo: AlgorithmInfo = {
  id: "linear-search",
  name: "Linear Search",
  description:
    "Linear Search is the simplest searching algorithm. It sequentially checks each element of the array until a match is found or the array is exhausted. Also known as Sequential Search.",
  howItWorks:
    "Start from the first element and compare each element with the target value. If a match is found, return the index. If the end of the array is reached without finding the target, return -1.",
  keyInsight:
    "Linear Search works on both sorted and unsorted arrays, making it versatile but potentially slow for large datasets.",
  bestFor: [
    "Small arrays (< 100 elements)",
    "Unsorted data where sorting is expensive",
    "When you need to find all occurrences",
    "Linked lists (no random access)",
    "Simple implementation requirements",
  ],
  avoidWhen: [
    "Large sorted datasets (use Binary Search)",
    "Frequent searches on same data",
    "Performance is critical",
    "Data can be sorted efficiently",
  ],
  funFact:
    "Despite its O(n) complexity, Linear Search is often faster than Binary Search for very small arrays (< 10 elements) due to its simplicity and cache-friendly sequential access pattern!",
  optimizationTips: [
    "Move found elements to front (self-organizing list)",
    "Use Sentinel Search to eliminate bounds checking",
    "Search from both ends simultaneously (Bidirectional)",
    "Stop early if array is sorted and current element > target",
  ],
  tags: ["Sequential", "Unsorted", "O(n)", "Simple"],
};
