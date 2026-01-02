import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Interpolation Search algorithm info card data
 */
export const interpolationSearchInfo: AlgorithmInfo = {
  id: "interpolation-search",
  name: "Interpolation Search",
  description:
    "Interpolation Search improves on binary search for uniformly distributed data. Instead of always going to the middle, it estimates where the target is likely to be based on its value relative to the range.",
  howItWorks:
    "Calculate the probe position using interpolation: pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]). This estimates where the target would be if values are evenly distributed.",
  keyInsight:
    "For uniformly distributed data, this achieves O(log log n) time - faster than binary search! It's like guessing which page to open in a dictionary based on the first letter.",
  bestFor: [
    "Uniformly distributed sorted data",
    "Large datasets with predictable distribution",
    "When data follows a known pattern",
    "Phone books, dictionaries (alphabetically ordered)",
  ],
  avoidWhen: [
    "Non-uniform data distribution (degrades to O(n))",
    "Unknown data distribution",
    "Small datasets (overhead not worth it)",
    "Data with many duplicates",
  ],
  funFact:
    "Interpolation Search mimics how humans search! When looking for 'Smith' in a phone book, you don't start in the middle - you start about 3/4 of the way through because 'S' is late in the alphabet.",
  optimizationTips: [
    "Check data distribution before using",
    "Falls back to binary search for safety",
    "Can probe multiple positions simultaneously",
    "Consider hybrid: interpolation + binary for robustness",
  ],
  tags: ["Interpolation", "O(log log n)", "Uniform Data", "Advanced"],
};
