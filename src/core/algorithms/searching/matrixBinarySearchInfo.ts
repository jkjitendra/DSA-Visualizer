import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Matrix Binary Search algorithm info card data
 */
export const matrixBinarySearchInfo: AlgorithmInfo = {
  id: "matrix-binary-search",
  name: "Matrix Binary Search",
  description:
    "Searches for a target in a row-wise and column-wise sorted matrix using the staircase algorithm starting from the top-right corner.",
  howItWorks:
    "Start from the top-right corner. If current element equals target, return. If current > target, move left (eliminate column). If current < target, move down (eliminate row). Repeat until found or out of bounds.",
  keyInsight:
    "Each comparison eliminates an entire row or column, making the search efficient despite being a 2D structure.",
  bestFor: [
    "Row-wise and column-wise sorted matrices",
    "2D data with sorted dimensions",
    "Interview questions like 'Search a 2D Matrix II'",
    "Large matrices where O(m + n) beats O(m * n)",
  ],
  avoidWhen: [
    "Matrix is fully sorted (use flattened binary search O(log mn))",
    "Matrix is unsorted",
    "Very small matrices (brute force is simpler)",
    "Sparse matrices with special structure",
  ],
  funFact:
    "This algorithm is also called the 'staircase search' due to the zig-zag path it traces from corner to corner. It's LeetCode problem #240!",
  optimizationTips: [
    "For strictly sorted matrices, treat as 1D array for O(log mn)",
    "Can use binary search to find starting row for better average case",
    "Parallelize row/column elimination for very large matrices",
    "Consider memory layout for cache efficiency",
  ],
  tags: ["Matrix", "2D Array", "O(m+n)", "Staircase"],
};
