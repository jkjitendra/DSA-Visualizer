'use client';

import { VariablePointer } from '@/core/player/types';

interface StringBarsProps {
  values: number[];  // Character codes
  markedIndices: Map<number, string>;
  pointers?: VariablePointer[];
}

const markerColors: Record<string, string> = {
  current: 'var(--color-accent-compare)',
  swap: 'var(--color-accent-swap)',
  sorted: 'var(--color-accent-sorted)',
  pivot: 'var(--color-primary-500)',
  match: '#22c55e',  // green-500
  mismatch: '#ef4444',  // red-500
  found: '#10b981',  // emerald-500
  pattern: '#a855f7',  // purple-500
};

export function StringBars({ values, markedIndices, pointers = [] }: StringBarsProps) {
  // Convert character codes to actual characters
  const chars = values.map(v => String.fromCharCode(v));

  // Get pointer for a specific index
  const getPointerForIndex = (index: number) => {
    return pointers.find(p => p.index === index);
  };

  return (
    <div className="h-full flex items-center justify-center px-2">
      <div className="flex items-end gap-1 sm:gap-2 justify-center flex-wrap">
        {chars.map((char, index) => {
          const marker = markedIndices.get(index);
          const pointer = getPointerForIndex(index);
          const color = marker ? markerColors[marker] || 'var(--color-bar-default)' : 'var(--color-bar-default)';

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              {/* Pointer label above */}
              {pointer && (
                <div
                  className="text-xs font-medium px-1.5 py-0.5 rounded whitespace-nowrap"
                  style={{
                    backgroundColor: `${pointer.color}20`,
                    color: pointer.color,
                    border: `1px solid ${pointer.color}40`,
                  }}
                >
                  {pointer.label}
                </div>
              )}

              {/* Character box */}
              <div
                className={`
                  relative flex flex-col items-center justify-center
                  min-w-[2.5rem] sm:min-w-[3rem] h-[3.5rem] sm:h-[4rem]
                  rounded-lg border-2 transition-all duration-200
                  ${pointer ? 'scale-110 shadow-lg' : ''}
                `}
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: color,
                }}
              >
                {/* Character */}
                <span
                  className="text-xl sm:text-2xl font-mono font-bold"
                  style={{ color }}
                >
                  {char}
                </span>

                {/* Index below character */}
                <span className="text-[10px] text-[var(--text-tertiary)] absolute -bottom-4">
                  {index}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
