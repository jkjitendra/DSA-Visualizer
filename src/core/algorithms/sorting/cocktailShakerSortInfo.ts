import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const cocktailShakerSortInfo: AlgorithmInfo = {
  id: "cocktail-shaker-sort",
  name: "Cocktail Shaker Sort",
  description:
    "Cocktail Shaker Sort is a bidirectional variant of Bubble Sort. It alternates between forward and backward passes through the array, like a cocktail shaker moving back and forth.",
  howItWorks:
    "First, bubble the largest element to the end (forward pass). Then, bubble the smallest remaining element to the start (backward pass). Repeat until sorted.",
  keyInsight:
    "The bidirectional approach handles 'turtles' (small values at the end) much faster than standard Bubble Sort, which only moves them one position per pass.",
  bestFor: [
    "Arrays with small elements at the end ('turtles')",
    "Nearly sorted arrays",
    "Teaching bidirectional algorithms",
    "When Bubble Sort is too slow on specific inputs",
  ],
  avoidWhen: [
    "Large datasets (still O(n²))",
    "Random data (no significant benefit over Bubble)",
    "Performance-critical applications",
  ],
  funFact:
    "Also called 'Shaker Sort', 'Ripple Sort', or 'Shuffle Sort'. The name comes from the back-and-forth motion like shaking a cocktail!",
  optimizationTips: [
    "Track where the last swap occurred to reduce the range",
    "Stop early if no swaps in a complete cycle",
    "Good for understanding how small optimizations improve algorithms",
  ],
  tags: ["Comparison Sort", "In-Place", "Stable", "Bidirectional"],
};
