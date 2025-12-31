import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const pigeonholeSortInfo: AlgorithmInfo = {
  id: "pigeonhole-sort",
  name: "Pigeonhole Sort",
  description:
    "Pigeonhole Sort uses the pigeonhole principle: if n items go into m holes where n > m, at least one hole has multiple items. It works when the range of values is similar to the number of elements.",
  howItWorks:
    "1. Find min and max to determine range. 2. Create holes for each possible value. 3. Put each element in its hole. 4. Traverse holes in order.",
  keyInsight:
    "Unlike Counting Sort which counts occurrences, Pigeonhole Sort stores actual elements - useful when elements have associated data.",
  bestFor: [
    "Range ≈ number of elements",
    "Elements with associated data",
    "Many duplicates expected",
  ],
  avoidWhen: [
    "Range >> number of elements",
    "Memory is limited",
    "Non-integer data",
  ],
  funFact:
    "The pigeonhole principle is a fundamental concept in combinatorics - if 10 pigeons sit in 9 holes, at least one hole has 2+ pigeons!",
  optimizationTips: [
    "Use linked lists for holes to avoid resizing",
    "Subtract min from values to reduce hole count",
  ],
  tags: ["Distribution Sort", "Stable", "O(n+r)", "Integer Sort"],
};
