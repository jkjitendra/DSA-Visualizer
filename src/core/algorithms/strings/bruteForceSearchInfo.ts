import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const bruteForceSearchInfo: AlgorithmInfo = {
  id: "brute-force-search",
  name: "Brute Force Pattern Search",
  description:
    "The simplest pattern matching algorithm - slide the pattern over the text one position at a time and check for matches character by character.",
  howItWorks:
    "At each position in the text, compare the pattern character by character. If all characters match, record the position. If any character mismatches, move to the next position and start over.",
  keyInsight:
    "While inefficient for large texts, brute force is simple to understand and works well for small inputs. It's the baseline against which optimized algorithms are compared.",
  bestFor: [
    "Small texts and patterns",
    "One-time searches",
    "Learning pattern matching concepts",
    "When simplicity is more important than speed",
  ],
  avoidWhen: [
    "Searching large texts multiple times",
    "Pattern has many partial matches",
    "Real-time search applications",
    "Worst case patterns (like AAAA... searching for AAB)",
  ],
  funFact:
    "Despite its inefficiency, brute force is still used in some regex engines for very short patterns because the overhead of preprocessing (like in KMP) isn't worth it!",
  optimizationTips: [
    "Use more efficient algorithms (KMP, Boyer-Moore) for large texts",
    "Consider Rabin-Karp for multiple pattern search",
    "For DNA sequences, specialized algorithms exist",
  ],
  tags: ["Pattern Matching", "Strings", "Brute Force", "O(n×m)"],
};
