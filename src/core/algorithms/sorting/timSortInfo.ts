import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const timSortInfo: AlgorithmInfo = {
  id: "tim-sort",
  name: "Tim Sort",
  description:
    "Tim Sort is a hybrid stable sorting algorithm derived from Merge Sort and Insertion Sort. It was designed by Tim Peters for Python's sort() and is now used in Java, Android, and Swift.",
  howItWorks:
    "1. Divide array into 'runs' (32-64 elements). 2. Sort each run with Insertion Sort. 3. Merge runs using a modified Merge Sort that exploits natural runs.",
  keyInsight:
    "Real-world data often has natural 'runs' of already sorted elements. Tim Sort detects and exploits these runs, making it very fast on partially sorted data.",
  bestFor: [
    "Real-world data (usually has some order)",
    "Stable sorting requirement",
    "General-purpose sorting",
    "Standard library implementations",
  ],
  avoidWhen: [
    "Memory is very limited",
    "Data is completely random",
    "Simplicity is required",
  ],
  funFact:
    "Tim Sort was invented by Tim Peters in 2002 for Python. It's the default sort in Python, Java 7+, Android, and Swift!",
  optimizationTips: [
    "Galloping mode for unequal run lengths",
    "minRun is carefully chosen to be 32-64",
    "Maintains a stack of pending runs to merge",
  ],
  tags: ["Hybrid", "Stable", "Adaptive", "O(n log n)"],
};
