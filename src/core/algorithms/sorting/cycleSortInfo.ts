import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const cycleSortInfo: AlgorithmInfo = {
  id: "cycle-sort",
  name: "Cycle Sort",
  description:
    "Cycle Sort is an in-place, unstable sorting algorithm that minimizes the number of memory writes. It places each element directly at its final sorted position.",
  howItWorks:
    "For each element, count how many elements are smaller to find its correct position. Place it there, and continue rotating displaced elements until the cycle completes.",
  keyInsight:
    "This is the only in-place algorithm that achieves the theoretical minimum number of writes - each element is written at most once!",
  bestFor: [
    "Flash memory or EEPROM (limited write cycles)",
    "When write operations are expensive",
    "Finding minimum repositioning in arrays",
    "Counting minimum swaps needed",
  ],
  avoidWhen: [
    "Speed is priority (O(n²) comparisons)",
    "Data has many duplicates",
    "Random access is slow",
  ],
  funFact:
    "Cycle Sort makes at most n-1 writes, which is the theoretical minimum for sorting! No other in-place algorithm can do better.",
  optimizationTips: [
    "Skip elements already in correct position early",
    "Useful for counting permutation cycles in arrays",
  ],
  tags: ["Comparison Sort", "In-Place", "Unstable", "Min-Writes"],
};
