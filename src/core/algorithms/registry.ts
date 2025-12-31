import { IAlgorithm, AlgorithmMeta } from './IAlgorithm';
import { ArrayInput } from '../models';
import { bubbleSort } from './sorting/bubbleSort';

/**
 * Registry of all available algorithms
 */
const algorithmRegistry: Map<string, IAlgorithm<ArrayInput>> = new Map();

/**
 * Algorithm metadata for UI
 */
const algorithmMeta: Map<string, AlgorithmMeta> = new Map();

/**
 * Register an algorithm
 */
export function registerAlgorithm(algorithm: IAlgorithm<ArrayInput>): void {
  algorithmRegistry.set(algorithm.id, algorithm);
  algorithmMeta.set(algorithm.id, {
    id: algorithm.id,
    name: algorithm.name,
    category: algorithm.category,
    difficulty: algorithm.difficulty,
    tags: [],
    description: '',
  });
}

/**
 * Get an algorithm by ID
 */
export function getAlgorithm(id: string): IAlgorithm<ArrayInput> | undefined {
  return algorithmRegistry.get(id);
}

/**
 * Get all registered algorithms
 */
export function getAllAlgorithms(): AlgorithmMeta[] {
  return Array.from(algorithmMeta.values());
}

/**
 * Get algorithms by category
 */
export function getAlgorithmsByCategory(category: string): AlgorithmMeta[] {
  return getAllAlgorithms().filter((algo) => algo.category === category);
}

// Register built-in algorithms
registerAlgorithm(bubbleSort);
