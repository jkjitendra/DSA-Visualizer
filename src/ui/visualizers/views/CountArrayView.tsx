"use client";

import { CountArrayItem } from "@/core/events/events";

interface CountArrayViewProps {
  countArray: CountArrayItem[];
  outputArray?: number[];
  phase?: string;
}

export function CountArrayView({
  countArray,
  outputArray,
  phase,
}: CountArrayViewProps) {
  if (!countArray || countArray.length === 0) return null;

  const maxCount = Math.max(...countArray.map((c) => c.count), 1);

  return (
    <div className="space-y-4">
      {/* Count Array */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            Count Array (Frequency)
          </h3>
          {phase && (
            <span className="text-xs text-[var(--text-secondary)]">
              Phase: <span className="text-cyan-400 font-medium">{phase}</span>
            </span>
          )}
        </div>

        <div className="flex gap-1 items-end justify-center">
          {countArray.map((item) => (
            <div key={item.index} className="flex flex-col items-center">
              {/* Bar */}
              <div
                className={`w-8 rounded-t transition-all duration-300 ${item.highlight
                    ? "bg-[var(--color-primary-500)]"
                    : "bg-[var(--color-accent-compare)]"
                  }`}
                style={{
                  height: `${Math.max(4, (item.count / maxCount) * 60)}px`,
                }}
              />
              {/* Count value */}
              <div className="text-xs text-[var(--text-primary)] font-medium mt-1">
                {item.count}
              </div>
              {/* Index */}
              <div className="text-xs text-[var(--text-tertiary)]">
                {item.index}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Output Array */}
      {outputArray && outputArray.length > 0 && (
        <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            Output Array (Sorted)
          </h3>
          <div className="flex gap-2 flex-wrap justify-center">
            {outputArray.map((value, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 flex items-center justify-center rounded font-medium text-sm ${value !== undefined
                    ? "bg-[var(--color-accent-sorted)] text-white"
                    : "bg-[var(--bg-card)] text-[var(--text-tertiary)] border border-dashed border-[var(--border-secondary)]"
                  }`}
              >
                {value !== undefined ? value : "-"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
