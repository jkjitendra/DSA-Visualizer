'use client';

import { DPTableState } from '@/core/events/events';

interface DPTableViewProps {
  dpTableState: DPTableState;
}

export function DPTableView({ dpTableState }: DPTableViewProps) {
  const { rows, cols, cells, maxValue, maxCell } = dpTableState;

  // Build 2D grid from cells
  const grid: (number | undefined)[][] = [];
  const highlights: (string | undefined)[][] = [];

  for (let i = 0; i <= rows.length - 1; i++) {
    grid[i] = [];
    highlights[i] = [];
    for (let j = 0; j <= cols.length - 1; j++) {
      const cell = cells.find(c => c.row === i && c.col === j);
      grid[i][j] = cell?.value;
      highlights[i][j] = cell?.highlight;
    }
  }

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
        DP Table
        {maxValue !== undefined && maxValue > 0 && (
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
            Max: {maxValue}
          </span>
        )}
      </h3>

      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              {cols.map((col, j) => (
                <th
                  key={j}
                  className="px-2 py-1 text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-primary)] bg-[var(--bg-tertiary)]"
                >
                  {col || '-'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {i === 0 ? null : (
                  <td className="px-2 py-1 text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
                    {row}
                  </td>
                )}
                {grid[i]?.map((value, j) => {
                  if (i === 0 && j === 0) return null;
                  const highlight = highlights[i]?.[j];
                  const isMax = maxCell && maxCell.row === i && maxCell.col === j;

                  return (
                    <td
                      key={j}
                      className={`px-3 py-2 text-center font-mono text-sm border border-[var(--border-primary)] transition-all duration-200 ${highlight === 'current'
                          ? 'bg-blue-500/30 text-blue-400 font-bold'
                          : highlight === 'path'
                            ? 'bg-purple-500/30 text-purple-400'
                            : highlight === 'max' || isMax
                              ? 'bg-emerald-500/30 text-emerald-400 font-bold'
                              : value && value > 0
                                ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                                : 'text-[var(--text-tertiary)]'
                        }`}
                    >
                      {value ?? 0}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-3 flex gap-4 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
          <span>Maximum</span>
        </div>
      </div>
    </div>
  );
}
