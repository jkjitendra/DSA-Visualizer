import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const kmpAlgorithmInfo: AlgorithmInfo = {
  id: "kmp-algorithm",
  name: "KMP Algorithm",
  description:
    "The Knuth-Morris-Pratt algorithm achieves O(n+m) pattern matching by preprocessing the pattern to build an LPS (Longest Proper Prefix Suffix) array, avoiding redundant comparisons.",
  howItWorks:
    "First, build an LPS array that stores, for each position in the pattern, the length of the longest proper prefix that is also a suffix. During search, when a mismatch occurs, use the LPS value to skip ahead instead of starting from the beginning.",
  keyInsight:
    "The LPS array captures the pattern's self-similarity. When a mismatch occurs after matching j characters, we already know that lps[j-1] characters still match, so we can resume from there.",
  bestFor: [
    "Single pattern, multiple searches",
    "Patterns with repetitive structure",
    "When worst-case O(n+m) is required",
    "Text editors and search features",
  ],
  avoidWhen: [
    "Very short patterns (preprocessing overhead)",
    "Random patterns with no repetition",
    "Multiple different patterns (use Aho-Corasick)",
  ],
  funFact:
    "The algorithm was conceived in 1970 by Donald Knuth and Vaughan Pratt, and independently by James H. Morris. They published it jointly in 1977. It was one of the first O(n) string matching algorithms!",
  optimizationTips: [
    "For short patterns, brute force may be faster",
    "LPS array can be precomputed for repeated searches",
    "Consider Boyer-Moore for even better average case",
  ],
  tags: ["Pattern Matching", "LPS Array", "O(n+m)", "Advanced"],
};
