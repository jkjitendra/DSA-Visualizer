import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Peak Element algorithm info card data
 */
export const peakElementInfo: AlgorithmInfo = {
  id: "peak-element",
  name: "Peak Element",
  description:
    "Peak Element finds an element that is greater than its neighbors. A peak element is not necessarily the maximum - any local maximum qualifies. Uses binary search on the slope direction.",
  howItWorks:
    "Compare mid with mid+1. If ascending (mid < mid+1), a peak exists on the right. If descending (mid >= mid+1), a peak exists at mid or left. Binary search narrows down to a peak.",
  keyInsight:
    "We're not searching for a specific value, but for a property (being a local maximum). By following the ascending slope, we're guaranteed to find a peak!",
  bestFor: [
    "Finding local maxima in unsorted arrays",
    "Signal processing (finding peaks in data)",
    "Optimization problems",
    "When any peak is acceptable (not necessarily global max)",
  ],
  avoidWhen: [
    "You need the global maximum (use linear scan)",
    "Array has all equal elements (all are peaks)",
    "You need all peaks (need different approach)",
  ],
  funFact:
    "This is LeetCode problem #162! The key insight is that following the ascending direction always leads to a peak - like climbing a mountain, you'll eventually reach a summit.",
  optimizationTips: [
    "Handle edge cases: single element, two elements",
    "For all peaks, use a different algorithm (linear with state tracking)",
    "Can be extended to 2D matrices (finding peak in matrix)",
  ],
  tags: ["Binary Search", "Peak Finding", "O(log n)", "Local Maximum"],
};
