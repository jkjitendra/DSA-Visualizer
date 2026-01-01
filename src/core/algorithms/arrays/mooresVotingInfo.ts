import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Moore's Voting Algorithm info card data
 */
export const mooresVotingInfo: AlgorithmInfo = {
  id: "moores-voting",
  name: "Moore's Voting Algorithm",
  description:
    "Moore's Voting Algorithm finds the majority element (appearing more than n/2 times) in O(n) time and O(1) space. Uses a clever counting technique that cancels out non-majority elements.",
  howItWorks:
    "Phase 1: Traverse array maintaining a candidate and count. If count reaches 0, pick new candidate. If current element matches candidate, increment; otherwise decrement. Phase 2: Verify the candidate actually appears > n/2 times.",
  keyInsight:
    "The majority element will always survive the cancellation process. Non-majority elements cancel each other out, leaving the majority as the final candidate.",
  bestFor: [
    "Finding element appearing > n/2 times",
    "Leader element in voting systems",
    "Streaming algorithms with limited memory",
    "Finding dominant value in datasets",
  ],
  avoidWhen: [
    "No guaranteed majority element exists",
    "Need to find element appearing > n/3 times (use modified version)",
    "Need all frequently occurring elements",
  ],
  funFact:
    "Robert S. Boyer and J Strother Moore invented this algorithm in 1981. It's also called the Boyer-Moore Voting Algorithm!",
  optimizationTips: [
    "Always verify in phase 2 if majority isn't guaranteed",
    "Can extend to find elements appearing > n/3 times with 2 candidates",
    "Works great for streaming data where you can't store all elements",
  ],
  tags: ["Voting", "O(n)", "Constant Space"],
};
