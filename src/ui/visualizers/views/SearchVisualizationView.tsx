"use client";

import { SearchRangeData } from "@/core/events/events";

interface SearchVisualizationViewProps {
  searchData: SearchRangeData;
}

export function SearchVisualizationView({ searchData }: SearchVisualizationViewProps) {
  const {
    arrayLength,
    low,
    high,
    mid,
    mid1,
    mid2,
    eliminated = [],
    algorithm,
    comparisons = 0,
    jumpBlock,
    probePosition,
    fibNumbers,
    exponentialRange,
  } = searchData;

  // Calculate percentages for the range bar
  const getPercentage = (index: number) => (index / (arrayLength - 1)) * 100;

  const lowPercent = getPercentage(low);
  const highPercent = getPercentage(Math.min(high, arrayLength - 1));
  const midPercent = mid !== undefined ? getPercentage(mid) : undefined;
  const mid1Percent = mid1 !== undefined ? getPercentage(mid1) : undefined;
  const mid2Percent = mid2 !== undefined ? getPercentage(mid2) : undefined;

  // Determine search space remaining percentage
  const searchSpacePercent = ((Math.max(0, high - low + 1)) / arrayLength) * 100;

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          🔍 Search Progress
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
          {searchSpacePercent.toFixed(0)}% remaining
        </span>
      </div>

      {/* Search Range Bar */}
      <div className="relative h-8 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
        {/* Eliminated regions */}
        {eliminated.map((region, idx) => (
          <div
            key={idx}
            className="absolute top-0 bottom-0 bg-red-500/30 transition-all duration-300"
            style={{
              left: `${getPercentage(region.start)}%`,
              width: `${Math.max(1, getPercentage(region.end) - getPercentage(region.start))}%`,
            }}
          />
        ))}

        {/* Active search range */}
        <div
          className="absolute top-0 bottom-0 bg-[var(--color-primary-500)]/30 border-x-2 border-[var(--color-primary-500)] transition-all duration-300"
          style={{
            left: `${lowPercent}%`,
            width: `${Math.max(1, highPercent - lowPercent)}%`,
          }}
        />

        {/* Pointer markers */}
        {/* Low pointer */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-500 transition-all duration-300"
          style={{ left: `${lowPercent}%` }}
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-blue-500 bg-[var(--bg-card)] px-1 rounded">
            L
          </span>
        </div>

        {/* High pointer */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-purple-500 transition-all duration-300"
          style={{ left: `${Math.min(highPercent, 100)}%` }}
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-purple-500 bg-[var(--bg-card)] px-1 rounded">
            H
          </span>
        </div>

        {/* Mid pointer (for binary search variants) */}
        {midPercent !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-2 bg-yellow-500 rounded transition-all duration-300"
            style={{ left: `calc(${midPercent}% - 4px)` }}
          >
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-yellow-500 bg-[var(--bg-card)] px-1 rounded">
              M
            </span>
          </div>
        )}

        {/* Mid1 pointer (for ternary search) */}
        {mid1Percent !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-2 bg-orange-500 rounded transition-all duration-300"
            style={{ left: `calc(${mid1Percent}% - 4px)` }}
          >
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-orange-500 bg-[var(--bg-card)] px-1 rounded">
              M1
            </span>
          </div>
        )}

        {/* Mid2 pointer (for ternary search) */}
        {mid2Percent !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-2 bg-pink-500 rounded transition-all duration-300"
            style={{ left: `calc(${mid2Percent}% - 4px)` }}
          >
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-pink-500 bg-[var(--bg-card)] px-1 rounded">
              M2
            </span>
          </div>
        )}

        {/* Index labels */}
        <div className="absolute left-1 bottom-0.5 text-[9px] text-[var(--text-tertiary)]">0</div>
        <div className="absolute right-1 bottom-0.5 text-[9px] text-[var(--text-tertiary)]">{arrayLength - 1}</div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-primary-500)]/30 border border-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Active Range</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500/30" />
          <span className="text-[var(--text-secondary)]">Eliminated</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)]" />
          <span className="text-[var(--text-secondary)]">Unchecked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-[var(--text-secondary)]">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span className="text-[var(--text-secondary)]">High</span>
        </div>
        {(midPercent !== undefined || mid1Percent !== undefined) && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span className="text-[var(--text-secondary)]">Mid</span>
          </div>
        )}
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <div className="text-[10px] text-[var(--text-tertiary)]">Search Space</div>
          <div className="text-sm font-semibold text-[var(--color-primary-500)]">
            {searchSpacePercent.toFixed(1)}%
          </div>
        </div>
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <div className="text-[10px] text-[var(--text-tertiary)]">Range</div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">
            [{low}, {Math.min(high, arrayLength - 1)}]
          </div>
        </div>
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <div className="text-[10px] text-[var(--text-tertiary)]">Comparisons</div>
          <div className="text-sm font-semibold text-[var(--color-secondary-500)]">
            {comparisons}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <div className="text-[10px] text-[var(--text-tertiary)]">Elements Left</div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">
            {Math.max(0, high - low + 1)} / {arrayLength}
          </div>
        </div>
      </div>

      {/* Algorithm-Specific Info */}
      {algorithm === 'jump-search' && jumpBlock !== undefined && (
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Jump Search Block Size</div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-primary-500)]">√{arrayLength}</span>
            <span className="text-[var(--text-tertiary)]">=</span>
            <span className="text-lg font-semibold text-[var(--text-primary)]">{jumpBlock}</span>
          </div>
        </div>
      )}

      {algorithm === 'interpolation-search' && probePosition !== undefined && (
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Interpolation Formula</div>
          <div className="text-xs font-mono text-[var(--text-primary)]">
            pos = low + ((target - arr[low]) × (high - low)) / (arr[high] - arr[low])
          </div>
          <div className="text-sm font-semibold text-[var(--color-primary-500)] mt-1">
            Probe Position: {probePosition}
          </div>
        </div>
      )}

      {algorithm === 'fibonacci-search' && fibNumbers && fibNumbers.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Fibonacci Numbers Used</div>
          <div className="flex flex-wrap gap-1">
            {fibNumbers.map((fib, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-xs font-mono ${idx === fibNumbers.length - 1
                  ? 'bg-[var(--color-primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  }`}
              >
                {fib}
              </span>
            ))}
          </div>
        </div>
      )}

      {algorithm === 'exponential-search' && exponentialRange && exponentialRange.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Exponential Range Expansion</div>
          <div className="flex flex-wrap items-center gap-1">
            {exponentialRange.map((range, idx) => (
              <span key={idx} className="flex items-center">
                <span className={`px-2 py-0.5 rounded text-xs font-mono ${idx === exponentialRange.length - 1
                  ? 'bg-[var(--color-primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  }`}>
                  {range}
                </span>
                {idx < exponentialRange.length - 1 && (
                  <span className="mx-1 text-[var(--text-tertiary)]">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
