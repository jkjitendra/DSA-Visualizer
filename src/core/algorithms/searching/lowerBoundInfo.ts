import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Lower Bound algorithm info card data
 */
export const lowerBoundInfo: AlgorithmInfo = {
  id: "lower-bound",
  name: "Lower Bound",
  description:
    "Lower Bound finds the first position where a target value could be inserted to maintain sorted order. If the target exists, it returns the index of the first occurrence. Equivalent to std::lower_bound in C++.",
  howItWorks:
    "Use binary search to find the leftmost position where target could be inserted. When arr[mid] >= target, we have a potential answer but continue searching left for an earlier occurrence.",
  keyInsight:
    "Even when we find the target, we don't stop immediately - we continue searching left to find the FIRST occurrence. This is different from standard binary search.",
  bestFor: [
    "Finding first occurrence in sorted array with duplicates",
    "Finding insertion point for maintaining sorted order",
    "Range queries (lower bound of a range)",
    "Counting elements less than target",
  ],
  avoidWhen: [
    "Array has no duplicates (standard binary search is simpler)",
    "You need the last occurrence (use Upper Bound)",
    "Array is unsorted",
  ],
  funFact:
    "Lower Bound is one of the most commonly used STL algorithms in competitive programming! It's often combined with upper_bound to find the count of a specific element: count = upper_bound(x) - lower_bound(x).",
  optimizationTips: [
    "Use with upper_bound to count occurrences: count = upper - lower",
    "Can be used to implement a sorted set's ceiling function",
    "Remember: lower_bound returns first element >= target",
  ],
  tags: ["Binary Search", "First Occurrence", "O(log n)", "STL"],
};
