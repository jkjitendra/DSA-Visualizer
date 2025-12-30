import { AlgoEvent } from '../events/events';

/**
 * Result type for validation
 */
export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Algorithm interface - all algorithms must implement this
 * Following Dependency Inversion Principle (DIP)
 */
export interface IAlgorithm<TInput> {
  /** Unique identifier for the algorithm */
  id: string;

  /** Display name (can be localized) */
  name: string;

  /** Category for grouping (e.g., 'sorting', 'graph', 'tree') */
  category: string;

  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  /** Pseudocode lines for display */
  pseudocodeLines: string[];

  /** Time complexity */
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };

  /** Space complexity */
  spaceComplexity: string;

  /** Validate input before running */
  validate(input: TInput): ValidationResult;

  /**
   * Run the algorithm and yield events
   * Uses generator for memory efficiency with large inputs
   */
  run(input: TInput): Generator<AlgoEvent, void, unknown>;
}

/**
 * Algorithm metadata for catalog/search
 */
export interface AlgorithmMeta {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  description: string;
}
