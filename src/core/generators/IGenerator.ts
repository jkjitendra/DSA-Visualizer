/**
 * Result type for generation
 */
export interface GeneratorResult<T> {
  /** Generated input data */
  input: T;
  /** Seed used for reproducibility */
  seed: string;
}

/**
 * Generator interface - produces randomized inputs with seeds
 * Enables reproducible test cases and shareable states
 */
export interface IGenerator<TInput, TConfig = unknown> {
  /** Unique identifier */
  id: string;

  /** Display label */
  label: string;

  /** Description of what this generator produces */
  description: string;

  /** Default configuration */
  defaultConfig: TConfig;

  /**
   * Generate input data with optional configuration
   * @param config Generation configuration (size, constraints, etc.)
   * @param seed Optional seed for reproducibility. If not provided, generate new seed.
   */
  generate(config?: Partial<TConfig>, seed?: string): GeneratorResult<TInput>;
}

/**
 * Common configuration for array generators
 */
export interface ArrayGeneratorConfig {
  size: number;
  minValue: number;
  maxValue: number;
  allowDuplicates: boolean;
}

/**
 * Preset types for array generation
 */
export type ArrayPreset =
  | 'random'
  | 'nearly-sorted'
  | 'reversed'
  | 'few-unique'
  | 'sorted';

/**
 * Common configuration for graph generators
 */
export interface GraphGeneratorConfig {
  nodeCount: number;
  edgeDensity: 'sparse' | 'medium' | 'dense';
  isDirected: boolean;
  isWeighted: boolean;
  minWeight?: number;
  maxWeight?: number;
  allowCycles?: boolean;
}

/**
 * Preset types for graph generation
 */
export type GraphPreset =
  | 'connected'
  | 'dag'
  | 'weighted'
  | 'sparse'
  | 'dense'
  | 'tree'
  | 'bipartite';
