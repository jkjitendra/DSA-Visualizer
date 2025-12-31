"use client";

import { useState } from "react";
import { usePlayerStore } from "@/core/player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
} from "lucide-react";

export function PlayerControls() {
  const {
    status,
    currentStep,
    speed,
    play,
    pause,
    step,
    stepBack,
    reset,
    seek,
    setSpeedMs,
    getTotalSteps,
  } = usePlayerStore();

  const [editingStep, setEditingStep] = useState(false);
  const [stepInput, setStepInput] = useState("");

  const totalSteps = getTotalSteps();
  const isPlaying = status === "playing";
  const isFinished = status === "finished";
  const canStep = currentStep < totalSteps;
  const canStepBack = currentStep > 0;

  const handleStepInputSubmit = () => {
    const stepNum = parseInt(stepInput, 10);
    if (!isNaN(stepNum) && stepNum >= 0 && stepNum <= totalSteps) {
      seek(stepNum);
    }
    setEditingStep(false);
    setStepInput("");
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Timeline slider */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
          {/* Editable step */}
          {editingStep ? (
            <div className="flex items-center gap-1">
              <span className="text-[10px] sm:text-sm">Step</span>
              <Input
                type="number"
                value={stepInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStepInput(e.target.value)}
                onBlur={handleStepInputSubmit}
                onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && handleStepInputSubmit()}
                className="w-12 sm:w-16 h-5 sm:h-6 px-1 text-center text-xs sm:text-sm"
                min={0}
                max={totalSteps}
                autoFocus
              />
              <span className="text-[10px] sm:text-sm">/ {totalSteps}</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setStepInput(currentStep.toString());
                setEditingStep(true);
              }}
              className="hover:text-[var(--color-primary-400)] transition-colors cursor-pointer text-[10px] sm:text-sm whitespace-nowrap"
              title="Click to jump to step"
            >
              Step {currentStep} / {totalSteps}
            </button>
          )}

          {/* Speed slider */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Gauge className="h-3 w-3 sm:h-4 sm:w-4" />
            <Slider
              value={[speed]}
              min={100}
              max={2000}
              step={50}
              onValueChange={([value]) => setSpeedMs(value)}
              className="w-16 sm:w-24 cursor-pointer"
            />
            <span className="w-10 sm:w-12 text-[10px] sm:text-xs">{speed}ms</span>
          </div>
        </div>

        {/* Timeline */}
        <Slider
          value={[currentStep]}
          min={0}
          max={Math.max(totalSteps, 1)}
          step={1}
          onValueChange={([value]) => seek(value)}
          className="cursor-pointer"
        />
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2">
        {/* Reset */}
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          disabled={currentStep === 0 && status === "idle"}
          className="h-10 w-10"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {/* Step back */}
        <Button
          variant="outline"
          size="icon"
          onClick={stepBack}
          disabled={!canStepBack}
          className="h-10 w-10"
          title="Step Back"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {/* Play/Pause */}
        <Button
          size="icon"
          onClick={isPlaying ? pause : play}
          disabled={isFinished && currentStep >= totalSteps}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)]"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white ml-0.5" />
          )}
        </Button>

        {/* Step forward */}
        <Button
          variant="outline"
          size="icon"
          onClick={step}
          disabled={!canStep}
          className="h-10 w-10"
          title="Step Forward"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Status indicator */}
      <div className="flex justify-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isPlaying
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : isFinished
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${isPlaying
              ? "bg-green-500 animate-pulse"
              : isFinished
                ? "bg-blue-500"
                : "bg-[var(--text-tertiary)]"
              }`}
          />
          {isPlaying ? "Playing" : isFinished ? "Finished" : "Ready"}
        </span>
      </div>
    </div>
  );
}

