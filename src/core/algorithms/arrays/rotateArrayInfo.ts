import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Rotate Array info card data
 */
export const rotateArrayInfo: AlgorithmInfo = {
  id: "rotate-array",
  name: "Rotate Array",
  description:
    "Rotate an array by k positions using the reversal algorithm. This elegant O(n) solution uses three reversals to achieve the rotation without extra space.",
  howItWorks:
    "For right rotation: 1) Reverse the entire array, 2) Reverse the first k elements, 3) Reverse the remaining n-k elements. Left rotation uses the same technique with adjusted boundaries.",
  keyInsight:
    "Reversing sections of an array is equivalent to rotation! The reversal algorithm is cache-friendly and works in-place with O(1) extra space.",
  bestFor: [
    "Rotating arrays by k positions",
    "Circular buffer implementations",
    "String rotation problems",
    "Juggling algorithm alternative",
  ],
  avoidWhen: [
    "Only need to rotate by 1 position (simpler methods exist)",
    "Need to frequently rotate (consider circular buffer)",
    "Array is immutable",
  ],
  funFact:
    "There are three main approaches to array rotation: brute force O(n*k), juggling O(n), and reversal O(n). The reversal method is the most intuitive!",
  optimizationTips: [
    "Always compute k = k % n first to handle k > n",
    "For left rotation, use k = n - k instead",
    "Can be extended to rotate subarrays or strings",
  ],
  tags: ["Rotation", "O(n)", "In-place"],
};
