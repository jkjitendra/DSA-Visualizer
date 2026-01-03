'use client';

import { FrequencyState } from '@/core/events/events';

interface FrequencyHistogramViewProps {
  frequencyState: FrequencyState;
}

export function FrequencyHistogramView({ frequencyState }: FrequencyHistogramViewProps) {
  const { frequencies, frequencies2, isMatch } = frequencyState;

  // Find max count for scaling
  const allCounts = [...frequencies.map(f => f.count), ...(frequencies2?.map(f => f.count) || [])];
  const maxCount = Math.max(...allCounts, 1);

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
        Character Frequency
        {isMatch !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded ${isMatch ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isMatch ? '✓ Match' : '✗ Differ'}
          </span>
        )}
      </h3>

      <div className="flex gap-4">
        {/* First frequency histogram */}
        <div className="flex-1">
          {frequencies2 && <div className="text-xs text-[var(--text-secondary)] mb-2">String 1</div>}
          <div className="flex items-end gap-1 h-24">
            {frequencies.map((item, idx) => {
              const height = (item.count / maxCount) * 100;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 min-w-0">
                  <div
                    className={`w-full max-w-8 rounded-t transition-all duration-300 ${item.highlight
                        ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                        : 'bg-gradient-to-t from-[var(--color-primary-600)] to-[var(--color-primary-400)]'
                      }`}
                    style={{ height: `${height}%`, minHeight: item.count > 0 ? '4px' : '0' }}
                  />
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-1">{item.count}</div>
                  <div className="text-xs font-mono text-[var(--text-primary)]">{item.char}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Second frequency histogram (for comparison) */}
        {frequencies2 && (
          <div className="flex-1">
            <div className="text-xs text-[var(--text-secondary)] mb-2">String 2</div>
            <div className="flex items-end gap-1 h-24">
              {frequencies2.map((item, idx) => {
                const height = (item.count / maxCount) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 min-w-0">
                    <div
                      className={`w-full max-w-8 rounded-t transition-all duration-300 ${item.highlight
                          ? 'bg-gradient-to-t from-purple-500 to-purple-400'
                          : 'bg-gradient-to-t from-[var(--color-secondary-600)] to-[var(--color-secondary-400)]'
                        }`}
                      style={{ height: `${height}%`, minHeight: item.count > 0 ? '4px' : '0' }}
                    />
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-1">{item.count}</div>
                    <div className="text-xs font-mono text-[var(--text-primary)]">{item.char}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
