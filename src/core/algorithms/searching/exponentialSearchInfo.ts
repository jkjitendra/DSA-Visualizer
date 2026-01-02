import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Exponential Search algorithm info card data
 */
export const exponentialSearchInfo: AlgorithmInfo = {
  id: "exponential-search",
  name: "Exponential Search",
  description:
    "Exponential Search finds the range where target exists by doubling the search index (1, 2, 4, 8...), then performs binary search within that range. Particularly useful for unbounded or infinite arrays.",
  howItWorks:
    "Start at index 1 and keep doubling until arr[i] > target. This gives us a range [i/2, i] where target might exist. Then perform binary search within this range.",
  keyInsight:
    "The doubling phase takes O(log i) where i is the target's position. This makes it efficient when the target is near the beginning of a large array.",
  bestFor: [
    "Unbounded/infinite arrays",
    "When target is likely near the beginning",
    "External data sources where size is unknown",
    "Streaming data with sorted order",
  ],
  avoidWhen: [
    "Array size is known (direct binary search is simpler)",
    "Target is likely near the end",
    "Small arrays",
    "Unsorted data",
  ],
  funFact:
    "Exponential Search is particularly efficient for arrays where the element is close to the beginning. If you're searching for item at position i, it takes O(log i) instead of O(log n)!",
  optimizationTips: [
    "Start with i=1, not i=0 (avoid infinite loop)",
    "Can use Fibonacci numbers instead of powers of 2",
    "Combine with interpolation for better cache behavior",
    "Consider adaptive doubling based on distribution",
  ],
  tags: ["Range Finding", "O(log i)", "Unbounded", "Two-Phase"],
};
