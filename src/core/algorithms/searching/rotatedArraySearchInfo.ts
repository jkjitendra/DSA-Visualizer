import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Rotated Array Search algorithm info card data
 */
export const rotatedArraySearchInfo: AlgorithmInfo = {
  id: "rotated-array-search",
  name: "Rotated Array Search",
  description:
    "Search in a sorted array that has been rotated at some pivot point. For example, [4,5,6,7,0,1,2] is [0,1,2,4,5,6,7] rotated at index 4. Uses modified binary search.",
  howItWorks:
    "At each step, one half is always sorted. Identify the sorted half, check if target is within that range. If yes, search there; otherwise, search the other half.",
  keyInsight:
    "In a rotated sorted array, at least one half (left or right of mid) is always properly sorted. We can use this property to decide which half to search.",
  bestFor: [
    "Searching in rotated sorted arrays",
    "Circular buffer searches",
    "When data was sorted but rotation point is unknown",
    "Log file searching (when logs wrap around)",
  ],
  avoidWhen: [
    "Array is not rotated (use standard binary search)",
    "Array has many duplicates (worst case O(n))",
    "Array is unsorted",
  ],
  funFact:
    "This is LeetCode problem #33 and is a favorite Amazon interview question! The key insight came from realizing that rotation creates two sorted subarrays.",
  optimizationTips: [
    "Handle duplicates carefully - may need O(n) worst case",
    "Can combine with finding rotation point first",
    "Consider edge case: no rotation (still sorted)",
  ],
  tags: ["Binary Search", "Rotated Array", "O(log n)", "Classic"],
};
