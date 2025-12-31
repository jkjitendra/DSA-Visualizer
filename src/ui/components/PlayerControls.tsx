"use client";

import { usePlayerStore, SpeedPreset } from "@/core/player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
} from "lucide-react";

const speedPresets: { value: SpeedPreset; label: string }[] = [
  { value: "slow", label: "0.5x" },
  { value: "normal", label: "1x" },
  { value: "fast", label: "2x" },
];

export function PlayerControls() {
  const {
    status,
    currentStep,
    speedPreset,
    play,
    pause,
    step,
    stepBack,
    reset,
    seek,
    setSpeed,
    getProgress,
    getTotalSteps,
  } = usePlayerStore();

  const totalSteps = getTotalSteps();
  const progress = getProgress();
  const isPlaying = status === "playing";
  const isFinished = status === "finished";
  const canStep = currentStep < totalSteps;
  const canStepBack = currentStep > 0;

  return (
    <div className="w-full space-y-4">
      {/* Timeline slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
          <span>Step {currentStep}</span>
          <span>Total: {totalSteps}</span>
        </div>
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
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {/* Play/Pause */}
        <Button
          size="icon"
          onClick={isPlaying ? pause : play}
          disabled={isFinished && currentStep >= totalSteps}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)]"
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
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Speed selector */}
        <div className="flex items-center gap-1 ml-2 p-1 rounded-lg bg-[var(--bg-tertiary)]">
          <Gauge className="h-4 w-4 text-[var(--text-secondary)] ml-1" />
          {speedPresets.map((preset) => (
            <Button
              key={preset.value}
              variant="ghost"
              size="sm"
              onClick={() => setSpeed(preset.value)}
              className={`h-8 px-2 text-xs ${speedPreset === preset.value
                ? "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
            >
              {preset.label}
            </Button>
          ))}
        </div>
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
