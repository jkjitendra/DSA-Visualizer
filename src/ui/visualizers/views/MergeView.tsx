"use client";

import { MergeData } from "@/core/events/events";

interface MergeViewProps {
  mergeData: MergeData;
  phase?: string;
}

export function MergeView({ mergeData, phase }: MergeViewProps) {
  const { leftArr, rightArr, leftIdx, rightIdx } = mergeData;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Merge Subarrays
        </h3>
        {phase && (
          <span className="text-xs text-cyan-400 font-medium">{phase}</span>
        )}
      </div>

      <div className="flex gap-8 justify-center">
        {/* Left subarray */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-400 font-medium mb-2">Left Array</span>
          <div className="flex gap-1">
            {leftArr.map((val, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${i === leftIdx
                    ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-110"
                    : i < leftIdx
                      ? "bg-gray-500 text-white opacity-50"
                      : "bg-blue-400/30 text-blue-400 border border-blue-400"
                  }`}
              >
                {val}
              </div>
            ))}
            {leftArr.length === 0 && (
              <span className="text-xs text-[var(--text-tertiary)] italic">empty</span>
            )}
          </div>
          {leftArr.length > 0 && (
            <span className="text-[10px] text-[var(--text-tertiary)] mt-1">
              i = {leftIdx} {leftIdx >= leftArr.length && "(done)"}
            </span>
          )}
        </div>

        {/* Merge arrow */}
        <div className="flex items-center text-2xl text-[var(--text-tertiary)]">
          →
        </div>

        {/* Right subarray */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-green-400 font-medium mb-2">Right Array</span>
          <div className="flex gap-1">
            {rightArr.map((val, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${i === rightIdx
                    ? "bg-green-500 text-white ring-2 ring-green-300 scale-110"
                    : i < rightIdx
                      ? "bg-gray-500 text-white opacity-50"
                      : "bg-green-400/30 text-green-400 border border-green-400"
                  }`}
              >
                {val}
              </div>
            ))}
            {rightArr.length === 0 && (
              <span className="text-xs text-[var(--text-tertiary)] italic">empty</span>
            )}
          </div>
          {rightArr.length > 0 && (
            <span className="text-[10px] text-[var(--text-tertiary)] mt-1">
              j = {rightIdx} {rightIdx >= rightArr.length && "(done)"}
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-[var(--text-secondary)]">Current Left</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-[var(--text-secondary)]">Current Right</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gray-500" />
          <span className="text-[var(--text-secondary)]">Merged</span>
        </div>
      </div>
    </div>
  );
}
