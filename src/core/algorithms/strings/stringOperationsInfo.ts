import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * String Operations algorithm info card data
 */
export const stringOperationsInfo: AlgorithmInfo = {
  id: "string-operations",
  name: "String Operations",
  description:
    "Fundamental string operations that form the building blocks of text processing. Learn how to traverse, manipulate, and analyze character sequences.",
  howItWorks:
    "Strings are stored as arrays of characters. Basic operations iterate through these characters to perform tasks like traversal (visiting each character), reversal (swapping characters from ends toward center), and palindrome checking (comparing characters from both ends).",
  keyInsight:
    "The two-pointer technique is central to many string operations - using pointers from both ends allows O(n) solutions for reversal and palindrome checking without extra space.",
  bestFor: [
    "Learning string fundamentals",
    "Character-by-character processing",
    "In-place string manipulation",
    "Palindrome detection",
  ],
  avoidWhen: [
    "Working with immutable strings (some languages)",
    "Unicode/multi-byte character handling needed",
    "Complex pattern matching required",
  ],
  funFact:
    "The word 'palindrome' comes from Greek - 'palin' (again) and 'dromos' (way). The longest single-word palindrome in English is 'tattarrattat', coined by James Joyce!",
  optimizationTips: [
    "Use two pointers for O(1) space reversal",
    "Early termination when mismatch found in palindrome check",
    "Consider case-insensitive comparison if needed",
  ],
  tags: ["Strings", "Two Pointers", "In-Place", "O(n)"],
};
