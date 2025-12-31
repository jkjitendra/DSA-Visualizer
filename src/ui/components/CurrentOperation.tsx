"use client";

interface CurrentOperationProps {
  message: string;
  operationType?: "compare" | "swap" | "mark" | "idle";
}

export function CurrentOperation({ message, operationType = "idle" }: CurrentOperationProps) {
  const getOperationStyles = () => {
    switch (operationType) {
      case "compare":
        return "border-[var(--color-accent-compare)] bg-[var(--color-accent-compare)]/10";
      case "swap":
        return "border-[var(--color-accent-swap)] bg-[var(--color-accent-swap)]/10";
      case "mark":
        return "border-[var(--color-accent-sorted)] bg-[var(--color-accent-sorted)]/10";
      default:
        return "border-[var(--border-primary)] bg-[var(--bg-tertiary)]";
    }
  };

  const getIcon = () => {
    switch (operationType) {
      case "compare":
        return "🔍";
      case "swap":
        return "🔄";
      case "mark":
        return "✅";
      default:
        return "⏳";
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getOperationStyles()} transition-all duration-200`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon()}</span>
        <p className="text-sm text-[var(--text-primary)] font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
