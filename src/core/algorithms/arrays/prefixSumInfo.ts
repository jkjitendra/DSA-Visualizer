import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Prefix Sum algorithm info card data
 */
export const prefixSumInfo: AlgorithmInfo = {
  id: "prefix-sum",
  name: "Prefix Sum",
  description:
    "Prefix Sum is a preprocessing technique that builds a cumulative sum array, enabling O(1) range sum queries after O(n) preprocessing.",
  howItWorks:
    "Build a prefix array where prefix[i] = sum of arr[0..i]. To find sum of range [L, R]: if L=0 return prefix[R], else return prefix[R] - prefix[L-1].",
  keyInsight:
    "Any range sum can be computed from just two elements in the prefix array, making repeated range queries extremely efficient.",
  bestFor: [
    "Multiple range sum queries",
    "Subarray sum equals K problems",
    "Count subarrays with given sum",
    "2D range sum queries (with 2D prefix)",
    "Difference array for range updates",
  ],
  avoidWhen: [
    "Only need a single range sum (just iterate)",
    "Array is frequently modified (need Segment Tree)",
    "Memory is extremely constrained",
  ],
  funFact:
    "Prefix sums are used in parallel computing for prefix scan operations, which are fundamental to many parallel algorithms!",
  optimizationTips: [
    "Use 1-indexed prefix array to avoid edge cases",
    "Works for any associative operation (XOR, product, etc.)",
    "Combine with hash map for O(n) subarray sum problems",
  ],
  tags: ["Preprocessing", "O(1) Query", "Range Queries"],
};
