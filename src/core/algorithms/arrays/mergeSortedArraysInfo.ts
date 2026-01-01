import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Merge Sorted Arrays info card data
 */
export const mergeSortedArraysInfo: AlgorithmInfo = {
  id: "merge-sorted-arrays",
  name: "Merge Two Sorted Arrays",
  description:
    "Merge two sorted arrays into a single sorted array in O(n+m) time. Uses the two-pointer technique to compare elements from both arrays and build the result.",
  howItWorks:
    "Use two pointers, one for each array. Compare elements at both pointers, add the smaller one to the result, and advance that pointer. After one array is exhausted, append the remaining elements from the other.",
  keyInsight:
    "Since both arrays are already sorted, we only need to compare the current elements. This is the core merge operation used in Merge Sort!",
  bestFor: [
    "Combining sorted data from multiple sources",
    "Merge step in Merge Sort",
    "Sorted list intersection problems",
    "External sorting with limited memory",
  ],
  avoidWhen: [
    "Arrays aren't sorted (sort first)",
    "Need in-place merge with no extra space",
    "One array is much larger (consider binary insertion)",
  ],
  funFact:
    "This merge operation is the heart of Merge Sort! It's also used in external sorting algorithms that merge sorted runs from disk.",
  optimizationTips: [
    "For in-place merge, start from the end to avoid overwriting",
    "Can use gap method for in-place O(1) space merge",
    "If one array is much smaller, binary search insertion may be faster",
  ],
  tags: ["Merging", "O(n+m)", "Two Pointers"],
};
