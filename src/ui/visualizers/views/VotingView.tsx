"use client";

import { VotingData } from "@/core/events/events";

interface VotingViewProps {
  votingData: VotingData;
  phase?: string;
}

export function VotingView({ votingData }: VotingViewProps) {
  const { candidate, count, phase, verifyCount, threshold, isMajority } = votingData;

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <span>🗳️</span>
        Moore&apos;s Voting
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
          {phase === 'finding' ? 'Finding Candidate' : phase === 'verifying' ? 'Verifying' : 'Result'}
        </span>
      </h3>

      <div className="flex items-center justify-center gap-8">
        {/* Candidate Box */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[var(--text-tertiary)] mb-1">Candidate</span>
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${candidate !== null
                ? 'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white shadow-lg'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
              }`}
          >
            {candidate !== null ? candidate : '?'}
          </div>
        </div>

        {/* Count Display */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[var(--text-tertiary)] mb-1">
            {phase === 'verifying' ? 'Verify Count' : 'Count'}
          </span>
          <div className="flex items-center gap-1">
            {/* Count visualization as blocks */}
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(Math.abs(phase === 'verifying' && verifyCount !== undefined ? verifyCount : count), 10) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-8 rounded-sm transition-all duration-200 ${(phase === 'verifying' && verifyCount !== undefined ? verifyCount : count) > 0
                      ? 'bg-[var(--color-accent-sorted)]'
                      : 'bg-[var(--color-accent-pivot)]'
                    }`}
                  style={{
                    opacity: 0.5 + (i * 0.05),
                  }}
                />
              ))}
            </div>
            <span className={`ml-2 text-2xl font-bold ${(phase === 'verifying' && verifyCount !== undefined ? verifyCount : count) > 0
                ? 'text-[var(--color-accent-sorted)]'
                : count === 0
                  ? 'text-[var(--text-tertiary)]'
                  : 'text-[var(--color-accent-pivot)]'
              }`}>
              {phase === 'verifying' && verifyCount !== undefined ? verifyCount : count}
            </span>
          </div>
        </div>

        {/* Threshold (shown during verify phase) */}
        {phase === 'verifying' && threshold !== undefined && (
          <div className="flex flex-col items-center">
            <span className="text-xs text-[var(--text-tertiary)] mb-1">Threshold</span>
            <div className="flex items-center gap-2">
              <span className="text-lg text-[var(--text-secondary)]">&gt;</span>
              <span className="text-2xl font-bold text-[var(--color-secondary-500)]">
                {threshold}
              </span>
            </div>
          </div>
        )}

        {/* Result (shown in result phase) */}
        {phase === 'result' && (
          <div className="flex flex-col items-center">
            <span className="text-xs text-[var(--text-tertiary)] mb-1">Result</span>
            <div className={`px-4 py-2 rounded-lg font-bold ${isMajority
                ? 'bg-[var(--color-accent-sorted)]/20 text-[var(--color-accent-sorted)]'
                : 'bg-[var(--color-accent-pivot)]/20 text-[var(--color-accent-pivot)]'
              }`}>
              {isMajority ? '✓ Majority Found!' : '✗ No Majority'}
            </div>
          </div>
        )}
      </div>

      {/* Phase description */}
      <div className="mt-3 text-center text-xs text-[var(--text-tertiary)]">
        {phase === 'finding' && (
          <>Same value → count++, Different value → count-- (if 0, new candidate)</>
        )}
        {phase === 'verifying' && (
          <>Counting actual occurrences of candidate {candidate}</>
        )}
        {phase === 'result' && isMajority && (
          <>{candidate} appears {verifyCount} times (more than n/2 = {threshold})</>
        )}
        {phase === 'result' && !isMajority && (
          <>{candidate} appears only {verifyCount} times (need more than {threshold})</>
        )}
      </div>
    </div>
  );
}
