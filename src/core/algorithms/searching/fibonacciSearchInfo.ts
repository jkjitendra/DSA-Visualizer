import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Fibonacci Search algorithm info card data
 */
export const fibonacciSearchInfo: AlgorithmInfo = {
  id: "fibonacci-search",
  name: "Fibonacci Search",
  description:
    "Fibonacci Search divides the array using Fibonacci numbers instead of halving. It only uses addition and subtraction (no division), making it efficient on systems where division is expensive.",
  howItWorks:
    "Find the smallest Fibonacci number >= n. Use Fibonacci numbers to determine division points. At each step, compare with element at offset + F(m-2) and adjust the Fibonacci indices based on result.",
  keyInsight:
    "Fibonacci numbers have the property that F(n) = F(n-1) + F(n-2). This allows efficient index calculation using only addition/subtraction, avoiding costly division operations.",
  bestFor: [
    "Systems where division is expensive",
    "CPUs without hardware division",
    "Embedded systems",
    "Very large sorted arrays",
  ],
  avoidWhen: [
    "Modern CPUs with fast division",
    "Small arrays",
    "When binary search is simpler to implement",
    "Unsorted data",
  ],
  funFact:
    "Fibonacci Search was invented by Kiefer (1953) for finding minimum of unimodal functions. It's theoretically optimal for this case! The Fibonacci sequence's appearance in search algorithms is related to its connections to the golden ratio.",
  optimizationTips: [
    "Precompute Fibonacci numbers up to max array size",
    "Can be used for one-sided searches",
    "Useful in magnetic tape drives (only forward movement)",
    "Division points favor left side, good for caches",
  ],
  tags: ["Fibonacci", "No Division", "O(log n)", "Advanced"],
};
