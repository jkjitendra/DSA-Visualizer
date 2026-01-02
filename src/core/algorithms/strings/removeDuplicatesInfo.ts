import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const removeDuplicatesInfo: AlgorithmInfo = {
  id: "remove-duplicates",
  name: "Remove Duplicates",
  description:
    "Remove duplicate characters from a string while preserving the order of first occurrences.",
  howItWorks:
    "Iterate through the string, maintaining a set of seen characters. For each character, if it hasn't been seen before, add it to the result and mark it as seen.",
  keyInsight:
    "Using a hash set gives O(1) lookup for checking duplicates, making the overall algorithm O(n).",
  bestFor: [
    "Data cleaning",
    "Unique character extraction",
    "Building character sets",
    "Preprocessing for other algorithms",
  ],
  avoidWhen: [
    "Need to preserve all occurrences",
    "Order doesn't matter (just use Set)",
  ],
  funFact:
    "This problem is sometimes asked with the constraint of using no extra data structures (O(1) space). In that case, you'd need O(n²) time to check each character against all previous ones!",
  optimizationTips: [
    "For ASCII, use a 256-element boolean array instead of hash set",
    "If modifying in place, use two-pointer technique",
    "Consider case sensitivity requirements",
  ],
  tags: ["Strings", "Hash Set", "Deduplication", "O(n)"],
};
