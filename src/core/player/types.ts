import { AlgoEvent } from '../events/events';

/**
 * Player status states
 */
export type PlayerStatus = 'idle' | 'playing' | 'paused' | 'finished';

/**
 * Speed presets
 */
export type SpeedPreset = 'slow' | 'normal' | 'fast';

export const speedValues: Record<SpeedPreset, number> = {
  slow: 1000,
  normal: 500,
  fast: 200,
};

/**
 * Pointer to show above bars (i, j, etc.)
 */
export interface VariablePointer {
  index: number;
  label: string;
  color?: string;
}

/**
 * Variable values to display in panel
 */
export interface VariableValue {
  name: string;
  value: string | number;
  highlight?: boolean;
}

/**
 * Snapshot of algorithm state at a given step
 */
export interface AlgorithmSnapshot {
  step: number;
  arrayState: number[];
  markedIndices: Map<number, string>; // index -> mark type
  message?: string;
  highlightedLines: number[];
  metrics: {
    comparisons: number;
    swaps: number;
  };
  // New: pointers and variables
  pointers: VariablePointer[];
  variables: VariableValue[];
  expression?: string; // e.g., "arr[1] > arr[2] → 34 > 25 = true"
}

/**
 * Player state interface
 */
export interface PlayerState {
  // Playback state
  status: PlayerStatus;
  currentStep: number;
  speed: number;
  speedPreset: SpeedPreset;

  // Algorithm data
  algorithmId: string | null;
  events: AlgoEvent[];
  snapshots: AlgorithmSnapshot[];

  // Input
  inputArray: number[];

  // Current visual state (derived from snapshot)
  currentSnapshot: AlgorithmSnapshot | null;
}

/**
 * Player actions interface
 */
export interface PlayerActions {
  // Playback controls
  play: () => void;
  pause: () => void;
  step: () => void;
  stepBack: () => void;
  seek: (step: number) => void;
  reset: () => void;

  // Speed control
  setSpeed: (preset: SpeedPreset) => void;
  setSpeedMs: (ms: number) => void;

  // Algorithm setup
  loadAlgorithm: (algorithmId: string, input: number[]) => void;

  // Derived state helpers
  getProgress: () => number;
  getTotalSteps: () => number;
}

export type PlayerStore = PlayerState & PlayerActions;
