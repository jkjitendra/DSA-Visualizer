"use client";

import { useRef, useEffect } from "react";

interface ExecutionConsoleProps {
  logs: string[];
  error?: {
    message: string;
    line?: number;
  };
  isRunning?: boolean;
}

export function ExecutionConsole({ logs, error, isRunning }: ExecutionConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">Console</span>
          {isRunning && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Running...</span>
            </div>
          )}
        </div>
        {logs.length > 0 && (
          <span className="text-xs text-[var(--text-tertiary)]">
            {logs.length} message{logs.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Console output */}
      <div
        ref={consoleRef}
        className="h-32 overflow-y-auto p-3 font-mono text-sm space-y-1"
      >
        {logs.length === 0 && !error && (
          <p className="text-[var(--text-tertiary)] italic">
            Console output will appear here...
          </p>
        )}

        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-[var(--text-tertiary)] select-none">&gt;</span>
            <span className="text-[var(--text-secondary)]">{log}</span>
          </div>
        ))}

        {error && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <span>❌</span>
              <span className="font-medium">Error</span>
              {error.line && (
                <span className="text-xs text-red-300">(line {error.line})</span>
              )}
            </div>
            <p className="mt-1 text-sm text-red-300">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
