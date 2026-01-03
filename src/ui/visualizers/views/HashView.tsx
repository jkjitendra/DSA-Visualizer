'use client';

import { HashState } from '@/core/events/events';

interface HashViewProps {
  hashState: HashState;
}

export function HashView({ hashState }: HashViewProps) {
  const { textHash, patternHash, windowStart, windowEnd, base, modulo, isMatch } = hashState;

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
        Rolling Hash Comparison
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Text Hash */}
        <div className={`p-3 rounded-lg border ${isMatch
            ? 'bg-green-500/10 border-green-500/50'
            : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
          }`}>
          <div className="text-xs text-[var(--text-secondary)] mb-1">Window Hash</div>
          <div className="text-2xl font-mono font-bold text-[var(--color-primary-500)]">
            {textHash}
          </div>
          <div className="text-xs text-[var(--text-tertiary)] mt-1">
            [{windowStart}..{windowEnd}]
          </div>
        </div>

        {/* Pattern Hash */}
        <div className={`p-3 rounded-lg border ${isMatch
            ? 'bg-green-500/10 border-green-500/50'
            : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
          }`}>
          <div className="text-xs text-[var(--text-secondary)] mb-1">Pattern Hash</div>
          <div className="text-2xl font-mono font-bold text-purple-400">
            {patternHash}
          </div>
          <div className="text-xs text-[var(--text-tertiary)] mt-1">
            target
          </div>
        </div>
      </div>

      {/* Match indicator */}
      <div className={`mt-3 p-2 rounded text-center text-sm font-medium ${isMatch
          ? 'bg-green-500/20 text-green-400'
          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
        }`}>
        {isMatch ? '✓ Hash Match - Verifying...' : `${textHash} ≠ ${patternHash}`}
      </div>

      {/* Hash parameters */}
      {(base || modulo) && (
        <div className="mt-3 flex gap-4 text-xs text-[var(--text-tertiary)]">
          {base && <span>Base: {base}</span>}
          {modulo && <span>Mod: {modulo}</span>}
        </div>
      )}
    </div>
  );
}
