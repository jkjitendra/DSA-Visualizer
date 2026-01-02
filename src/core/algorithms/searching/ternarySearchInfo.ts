import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Ternary Search algorithm info card data
 */
export const ternarySearchInfo: AlgorithmInfo = {
  id: "ternary-search",
  name: "Ternary Search",
  description:
    "Ternary Search divides the array into three parts instead of two. While used for searching in sorted arrays, its main application is finding the maximum or minimum of a unimodal function.",
  howItWorks:
    "Calculate two midpoints: mid1 = low + (high-low)/3 and mid2 = high - (high-low)/3. Compare target with values at both points to determine which third contains the target.",
  keyInsight:
    "For sorted array search, ternary search is actually slower than binary search (2 comparisons to eliminate 2/3 vs 1 comparison to eliminate 1/2). Its real power is in finding extrema of unimodal functions!",
  bestFor: [
    "Finding max/min of unimodal functions",
    "Optimization problems",
    "When function evaluation is expensive",
    "Continuous optimization",
  ],
  avoidWhen: [
    "Simple sorted array search (binary is faster)",
    "Discrete data that isn't unimodal",
    "When you need exact position (approximation only)",
    "Multi-modal functions",
  ],
  funFact:
    "While ternary search seems like it should be faster (eliminating 2/3 vs 1/2 each step), it requires 2 comparisons per iteration. Doing the math: log₃(n)*2 > log₂(n)*1, so binary search is actually faster for finding specific elements!",
  optimizationTips: [
    "For unimodal optimization, compare f(mid1) and f(mid2)",
    "Precision depends on number of iterations",
    "Can be combined with local search for refinement",
    "For integers, binary search is usually better",
  ],
  tags: ["Three-Way", "O(log₃ n)", "Optimization", "Unimodal"],
};
