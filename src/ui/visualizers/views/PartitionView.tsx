"use client";

import { PartitionData } from "@/core/events/events";

interface PartitionViewProps {
  partitionData: PartitionData;
  phase?: string;
}

export function PartitionView({ partitionData, phase }: PartitionViewProps) {
  const { low, high, pivotIdx, pivotValue, i } = partitionData;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Quick Sort - Partition
        </h3>
        {phase && (
          <span className="text-xs text-cyan-400 font-medium">{phase}</span>
        )}
      </div>

      {/* Partition regions visualization */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {/* Region labels */}
        <div className="flex w-full max-w-md">
          {/* Less than pivot region */}
          <div
            className="flex-1 h-8 bg-green-500/30 border border-green-500 rounded-l-lg flex items-center justify-center text-xs font-medium text-green-400"
            style={{ flex: Math.max(1, i - low + 1) }}
          >
            &lt; pivot
          </div>

          {/* Unknown region */}
          <div
            className="flex-1 h-8 bg-gray-500/30 border-t border-b border-gray-500 flex items-center justify-center text-xs font-medium text-gray-400"
            style={{ flex: Math.max(1, high - i - 1) }}
          >
            unsorted
          </div>

          {/* Pivot */}
          <div className="w-12 h-8 bg-[var(--color-primary-500)] border border-[var(--color-primary-300)] rounded-r-lg flex items-center justify-center text-xs font-bold text-white">
            {pivotValue}
          </div>
        </div>
      </div>

      {/* Index indicators */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="text-center">
          <div className="text-xs text-[var(--text-tertiary)]">Range</div>
          <div className="text-[var(--text-primary)]">[{low}..{high}]</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--text-tertiary)]">Pivot Index</div>
          <div className="text-[var(--color-primary-500)] font-bold">{pivotIdx}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--text-tertiary)]">Boundary (i)</div>
          <div className="text-green-400 font-bold">{i}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-[var(--text-secondary)]">≤ Pivot</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gray-500" />
          <span className="text-[var(--text-secondary)]">Unsorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Pivot</span>
        </div>
      </div>
    </div>
  );
}
