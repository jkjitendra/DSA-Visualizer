import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Rotated Array Minimum algorithm info card data
 */
export const rotatedArrayMinInfo: AlgorithmInfo = {
  id: "rotated-array-min",
  name: "Rotated Array Minimum",
  description:
    "Find the minimum element in a rotated sorted array. The minimum is at the rotation point - where the array 'wraps around'. Uses binary search to find this inflection point.",
  howItWorks:
    "Compare mid with high. If arr[mid] > arr[high], the rotation point (minimum) is on the right. Otherwise, it's at mid or left. Continue until low meets high.",
  keyInsight:
    "The minimum element is the only element that is smaller than its previous element. In a rotated sorted array, this is the rotation point.",
  bestFor: [
    "Finding rotation point in rotated arrays",
    "Prerequisite for rotated array search",
    "Finding when circular data wraps around",
    "Log rotation detection",
  ],
  avoidWhen: [
    "Array is not rotated (just take first element)",
    "Array has duplicates (may need O(n))",
    "Looking for maximum (it's at minIndex - 1)",
  ],
  funFact:
    "This is LeetCode problem #153! Once you find the minimum (rotation point), you can use it to perform binary search on rotated arrays by adjusting indices.",
  optimizationTips: [
    "First check if array is rotated at all (arr[0] < arr[n-1])",
    "Handle duplicates: if arr[low] == arr[mid] == arr[high], increment low",
    "Maximum is at (minIndex - 1 + n) % n",
  ],
  tags: ["Binary Search", "Rotated Array", "O(log n)", "Minimum"],
};
