import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Sliding Window algorithm info card data
 */
export const slidingWindowInfo: AlgorithmInfo = {
  id: "sliding-window",
  name: "Sliding Window",
  description:
    "The Sliding Window technique efficiently processes subarrays or substrings by maintaining a 'window' that slides through the data.",
  howItWorks:
    "Calculate the sum/result for the first window of size k. Then slide the window one element at a time: add the new element entering the window, subtract the element leaving. Update the maximum/minimum as needed.",
  keyInsight:
    "Instead of recalculating the entire window sum each time (O(k)), we update incrementally in O(1), converting an O(n*k) algorithm to O(n).",
  bestFor: [
    "Maximum/minimum sum subarray of size k",
    "Longest substring without repeating characters",
    "Minimum window substring",
    "Finding averages of k consecutive elements",
    "Count distinct elements in every window",
  ],
  avoidWhen: [
    "Window size is variable and depends on complex conditions",
    "Need to examine non-contiguous elements",
    "Problem requires comparing windows far apart",
  ],
  funFact:
    "The Sliding Window pattern appears in real-world applications like network packet analysis, streaming data processing, and time series analysis!",
  optimizationTips: [
    "For fixed-size windows, maintain a running sum/hash",
    "For variable-size windows, expand/contract based on conditions",
    "Use deque for O(1) access to both window min and max",
  ],
  tags: ["Pattern", "O(n)", "Subarray"],
};
