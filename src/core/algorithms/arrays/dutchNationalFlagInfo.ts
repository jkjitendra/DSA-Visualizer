import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Dutch National Flag info card data
 */
export const dutchNationalFlagInfo: AlgorithmInfo = {
  id: "dutch-national-flag",
  name: "Dutch National Flag",
  description:
    "The Dutch National Flag algorithm sorts an array containing only 0s, 1s, and 2s in a single pass using three pointers. Named after the Dutch flag which has three colored stripes.",
  howItWorks:
    "Use three pointers: low (boundary for 0s), mid (current element), high (boundary for 2s). When mid sees 0, swap with low. When mid sees 2, swap with high. When mid sees 1, just move forward.",
  keyInsight:
    "By maintaining three regions (0s, 1s, 2s), we partition the array in-place. The mid pointer only advances when we're certain about element placement.",
  bestFor: [
    "Sorting arrays with exactly 3 distinct values",
    "Partitioning problems",
    "Color sorting problems",
    "Three-way quicksort partitioning",
  ],
  avoidWhen: [
    "Array has more than 3 distinct values",
    "Elements aren't easily categorizable into 3 groups",
    "Order within groups matters",
  ],
  funFact:
    "This algorithm was designed by Edsger Dijkstra as a programming exercise. It's a fundamental technique used in 3-way partitioning quicksort!",
  optimizationTips: [
    "Can be extended to k-way partitioning with more pointers",
    "Works great as the partition step in quicksort for arrays with many duplicates",
    "The concept applies to any three-category classification",
  ],
  tags: ["Partitioning", "O(n)", "In-place"],
};
