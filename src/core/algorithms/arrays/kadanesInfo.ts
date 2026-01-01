import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Kadane's Algorithm info card data
 */
export const kadanesInfo: AlgorithmInfo = {
  id: "kadanes",
  name: "Kadane's Algorithm",
  description:
    "Kadane's Algorithm finds the contiguous subarray with the maximum sum in O(n) time using dynamic programming. It tracks the current subarray sum and updates the maximum when a better sum is found.",
  howItWorks:
    "At each position, decide whether to extend the current subarray or start a new one. If the current element alone is greater than the current sum plus that element, start fresh. Track the maximum sum seen and its boundaries.",
  keyInsight:
    "A negative running sum never helps future elements. The optimal subarray ending at position i either includes the optimal subarray ending at i-1, or starts fresh at i.",
  bestFor: [
    "Finding maximum subarray sum",
    "Stock buy/sell problems (max profit)",
    "Maximum circular subarray sum (with modification)",
    "2D maximum subarray problems",
  ],
  avoidWhen: [
    "All elements are negative (returns largest negative)",
    "Need to find all subarrays with max sum",
    "Problem requires non-contiguous elements",
  ],
  funFact:
    "Kadane's algorithm was proposed by Jay Kadane in 1984 and is a classic example of dynamic programming. It solves in O(n) what brute force would take O(n³)!",
  optimizationTips: [
    "Handle all-negative arrays by starting with first element",
    "Can track indices for the actual subarray, not just the sum",
    "Extend to circular arrays by running twice: once normal, once with inverted signs",
  ],
  tags: ["Dynamic Programming", "O(n)", "Subarray"],
};
