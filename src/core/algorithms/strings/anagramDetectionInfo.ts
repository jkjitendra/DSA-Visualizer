import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const anagramDetectionInfo: AlgorithmInfo = {
  id: "anagram-detection",
  name: "Anagram Detection",
  description:
    "Determine if two strings are anagrams (contain the same characters with the same frequencies, possibly in different order).",
  howItWorks:
    "Build a frequency map for each string by counting occurrences of each character. If both maps are identical, the strings are anagrams.",
  keyInsight:
    "Using a hash map for frequency counting gives O(n) time. Alternative: sort both strings and compare (O(n log n) but simpler).",
  bestFor: [
    "Word games and puzzles",
    "Plagiarism detection",
    "Cryptography basics",
    "Interview problems",
  ],
  avoidWhen: [
    "Case sensitivity matters (normalize first)",
    "Spaces/punctuation should be ignored (preprocess)",
  ],
  funFact:
    "Some famous anagrams: 'listen' = 'silent', 'astronomer' = 'moon starer', and 'the eyes' = 'they see'!",
  optimizationTips: [
    "Use a single map: increment for str1, decrement for str2, check all zeros",
    "For ASCII, use array[26] instead of hash map",
    "Early exit if lengths differ",
  ],
  tags: ["Strings", "Hash Map", "Frequency", "O(n)"],
};
