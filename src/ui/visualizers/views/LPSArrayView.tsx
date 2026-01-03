'use client';

import { LPSState } from '@/core/events/events';

interface LPSArrayViewProps {
  lpsState: LPSState;
}

export function LPSArrayView({ lpsState }: LPSArrayViewProps) {
  const { array, arrayType, currentBuildIndex } = lpsState;

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
        {arrayType === 'lps' ? 'LPS Array (Longest Proper Prefix Suffix)' : 'Z-Array'}
      </h3>

      <div className="flex flex-wrap gap-1">
        {array.map((item, idx) => {
          const isCurrentBuild = currentBuildIndex !== undefined && idx === currentBuildIndex;
          const isFuture = currentBuildIndex !== undefined && idx > currentBuildIndex;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center border rounded transition-all duration-200 ${item.highlight
                  ? 'bg-blue-500/30 border-blue-500'
                  : isCurrentBuild
                    ? 'bg-yellow-500/30 border-yellow-500'
                    : isFuture
                      ? 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-50'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
                }`}
              style={{ minWidth: '2.5rem' }}
            >
              <div className={`text-lg font-mono font-bold px-2 py-1 ${isFuture ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-primary)]'
                }`}>
                {isFuture ? '?' : item.value}
              </div>
              <div className="text-[10px] text-[var(--text-tertiary)] pb-0.5 border-t border-[var(--border-primary)] w-full text-center">
                {idx}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex gap-4 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500" />
          <span>Building</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-2 text-xs text-[var(--text-tertiary)]">
        {arrayType === 'lps'
          ? 'LPS[i] = length of longest proper prefix which is also suffix of pattern[0..i]'
          : 'Z[i] = length of longest substring starting at i that matches a prefix'}
      </div>
    </div>
  );
}
