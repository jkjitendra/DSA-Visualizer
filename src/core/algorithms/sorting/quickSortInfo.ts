import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const quickSortInfo: AlgorithmInfo = {
  id: "quick-sort",
  name: "Quick Sort",
  description:
    "Quick Sort is a divide-and-conquer algorithm that picks a 'pivot' element, partitions the array around it, and recursively sorts the subarrays.",
  howItWorks:
    "1. Choose a pivot element. 2. Partition: move smaller elements left, larger right. 3. Recursively sort the two partitions.",
  keyInsight:
    "The partition step does the real work - after partitioning, the pivot is in its final sorted position. The recursion handles the rest.",
  bestFor: [
    "Large datasets with random distribution",
    "In-memory sorting (cache-friendly)",
    "Average case performance priority",
    "C/C++ STL sort implementation",
  ],
  avoidWhen: [
    "Already sorted arrays (degrades to O(n²))",
    "Stability is required (unstable)",
    "Worst-case guarantees needed",
    "Many duplicate elements",
  ],
  funFact:
    "Quick Sort was developed by Tony Hoare in 1959! Despite O(n²) worst case, it's often faster than Merge Sort due to cache efficiency and low overhead.",
  optimizationTips: [
    "Use median-of-three for pivot selection",
    "Switch to Insertion Sort for small partitions (< 10)",
    "Use 3-way partitioning for duplicate keys (Dutch National Flag)",
  ],
  tags: ["Comparison Sort", "In-Place", "Unstable", "Divide & Conquer"],
};
