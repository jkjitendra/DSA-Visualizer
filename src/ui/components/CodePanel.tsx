"use client";

interface CodePanelProps {
  lines: string[];
  highlightedLines: number[];
  title?: string;
}

export function CodePanel({ lines, highlightedLines, title = "Pseudocode" }: CodePanelProps) {
  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)]">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {title}
        </span>
      </div>

      {/* Code content */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="space-y-0.5">
          {lines.map((line, index) => {
            const isHighlighted = highlightedLines.includes(index);
            const indentMatch = line.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1].length : 0;

            return (
              <div
                key={index}
                className={`flex transition-all duration-200 rounded ${isHighlighted
                    ? "bg-[var(--color-primary-500)]/20 border-l-2 border-[var(--color-primary-500)]"
                    : "border-l-2 border-transparent"
                  }`}
              >
                {/* Line number */}
                <span
                  className={`w-8 flex-shrink-0 text-right pr-3 select-none ${isHighlighted
                      ? "text-[var(--color-primary-500)]"
                      : "text-[var(--text-tertiary)]"
                    }`}
                >
                  {index}
                </span>

                {/* Code line */}
                <code
                  className={`flex-1 ${isHighlighted
                      ? "text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)]"
                    }`}
                  style={{ paddingLeft: `${indent * 0.5}rem` }}
                >
                  {line.trim()}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
