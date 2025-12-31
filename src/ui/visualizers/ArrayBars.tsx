"use client";

import { useMemo } from "react";
import { VariablePointer } from "@/core/player/types";

interface ArrayBarsProps {
  values: number[];
  markedIndices: Map<number, string>;
  pointers?: VariablePointer[];
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

export function ArrayBars({ values, markedIndices, pointers = [], maxValue }: ArrayBarsProps) {
  const max = maxValue ?? Math.max(...values, 1);
  const barWidth = Math.max(100 / values.length - 1, 2);

  // Create a map of index -> pointer labels
  const pointerMap = useMemo(() => {
    const map = new Map<number, VariablePointer[]>();
    pointers.forEach((pointer) => {
      const existing = map.get(pointer.index) || [];
      existing.push(pointer);
      map.set(pointer.index, existing);
    });
    return map;
  }, [pointers]);

  const bars = useMemo(() => {
    return values.map((value, index) => {
      const height = (value / max) * 100;
      const markType = markedIndices.get(index);
      const colors = markType ? markColors[markType] || defaultColor : defaultColor;
      const indexPointers = pointerMap.get(index) || [];

      return {
        index,
        value,
        height,
        colors,
        markType,
        pointers: indexPointers,
      };
    });
  }, [values, markedIndices, max, pointerMap]);

  return (
    <div className="relative w-full h-full min-h-[200px] p-4 pt-10 pb-8">
      <div className="relative w-full h-full flex items-end justify-center gap-1">
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
            {/* Pointer labels above bar */}
            {bar.pointers.length > 0 && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
                {bar.pointers.map((pointer, idx) => (
                  <div
                    key={`${pointer.label}-${idx}`}
                    className="flex flex-col items-center"
                  >
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{
                        color: pointer.color || "var(--color-primary-400)",
                        backgroundColor: `color-mix(in srgb, ${pointer.color || "var(--color-primary-400)"} 20%, transparent)`,
                      }}
                    >
                      {pointer.label}
                    </span>
                    <span
                      className="text-lg leading-none"
                      style={{ color: pointer.color || "var(--color-primary-400)" }}
                    >
                      ↓
                    </span>
                  </div>
                ))}
              </div>
            )}

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

