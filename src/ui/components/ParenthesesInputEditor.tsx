"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Check, AlertCircle, Play } from "lucide-react";

interface ParenthesesInputEditorProps {
  value: number[];  // ASCII codes for parentheses
  onChange: (values: number[]) => void;
  onApply?: () => void;
}

// Pre-defined parentheses samples (as actual strings)
const parenthesesSamples = [
  "()",
  "(())",
  "([])",
  "{([])}",
  "({[]})",
  "()[]{}",
  "[({})]]",
  "([{}])",
  "{{[[(())]]}}",
  "([)]",  // unbalanced
  "(((",   // unbalanced  
  "[](){[]}",
  "({()})",
  "{[()]}",
  "((()))",
  "[({})]",
];

// Convert parentheses string to ASCII code array
const stringToAscii = (str: string): number[] => {
  return str.split('').map(c => c.charCodeAt(0));
};

// Convert ASCII code array to parentheses string
const asciiToString = (codes: number[]): string => {
  return codes.map(c => String.fromCharCode(c)).join('');
};

// Validate that a string contains only valid parentheses
const isValidParentheses = (str: string): boolean => {
  return /^[\(\)\[\]\{\}]*$/.test(str);
};

export function ParenthesesInputEditor({
  value,
  onChange,
  onApply,
}: ParenthesesInputEditorProps) {
  const [inputText, setInputText] = useState(asciiToString(value));
  const [error, setError] = useState<string | null>(null);
  const lastExternalValue = useRef<string>(asciiToString(value));

  // Sync internal state when value prop changes from external source
  useEffect(() => {
    const newValueStr = asciiToString(value);
    if (newValueStr !== lastExternalValue.current) {
      lastExternalValue.current = newValueStr;
      setInputText(newValueStr);
      setError(null);
    }
  }, [value]);

  const parseInput = (text: string): { codes: number[]; error: string | null } => {
    // Remove any whitespace
    const cleanText = text.replace(/\s/g, '');

    if (!cleanText) {
      return { codes: [], error: "Please enter some parentheses" };
    }

    if (!isValidParentheses(cleanText)) {
      return { codes: [], error: "Only (), [], {} are allowed" };
    }

    if (cleanText.length > 20) {
      return { codes: [], error: "Maximum 20 characters allowed" };
    }

    return { codes: stringToAscii(cleanText), error: null };
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    const { codes, error } = parseInput(text);
    setError(error);
    if (!error && codes.length > 0) {
      lastExternalValue.current = asciiToString(codes);
      onChange(codes);
    }
  };

  const handleApply = () => {
    const { codes, error } = parseInput(inputText);
    if (!error) {
      onChange(codes);
    }
  };

  const generateRandom = () => {
    const sample = parenthesesSamples[Math.floor(Math.random() * parenthesesSamples.length)];
    const codes = stringToAscii(sample);
    setInputText(sample);
    setError(null);
    onChange(codes);
    setTimeout(() => onApply?.(), 0);
  };

  const isValid = !error && value.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Input Expression
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
          placeholder="Enter parentheses, e.g. ([{}])"
          className={`w-full px-3 py-2 rounded-lg border text-lg font-mono bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 transition-all tracking-wider ${error
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

      {/* Bracket reference */}
      <div className="flex gap-3 text-xs text-[var(--text-tertiary)]">
        <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] font-mono">( )</span>
        <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] font-mono">[ ]</span>
        <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] font-mono">&#123; &#125;</span>
      </div>

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
          <span className="font-medium">{value.length} characters: </span>
          <span className="font-mono text-base tracking-wider">
            {asciiToString(value)}
          </span>
        </div>
      )}
    </div>
  );
}
