import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Upper Bound algorithm info card data
 */
export const upperBoundInfo: AlgorithmInfo = {
  id: "upper-bound",
  name: "Upper Bound",
  description:
    "Upper Bound finds the first position where a value greater than target could be inserted. For finding the last occurrence of a target, we return upper_bound - 1. Equivalent to std::upper_bound in C++.",
  howItWorks:
    "Use binary search to find the first element strictly greater than target. When arr[mid] <= target, we continue searching right. The position before this is the last occurrence.",
  keyInsight:
    "Upper Bound finds where target 'ends' in the array, while Lower Bound finds where it 'starts'. Together they define the range of duplicate elements.",
  bestFor: [
    "Finding last occurrence in sorted array with duplicates",
    "Counting elements less than or equal to target",
    "Range queries (upper bound of a range)",
    "Finding predecessor in sorted set",
  ],
  avoidWhen: [
    "Array has no duplicates (standard binary search is simpler)",
    "You need the first occurrence (use Lower Bound)",
    "Array is unsorted",
  ],
  funFact:
    "The combination of lower_bound and upper_bound is called 'equal_range' in C++ STL. It returns a pair of iterators defining the range of elements equal to the target!",
  optimizationTips: [
    "upper_bound - lower_bound gives count of target in array",
    "Can be used to implement sorted set's floor function",
    "Remember: upper_bound returns first element > target",
  ],
  tags: ["Binary Search", "Last Occurrence", "O(log n)", "STL"],
};
