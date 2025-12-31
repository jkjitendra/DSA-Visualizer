"use client";

import { GapData } from "@/core/events/events";

interface GapViewProps {
  gapData: GapData;
  phase?: string;
}

export function GapView({ gapData, phase }: GapViewProps) {
  const { gap, gaps, currentIdx, comparingIdx } = gapData;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Shell Sort - Gap Sequence
        </h3>
        {phase && (
          <span className="text-xs text-cyan-400 font-medium">{phase}</span>
        )}
      </div>

      {/* Current gap display */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-[var(--color-primary-500)]">
            gap = {gap}
          </div>
          <div className="text-xs text-[var(--text-tertiary)]">
            Elements {gap} positions apart
          </div>
        </div>
      </div>

      {/* Gap sequence visualization */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-xs text-[var(--text-secondary)]">Sequence:</span>
        {gaps.map((g, idx) => (
          <div
            key={idx}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${g === gap
                ? "bg-[var(--color-primary-500)] text-white scale-110"
                : idx < gaps.indexOf(gap)
                  ? "bg-gray-500 text-white opacity-50"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
              }`}
          >
            {g}
          </div>
        ))}
      </div>

      {/* Comparison indicator */}
      {currentIdx >= 0 && comparingIdx >= 0 && (
        <div className="text-center text-xs text-[var(--text-secondary)]">
          Comparing: <span className="text-orange-400">arr[{comparingIdx}]</span>
          {" ↔ "}
          <span className="text-cyan-400">arr[{currentIdx}]</span>
          <span className="text-[var(--text-tertiary)]"> (distance: {gap})</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Current Gap</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gray-500 opacity-50" />
          <span className="text-[var(--text-secondary)]">Used</span>
        </div>
      </div>
    </div>
  );
}
