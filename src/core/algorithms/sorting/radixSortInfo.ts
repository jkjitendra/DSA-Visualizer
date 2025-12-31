import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const radixSortInfo: AlgorithmInfo = {
  id: "radix-sort",
  name: "Radix Sort",
  description:
    "Radix Sort processes digits from least significant to most significant (LSD) or vice versa (MSD), using a stable sort like Counting Sort at each digit position.",
  howItWorks:
    "1. Find max to know digit count. 2. For each digit position (units, tens, hundreds...), use counting sort. 3. After all digits, array is sorted.",
  keyInsight:
    "By sorting one digit at a time with a stable sort, the order from previous digits is preserved, eventually resulting in full sorted order.",
  bestFor: [
    "Fixed-length integers or strings",
    "Large datasets with small key range",
    "When comparison-based sorts are too slow",
    "Sorting phone numbers, zip codes",
  ],
  avoidWhen: [
    "Variable-length keys",
    "Floating point numbers",
    "When keys have many digits",
  ],
  funFact:
    "Radix Sort was used in punch card sorters in the 1890s! Herman Hollerith used it for the US Census before computers existed.",
  optimizationTips: [
    "Use base 256 for binary data (faster than base 10)",
    "MSD variant can stop early for partially sorted data",
  ],
  tags: ["Non-Comparison", "Stable", "O(d(n+k))", "Digit Sort"],
};
