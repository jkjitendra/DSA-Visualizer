"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { X } from "lucide-react";
import { SupportedLanguage, LANGUAGES } from "@/core/codeTemplates/types";

interface CodeEditorProps {
  code: string;
  language: SupportedLanguage;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  code,
  language,
  onChange,
  readOnly = false,
  height = "400px",
}: CodeEditorProps) {
  const editorRef = useRef<unknown>(null);
  const languageInfo = LANGUAGES[language];
  const [showOverlay, setShowOverlay] = useState(true);

  // Reset overlay when language changes
  useEffect(() => {
    setShowOverlay(true);
  }, [language]);

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  const handleChange: OnChange = useCallback(
    (value) => {
      if (onChange && value !== undefined) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <div className="relative rounded-lg overflow-hidden border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[var(--bg-tertiary)] px-3 py-2 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {languageInfo.name}
          </span>
          <span className="text-xs text-[var(--text-tertiary)]">
            {languageInfo.extension}
          </span>
        </div>
        {!languageInfo.executable && (
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
            View Only
          </span>
        )}
        {readOnly && languageInfo.executable && (
          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">
            Read Only
          </span>
        )}
      </div>

      {/* Editor */}
      <Editor
        height={height}
        language={languageInfo.monacoLanguage}
        value={code}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly: readOnly || !languageInfo.executable,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 12 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-[var(--bg-secondary)]">
            <span className="text-[var(--text-secondary)]">Loading editor...</span>
          </div>
        }
      />

      {/* Coming Soon overlay for non-executable languages */}
      {languageInfo.comingSoon && showOverlay && (
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚀</span>
              <div>
                <p className="text-sm font-medium text-white">
                  {languageInfo.name} execution coming soon!
                </p>
                <p className="text-xs text-gray-300">
                  Switch to JavaScript to run and visualize your code.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowOverlay(false)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

