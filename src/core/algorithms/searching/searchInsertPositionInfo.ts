import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Search Insert Position algorithm info card data
 */
export const searchInsertPositionInfo: AlgorithmInfo = {
  id: "search-insert-position",
  name: "Search Insert Position",
  description:
    "Search Insert Position finds the index where a target value should be inserted into a sorted array to maintain sorted order. If the target already exists, it returns the existing index.",
  howItWorks:
    "Use binary search to narrow down the position. If target is found, return its index. Otherwise, when the search ends, 'low' points to the position where target should be inserted to keep the array sorted.",
  keyInsight:
    "This is essentially lower_bound - finding the first position where we could insert the target. It's the foundation for maintaining sorted collections efficiently.",
  bestFor: [
    "Maintaining sorted arrays",
    "Implementing sorted data structures",
    "Finding predecessor/successor queries",
    "Range-based insertions",
  ],
  avoidWhen: [
    "Frequent insertions (consider balanced BST instead)",
    "Unsorted data",
    "When exact element is always expected to exist",
  ],
  funFact:
    "This is LeetCode problem #35 and is one of the most classic binary search problems! It teaches the fundamental concept that binary search can find more than just exact matches - it can find boundaries and insertion points.",
  optimizationTips: [
    "Identical to lower_bound for non-existing elements",
    "Can be extended to handle duplicates",
    "Consider using for batch insertions then sort",
  ],
  tags: ["Binary Search", "Insertion", "O(log n)", "Classic"],
};
