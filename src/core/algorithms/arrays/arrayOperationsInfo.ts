import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Array Operations algorithm info card data
 */
export const arrayOperationsInfo: AlgorithmInfo = {
  id: "array-operations",
  name: "Array Operations",
  description:
    "Visualize all fundamental array operations with step-by-step animations. Each operation displays its Time and Space Complexity.",
  howItWorks:
    "Select an operation from the dropdown to see how it works: insertion, deletion, update at different positions, traversal, search, find min/max, and reverse.",
  keyInsight:
    "Arrays provide O(1) random access but O(n) insertion/deletion at the beginning due to element shifting. Understanding these trade-offs is fundamental to algorithm design.",
  bestFor: [
    "Understanding array fundamentals",
    "Learning complexity analysis",
    "Visualizing element shifting during insert/delete",
    "Comparing different operation costs",
  ],
  avoidWhen: [
    "Need to skip the basics",
    "Already understand array operations thoroughly",
  ],
  funFact:
    "Arrays are the most fundamental data structure - almost every other data structure is built on top of arrays or linked memory!",
  optimizationTips: [
    "Insert/delete at end is O(1) - prefer this when possible",
    "Use direct index access (O(1)) instead of searching (O(n))",
    "Consider using a linked list if frequent insertions/deletions needed",
  ],
  tags: ["Fundamentals", "O(1) Access", "In-Place"],
};
