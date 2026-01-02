import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const characterFrequencyInfo: AlgorithmInfo = {
  id: "character-frequency",
  name: "Character Frequency",
  description:
    "Count the occurrences of each character in a string, visualized as a dynamic histogram. Essential for many string algorithms.",
  howItWorks:
    "Iterate through each character, maintaining a hash map (frequency table) that maps characters to their counts. Increment the count each time a character is encountered.",
  keyInsight:
    "Using a hash map provides O(1) average lookup and insertion, making the overall algorithm O(n) regardless of the alphabet size.",
  bestFor: [
    "Anagram detection",
    "Finding most/least common characters",
    "Compression algorithms (Huffman)",
    "Text analysis and cryptography",
  ],
  avoidWhen: [
    "Only need to check presence, not count",
    "Memory is extremely constrained",
  ],
  funFact:
    "In English text, 'E' is the most common letter (~12.7%), followed by 'T' (~9.1%). This frequency analysis was used to crack the Enigma code in WWII!",
  optimizationTips: [
    "Use array instead of map for ASCII characters",
    "Consider case normalization (toLowerCase)",
    "Skip non-alphabetic characters if not needed",
  ],
  tags: ["Strings", "Hash Map", "Frequency", "O(n)"],
};
