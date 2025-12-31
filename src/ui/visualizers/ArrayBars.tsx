"use client";

import { useMemo } from "react";

interface ArrayBarsProps {
  values: number[];
  markedIndices: Map<number, string>;
  maxValue?: number;
}

const markColors: Record<string, { bg: string; border: string }> = {
  comparing: {
    bg: "var(--color-accent-compare)",
    border: "var(--color-accent-compare)",
  },
  swapping: {
    bg: "var(--color-accent-swap)",
    border: "var(--color-accent-swap)",
  },
  sorted: {
    bg: "var(--color-accent-sorted)",
    border: "var(--color-accent-sorted)",
  },
  pivot: {
    bg: "var(--color-accent-pivot)",
    border: "var(--color-accent-pivot)",
  },
  current: {
    bg: "var(--color-accent-current)",
    border: "var(--color-accent-current)",
  },
  minimum: {
    bg: "var(--color-primary-500)",
    border: "var(--color-primary-500)",
  },
};

const defaultColor = {
  bg: "var(--color-primary-400)",
  border: "var(--color-primary-500)",
};

export function ArrayBars({ values, markedIndices, maxValue }: ArrayBarsProps) {
  const max = maxValue ?? Math.max(...values, 1);
  const barWidth = Math.max(100 / values.length - 1, 2);
  const gap = Math.min(1, 10 / values.length);

  const bars = useMemo(() => {
    return values.map((value, index) => {
      const height = (value / max) * 100;
      const markType = markedIndices.get(index);
      const colors = markType ? markColors[markType] || defaultColor : defaultColor;
      const left = index * (barWidth + gap);

      return {
        index,
        value,
        height,
        left,
        colors,
        markType,
      };
    });
  }, [values, markedIndices, max, barWidth, gap]);

  return (
    <div className="relative w-full h-full min-h-[200px] p-4 pb-8">
      <div className="relative w-full h-full flex items-end justify-center gap-[2px]">
        {bars.map((bar) => (
          <div
            key={bar.index}
            className="relative flex flex-col items-center transition-all duration-200 ease-out"
            style={{
              width: `${barWidth}%`,
              height: `${bar.height}%`,
              minHeight: "20px",
            }}
          >
            {/* Bar */}
            <div
              className="w-full h-full rounded-t-sm transition-all duration-200"
              style={{
                background: bar.colors.bg,
                boxShadow: bar.markType
                  ? `0 0 10px ${bar.colors.bg}`
                  : undefined,
              }}
            />

            {/* Value label (show if bars are wide enough) */}
            {barWidth > 4 && (
              <span
                className="absolute -bottom-6 text-xs font-medium text-[var(--text-secondary)]"
                style={{ fontSize: Math.min(12, barWidth * 1.5) }}
              >
                {bar.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
