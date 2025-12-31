"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Check, AlertCircle, Play } from "lucide-react";

interface ArrayInputEditorProps {
  value: number[];
  onChange: (values: number[]) => void;
  onApply?: () => void;
  maxSize?: number;
  algorithmParams?: ReactNode;
}

export function ArrayInputEditor({
  value,
  onChange,
  onApply,
  maxSize = 20,
  algorithmParams,
}: ArrayInputEditorProps) {
  const [inputText, setInputText] = useState(value.join(", "));
  const [error, setError] = useState<string | null>(null);
  const lastExternalValue = useRef<string>(value.join(", "));

  // Sync internal state ONLY when value prop changes from external source
  useEffect(() => {
    const newValueStr = value.join(", ");
    // Only sync if this is a different value than what we last saw AND 
    // different from current parsed input (external change, not user typing)
    if (newValueStr !== lastExternalValue.current) {
      lastExternalValue.current = newValueStr;
      setInputText(newValueStr);
      setError(null);
    }
  }, [value]);

  const parseInput = (text: string): { values: number[]; error: string | null } => {
    if (!text.trim()) {
      return { values: [], error: "Please enter some values" };
    }

    const parts = text.split(/[,\s]+/).filter((p) => p.trim());
    const values: number[] = [];

    for (const part of parts) {
      const num = parseInt(part, 10);
      if (isNaN(num)) {
        return { values: [], error: `Invalid number: "${part}"` };
      }
      if (num < 0 || num > 100) {
        return { values: [], error: `Values must be between 0 and 100` };
      }
      values.push(num);
    }

    if (values.length > maxSize) {
      return { values: [], error: `Maximum ${maxSize} values allowed` };
    }

    if (values.length < 2) {
      return { values: [], error: "Need at least 2 values to sort" };
    }

    return { values, error: null };
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    const { values, error } = parseInput(text);
    setError(error);
    if (!error && values.length > 0) {
      lastExternalValue.current = values.join(", "); // Track what we're sending up
      onChange(values);
    }
  };

  const handleApply = () => {
    const { values, error } = parseInput(inputText);
    if (!error) {
      onChange(values);
    }
  };

  const generateRandom = () => {
    const size = Math.floor(Math.random() * 10) + 5; // 5-14 elements
    const values = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setInputText(values.join(", "));
    setError(null);
    onChange(values);
    // Auto-apply when generating random
    setTimeout(() => onApply?.(), 0);
  };

  const isValid = !error && value.length >= 2;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Input Array
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandom}
          className="gap-1.5"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Random
        </Button>
      </div>

      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter numbers separated by commas (e.g., 64, 34, 25, 12, 22)"
          className={`w-full px-3 py-2 rounded-lg border text-sm font-mono resize-none bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 transition-all ${error
            ? "border-red-500 focus:ring-red-500/20"
            : isValid
              ? "border-green-500 focus:ring-green-500/20"
              : "border-[var(--border-primary)] focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)]"
            }`}
          rows={2}
        />

        {/* Status icon */}
        <div className="absolute right-3 top-2">
          {error && <AlertCircle className="h-4 w-4 text-red-500" />}
          {isValid && <Check className="h-4 w-4 text-green-500" />}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      {/* Algorithm Parameters (inline) */}
      {algorithmParams}

      {/* Apply button */}
      <Button
        onClick={() => {
          handleApply();
          onApply?.();
        }}
        disabled={!isValid}
        className="w-full gap-2 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)] disabled:opacity-50"
      >
        <Play className="h-4 w-4" />
        Apply & Run
      </Button>

      {/* Preview */}
      {isValid && (
        <div className="text-xs text-[var(--text-secondary)]">
          <span className="font-medium">{value.length} elements: </span>
          <span className="font-mono break-all">
            [{value.join(", ")}]
          </span>
        </div>
      )}
    </div>
  );
}
