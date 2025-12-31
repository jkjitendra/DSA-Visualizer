import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Two Pointers algorithm info card data
 */
export const twoPointersInfo: AlgorithmInfo = {
  id: "two-pointers",
  name: "Two Pointers",
  description:
    "The Two Pointers technique uses two pointers that move through the array from different positions to solve problems efficiently in O(n) time.",
  howItWorks:
    "Start with pointers at the beginning and end of a sorted array. Calculate search sum, move left pointer right if sum is too small, or right pointer left if sum is too large. Continue until pair is found or pointers meet.",
  keyInsight:
    "By maintaining two pointers, we can eliminate large portions of the search space in each step, converting O(n²) brute force to O(n) time.",
  bestFor: [
    "Pair sum problems on sorted arrays",
    "Container with most water",
    "Trapping rain water",
    "Palindrome checking",
    "Removing duplicates in sorted arrays",
  ],
  avoidWhen: [
    "Array is not sorted (sort first adds O(n log n))",
    "Need to find all pairs, not just one",
    "Problem requires examining non-adjacent elements",
  ],
  funFact:
    "The Two Pointers technique is often used in interview problems because it demonstrates understanding of time complexity optimization!",
  optimizationTips: [
    "Always ensure the array is sorted first",
    "Consider using two pointers from the same direction for some problems",
    "Can extend to Three Sum by fixing one element and using two pointers for the rest",
  ],
  tags: ["Pattern", "O(n)", "Sorted Array"],
};
