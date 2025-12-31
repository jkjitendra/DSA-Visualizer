"use client";

import { RunData } from "@/core/events/events";

interface RunViewProps {
  runData: RunData;
  phase?: string;
}

export function RunView({ runData, phase }: RunViewProps) {
  const { runs, currentRun } = runData;

  const phaseColors = {
    detecting: 'text-yellow-400',
    sorting: 'text-blue-400',
    merging: 'text-green-400',
  };

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Tim Sort - Runs
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${phaseColors[runData.phase]}`}>
            Phase: {runData.phase.charAt(0).toUpperCase() + runData.phase.slice(1)}
          </span>
        </div>
      </div>

      {/* Runs visualization */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {runs.map((run, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-lg border transition-all ${idx === currentRun
                ? "bg-[var(--color-primary-500)] text-white border-[var(--color-primary-300)] scale-105 shadow-lg"
                : runData.phase === 'sorting' && idx < (currentRun ?? 0)
                  ? "bg-green-500/30 text-green-400 border-green-500"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-primary)]"
              }`}
          >
            <div className="text-xs font-medium">Run {idx + 1}</div>
            <div className="text-sm font-bold">[{run.start}..{run.end}]</div>
            <div className="text-[10px] opacity-70">
              {run.end - run.start + 1} elements
            </div>
          </div>
        ))}
        {runs.length === 0 && (
          <span className="text-xs text-[var(--text-tertiary)] italic">
            Detecting runs...
          </span>
        )}
      </div>

      {/* Summary */}
      <div className="text-center text-xs text-[var(--text-secondary)]">
        {runs.length > 0 && (
          <span>
            Total: <span className="text-[var(--color-primary-500)] font-bold">{runs.length}</span> runs
            {currentRun !== undefined && (
              <span> • Processing run <span className="text-cyan-400 font-bold">{currentRun + 1}</span></span>
            )}
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Current Run</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/50" />
          <span className="text-[var(--text-secondary)]">Sorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border border-[var(--border-primary)]" />
          <span className="text-[var(--text-secondary)]">Pending</span>
        </div>
      </div>
    </div>
  );
}
