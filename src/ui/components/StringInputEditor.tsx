"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Check, AlertCircle, Play } from "lucide-react";

interface StringInputEditorProps {
  value: number[];  // Character codes
  onChange: (values: number[]) => void;
  onApply?: () => void;
  maxLength?: number;
  algorithmParams?: ReactNode;
}

// Sample strings for random generation
const sampleStrings = [
  "ABRACADABRA",
  "HELLOWORLD",
  "PROGRAMMING",
  "ALGORITHM",
  "BABAD",
  "RACECAR",
  "ABCABABCABC",
  "MISSISSIPPI",
  "BANANA",
  "ABCDABCD",
  "AABAABAAB",
  "LEETCODE",
];

export function StringInputEditor({
  value,
  onChange,
  onApply,
  maxLength = 25,
  algorithmParams,
}: StringInputEditorProps) {
  // Convert char codes to string for display
  const valueToString = (vals: number[]) => vals.map(v => String.fromCharCode(v)).join('');

  const [inputText, setInputText] = useState(valueToString(value));
  const [error, setError] = useState<string | null>(null);
  const lastExternalValue = useRef<string>(valueToString(value));

  // Sync internal state when value prop changes from external source
  useEffect(() => {
    const newValueStr = valueToString(value);
    if (newValueStr !== lastExternalValue.current) {
      lastExternalValue.current = newValueStr;
      setInputText(newValueStr);
      setError(null);
    }
  }, [value]);

  const parseInput = (text: string): { values: number[]; error: string | null } => {
    if (!text.trim()) {
      return { values: [], error: "Please enter a string" };
    }

    // Convert to uppercase for consistency
    const normalized = text.toUpperCase().replace(/[^A-Z]/g, '');

    if (normalized.length === 0) {
      return { values: [], error: "Please enter alphabetic characters (A-Z)" };
    }

    if (normalized.length > maxLength) {
      return { values: [], error: `Maximum ${maxLength} characters allowed` };
    }

    if (normalized.length < 1) {
      return { values: [], error: "Need at least 1 character" };
    }

    // Convert to char codes
    const values = normalized.split('').map(c => c.charCodeAt(0));

    return { values, error: null };
  };

  const handleInputChange = (text: string) => {
    setInputText(text.toUpperCase());
    const { values, error } = parseInput(text);
    setError(error);
    if (!error && values.length > 0) {
      lastExternalValue.current = valueToString(values);
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
    const randomStr = sampleStrings[Math.floor(Math.random() * sampleStrings.length)];
    setInputText(randomStr);
    setError(null);
    const values = randomStr.split('').map(c => c.charCodeAt(0));
    onChange(values);
    setTimeout(() => onApply?.(), 0);
  };

  const isValid = !error && value.length >= 1;
  const displayString = valueToString(value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Input String
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
        <input
          type="text"
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter text (e.g., BABAD, HELLO)"
          className={`w-full px-3 py-2 rounded-lg border text-sm font-mono bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 transition-all ${error
            ? "border-red-500 focus:ring-red-500/20"
            : isValid
              ? "border-green-500 focus:ring-green-500/20"
              : "border-[var(--border-primary)] focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)]"
            }`}
        />

        {/* Status icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
          <span className="font-medium">{displayString.length} characters: </span>
          <span className="font-mono break-all">
            "{displayString}"
          </span>
        </div>
      )}
    </div>
  );
}
