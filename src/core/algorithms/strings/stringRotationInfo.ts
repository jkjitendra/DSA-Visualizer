import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const stringRotationInfo: AlgorithmInfo = {
  id: "string-rotation",
  name: "String Rotation Check",
  description:
    "Determine if one string is a rotation of another (e.g., 'ABCD' rotated becomes 'CDAB') using an elegant concatenation trick.",
  howItWorks:
    "Concatenate the first string with itself. If the second string is a rotation, it must appear as a substring in this concatenation. Use any substring search algorithm.",
  keyInsight:
    "If str2 is a rotation of str1, then str2 is contained in str1+str1. This is because str1+str1 contains all possible rotations as substrings!",
  bestFor: [
    "Rotation detection",
    "Circular buffer comparisons",
    "Pattern matching problems",
    "Interview questions",
  ],
  avoidWhen: [
    "Memory is very limited (creates 2n length string)",
    "Need to find the rotation amount (need additional work)",
  ],
  funFact:
    "This elegant solution was popularized by 'Cracking the Coding Interview'. It turns a potentially O(n²) naive solution into O(n) with just one clever observation!",
  optimizationTips: [
    "Use KMP or other O(n) substring search",
    "For just checking (not finding position), this is optimal",
    "Can find rotation amount from the match position",
  ],
  tags: ["Strings", "Rotation", "Substring Search", "O(n)"],
};
