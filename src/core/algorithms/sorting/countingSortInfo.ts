import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const countingSortInfo: AlgorithmInfo = {
  id: "counting-sort",
  name: "Counting Sort",
  description:
    "Counting Sort is a non-comparison sorting algorithm that works by counting the occurrences of each unique element, then reconstructing the sorted array.",
  howItWorks:
    "1. Find the range of input. 2. Count occurrences of each value. 3. Place each value the number of times it appears.",
  keyInsight:
    "By not comparing elements, Counting Sort breaks the O(n log n) barrier for comparison-based sorts and achieves O(n + k) time!",
  bestFor: [
    "Small range integers (k is small)",
    "When values are non-negative integers",
    "Input with many duplicates",
    "As a subroutine in Radix Sort",
  ],
  avoidWhen: [
    "Large range of values (wastes memory)",
    "Floating point numbers",
    "Negative numbers (needs modification)",
  ],
  funFact:
    "Counting Sort is the backbone of Radix Sort! It's used to sort digits, making Radix Sort achieve O(d × (n + k)) time.",
  optimizationTips: [
    "Subtract minimum value to handle ranges not starting at 0",
    "Use cumulative count for stable sort",
  ],
  tags: ["Non-Comparison", "Stable", "O(n+k)", "Integer Sort"],
};
