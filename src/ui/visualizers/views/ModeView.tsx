"use client";

import { ModeData } from "@/core/events/events";

interface ModeViewProps {
  modeData: ModeData;
  phase?: string;
}

export function ModeView({ modeData, phase }: ModeViewProps) {
  const { mode, depth, maxDepth, range } = modeData;

  const modeConfig = {
    quicksort: {
      color: 'bg-blue-500',
      icon: '⚡',
      label: 'Quick Sort',
      description: 'Fast partitioning',
    },
    heapsort: {
      color: 'bg-orange-500',
      icon: '🌳',
      label: 'Heap Sort',
      description: 'Depth limit reached',
    },
    insertion: {
      color: 'bg-green-500',
      icon: '📝',
      label: 'Insertion Sort',
      description: 'Small subarray',
    },
  };

  const config = modeConfig[mode];
  const depthPercent = maxDepth > 0 ? ((maxDepth - depth) / maxDepth) * 100 : 0;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Intro Sort - Mode
        </h3>
        {phase && (
          <span className="text-xs text-cyan-400 font-medium">{phase}</span>
        )}
      </div>

      {/* Current mode display */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${config.color} text-white shadow-lg`}>
          <span className="text-2xl">{config.icon}</span>
          <div>
            <div className="font-bold text-lg">{config.label}</div>
            <div className="text-xs opacity-80">{config.description}</div>
          </div>
        </div>
      </div>

      {/* Depth meter */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
          <span>Recursion Depth</span>
          <span>{maxDepth - depth} / {maxDepth}</span>
        </div>
        <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${depthPercent > 80 ? 'bg-red-500' : depthPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            style={{ width: `${depthPercent}%` }}
          />
        </div>
        {depthPercent > 80 && (
          <div className="text-xs text-orange-400 mt-1 text-center">
            ⚠️ Approaching depth limit - may switch to Heap Sort
          </div>
        )}
      </div>

      {/* Current range */}
      <div className="text-center text-sm text-[var(--text-secondary)]">
        Processing range: <span className="text-[var(--color-primary-500)] font-bold">[{range.lo}..{range.hi}]</span>
        <span className="text-xs text-[var(--text-tertiary)]"> ({range.hi - range.lo + 1} elements)</span>
      </div>

      {/* Mode legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-[var(--text-secondary)]">Quick</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-[var(--text-secondary)]">Heap</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-[var(--text-secondary)]">Insertion</span>
        </div>
      </div>
    </div>
  );
}
