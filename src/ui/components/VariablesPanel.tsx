"use client";

import { VariableValue } from "@/core/player/types";

interface VariablesPanelProps {
  variables: VariableValue[];
  expression?: string;
}

export function VariablesPanel({ variables, expression }: VariablesPanelProps) {
  if (variables.length === 0 && !expression) {
    return null;
  }

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-3">
      <h3 className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
        Variables
      </h3>

      {/* Variable boxes - Programiz style */}
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {variables.map((variable, idx) => (
            <div
              key={`${variable.name}-${idx}`}
              className={`flex flex-col items-center transition-all duration-200 ${variable.highlight ? "scale-105" : ""
                }`}
            >
              {/* Variable name */}
              <span className="text-[10px] text-[var(--text-secondary)] font-medium mb-1">
                {variable.name}
              </span>
              {/* Value box */}
              <div
                className={`min-w-[42px] px-3 py-2 rounded-md text-center font-mono text-sm font-semibold border-2 transition-all duration-200 ${variable.highlight
                    ? "bg-[var(--color-primary-500)]/20 border-[var(--color-primary-500)] text-[var(--color-primary-300)] shadow-[0_0_10px_var(--color-primary-500)/30]"
                    : "bg-[var(--bg-tertiary)] border-[var(--border-primary)] text-[var(--text-primary)]"
                  }`}
              >
                {variable.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expression */}
      {expression && (
        <div className="pt-2 border-t border-[var(--border-primary)]">
          <div className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] font-mono text-sm">
            <span className="text-[var(--color-secondary-400)]">{expression}</span>
          </div>
        </div>
      )}
    </div>
  );
}
