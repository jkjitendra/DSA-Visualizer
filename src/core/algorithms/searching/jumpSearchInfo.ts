import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Jump Search algorithm info card data
 */
export const jumpSearchInfo: AlgorithmInfo = {
  id: "jump-search",
  name: "Jump Search",
  description:
    "Jump Search works on sorted arrays by jumping ahead by fixed steps (√n) and then doing a linear search within the block where the target might exist. It's faster than linear but slower than binary search.",
  howItWorks:
    "Calculate step size as √n. Jump in blocks of this size until finding a block where the target might exist (when arr[step] >= target). Then perform linear search within that block.",
  keyInsight:
    "The optimal block size is √n, which minimizes the total number of comparisons. With n elements and block size k, we have n/k jumps + k linear searches, minimized at k = √n.",
  bestFor: [
    "Sorted arrays where jumping back is costly",
    "Systems where binary search cache behavior is problematic",
    "When you only need forward traversal",
    "Linked lists with known length",
  ],
  avoidWhen: [
    "Very large arrays (binary search is faster)",
    "Unsorted data",
    "Random access is cheap (binary search preferred)",
    "Very small arrays (linear search is simpler)",
  ],
  funFact:
    "Jump Search is particularly useful for searching in systems where jumping backward is significantly more expensive than jumping forward - like in magnetic tape storage systems!",
  optimizationTips: [
    "Block size of √n is optimal for worst case",
    "For non-uniform data, adaptive block sizes can help",
    "Can be combined with binary search in the block",
    "Consider the cost ratio of forward vs backward jumps",
  ],
  tags: ["Block Search", "√n", "Sequential Access", "Intermediate"],
};
