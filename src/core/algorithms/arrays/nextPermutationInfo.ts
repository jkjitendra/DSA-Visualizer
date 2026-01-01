import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Next Permutation info card data
 */
export const nextPermutationInfo: AlgorithmInfo = {
  id: "next-permutation",
  name: "Next Permutation",
  description:
    "Find the next lexicographically greater permutation in O(n) time. If the array is already the largest permutation, it wraps around to the smallest (sorted order).",
  howItWorks:
    "1) Find the rightmost position where arr[i] < arr[i+1] (pivot). 2) Find the rightmost element greater than pivot. 3) Swap them. 4) Reverse the suffix after the pivot to get the next permutation.",
  keyInsight:
    "The suffix after the pivot is in descending order. By swapping with the smallest element greater than pivot and reversing, we get the next smallest arrangement.",
  bestFor: [
    "Generating permutations in order",
    "Finding next arrangement in sequence",
    "Implementing STL next_permutation",
    "Permutation ranking problems",
  ],
  avoidWhen: [
    "Need random permutation (use shuffle)",
    "Need all permutations (recursive approach may be clearer)",
    "Array has many duplicates (may need modification)",
  ],
  funFact:
    "This algorithm is implemented in C++ STL as std::next_permutation! It was first published by Dijkstra.",
  optimizationTips: [
    "Handle duplicates by skipping equal elements",
    "For previous permutation, flip the comparisons",
    "Can track permutation rank using factorial number system",
  ],
  tags: ["Permutation", "O(n)", "In-place"],
};
