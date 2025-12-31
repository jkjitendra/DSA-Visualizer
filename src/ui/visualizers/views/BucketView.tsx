"use client";

import { BucketData } from "@/core/events/events";

interface BucketViewProps {
  buckets: BucketData[];
  title?: string;
  currentDigit?: number;
  maxDigit?: number;
  phase?: string;
}

const bucketColors = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
];

export function BucketView({
  buckets,
  title = "Buckets",
  currentDigit,
  maxDigit,
  phase,
}: BucketViewProps) {
  if (!buckets || buckets.length === 0) return null;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          {currentDigit !== undefined && maxDigit !== undefined && (
            <span>
              Digit: <span className="text-[var(--color-primary-500)] font-medium">{currentDigit}</span> / {maxDigit}
            </span>
          )}
          {phase && (
            <span>
              Phase: <span className="text-cyan-400 font-medium">{phase}</span>
            </span>
          )}
        </div>
      </div>

      {/* Buckets Grid */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {buckets.map((bucket) => (
          <div
            key={bucket.id}
            className={`flex-shrink-0 min-w-[60px] rounded-lg border transition-all duration-200 ${bucket.highlight
                ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10"
                : "border-[var(--border-secondary)] bg-[var(--bg-card)]"
              }`}
          >
            {/* Bucket Label */}
            <div className="text-center py-1 text-xs font-medium text-[var(--text-secondary)] border-b border-[var(--border-secondary)]">
              {bucket.label}
            </div>

            {/* Bucket Values */}
            <div className="p-2 min-h-[80px] flex flex-col-reverse gap-1">
              {bucket.values.map((value, idx) => (
                <div
                  key={`${bucket.id}-${idx}`}
                  className={`px-2 py-1 text-xs font-medium text-white rounded text-center ${bucketColors[bucket.id % bucketColors.length]
                    }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
