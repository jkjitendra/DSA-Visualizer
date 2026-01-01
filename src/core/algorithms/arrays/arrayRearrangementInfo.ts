import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Array Rearrangement info card data
 */
export const arrayRearrangementInfo: AlgorithmInfo = {
  id: "array-rearrangement",
  name: "Rearrangement",
  description:
    "Rearrange an array so that positive and negative numbers appear alternately. This stable O(n) solution maintains the relative order within positives and negatives.",
  howItWorks:
    "Separate all positives and negatives into two separate arrays. Then merge them alternately, taking one from each group. Append any remaining elements at the end.",
  keyInsight:
    "By separating first, we maintain stability (relative order). An in-place O(1) space solution exists but is more complex and may not preserve order.",
  bestFor: [
    "Alternating arrangement problems",
    "Data presentation requirements",
    "Interview questions on array manipulation",
    "When stability (order preservation) matters",
  ],
  avoidWhen: [
    "Array has only positives or only negatives",
    "Need exact alternation with equal counts",
    "O(1) space is strictly required",
  ],
  funFact:
    "This problem is a common interview question at top tech companies! The in-place version using rotation is much trickier.",
  optimizationTips: [
    "For in-place O(1) space, use rotation-based approach (slower)",
    "Can start with negative first if needed",
    "Consider what to do when counts are unequal",
  ],
  tags: ["Rearrangement", "O(n)", "Partitioning"],
};
