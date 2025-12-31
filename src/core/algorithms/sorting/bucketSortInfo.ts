import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const bucketSortInfo: AlgorithmInfo = {
  id: "bucket-sort",
  name: "Bucket Sort",
  description:
    "Bucket Sort distributes elements into buckets based on their value range, sorts each bucket individually, then concatenates the results.",
  howItWorks:
    "1. Create n empty buckets. 2. Scatter: put each element in its bucket. 3. Sort each bucket. 4. Gather: concatenate all buckets.",
  keyInsight:
    "When data is uniformly distributed, each bucket has few elements, so bucket sorting + small sorts is faster than comparison sorting all at once.",
  bestFor: [
    "Uniformly distributed data",
    "Floating point numbers in [0, 1)",
    "When input distribution is known",
  ],
  avoidWhen: [
    "Data is clustered (uneven buckets)",
    "Memory is limited",
    "Worst case performance matters",
  ],
  funFact:
    "Bucket Sort can achieve O(n) time when data is uniformly distributed - one of the few sorts that can beat O(n log n)!",
  optimizationTips: [
    "Use insertion sort for small buckets",
    "Adjust bucket count based on data range",
  ],
  tags: ["Distribution Sort", "Stable", "O(n+k)", "Non-Comparison"],
};
