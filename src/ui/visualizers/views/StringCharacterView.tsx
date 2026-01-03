'use client';

import { StringCharsState } from '@/core/events/events';

interface StringCharacterViewProps {
  stringChars: StringCharsState;
}

const highlightColors: Record<string, string> = {
  match: 'bg-green-500/30 border-green-500',
  mismatch: 'bg-red-500/30 border-red-500',
  current: 'bg-blue-500/30 border-blue-500',
  pattern: 'bg-purple-500/30 border-purple-500',
  found: 'bg-emerald-500/30 border-emerald-500',
};

export function StringCharacterView({ stringChars }: StringCharacterViewProps) {
  const { text, pattern, patternOffset = 0, matchPositions = [] } = stringChars;

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
        String View
      </h3>

      {/* Text string */}
      <div className="mb-4">
        <div className="text-xs text-[var(--text-secondary)] mb-1">Text</div>
        <div className="flex flex-wrap gap-1">
          {text.map((char, idx) => {
            const isMatchPosition = matchPositions.includes(idx);
            const highlightClass = isMatchPosition
              ? highlightColors.found
              : (char.highlight ? highlightColors[char.highlight] || '' : '');

            return (
              <div
                key={idx}
                className={`relative flex flex-col items-center ${highlightClass} border rounded transition-all duration-200`}
                style={{ minWidth: '2rem' }}
              >
                <div className="text-lg font-mono font-bold text-[var(--text-primary)] px-2 py-1">
                  {char.char}
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] pb-0.5">
                  {idx}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern string (if provided) */}
      {pattern && pattern.length > 0 && (
        <div>
          <div className="text-xs text-[var(--text-secondary)] mb-1">Pattern</div>
          <div className="flex flex-wrap gap-1" style={{ paddingLeft: `${patternOffset * 2.25}rem` }}>
            {pattern.map((char, idx) => {
              const highlightClass = char.highlight ? highlightColors[char.highlight] || '' : '';

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center ${highlightClass} border border-purple-500/50 rounded transition-all duration-200`}
                  style={{ minWidth: '2rem' }}
                >
                  <div className="text-lg font-mono font-bold text-purple-400 px-2 py-1">
                    {char.char}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] pb-0.5">
                    {idx}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Match positions indicator */}
      {/* {matchPositions.length > 0 && (
        <div className="mt-3 text-xs text-[var(--text-secondary)]">
          <span className="text-emerald-400">●</span> Matches found at: [{matchPositions.join(', ')}]
        </div>
      )} */}
    </div>
  );
}
