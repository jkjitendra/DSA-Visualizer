import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Sentinel Linear Search algorithm info card data
 */
export const sentinelLinearSearchInfo: AlgorithmInfo = {
  id: "sentinel-linear-search",
  name: "Sentinel Linear Search",
  description:
    "An optimized version of Linear Search that places the target element at the end of the array as a 'sentinel'. This eliminates the need for bounds checking in the main loop, reducing the number of comparisons.",
  howItWorks:
    "Save the last element, replace it with the target (sentinel). Search without checking bounds - the sentinel guarantees we'll find the target. After finding, restore the last element and verify if we found the actual target or just the sentinel.",
  keyInsight:
    "By guaranteeing the target exists (as sentinel), we eliminate half the conditional checks in the loop - checking only for equality, not array bounds.",
  bestFor: [
    "Large unsorted arrays",
    "When every comparison counts",
    "Low-level/embedded systems",
    "Performance-critical linear searches",
  ],
  avoidWhen: [
    "Array is read-only",
    "Concurrent access to array",
    "Array is very small (overhead not worth it)",
    "Sorted data (use Binary Search)",
  ],
  funFact:
    "The sentinel technique was popularized by Donald Knuth in 'The Art of Computer Programming'. It's a classic example of trading a small amount of extra work for a simpler, faster inner loop!",
  optimizationTips: [
    "Ensure array is modifiable before using",
    "Consider thread-safety in concurrent environments",
    "Combine with move-to-front for frequently searched items",
  ],
  tags: ["Optimized", "Sentinel", "O(n)", "In-Place"],
};
