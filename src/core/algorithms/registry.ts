import { IAlgorithm, AlgorithmMeta } from './IAlgorithm';
import { ArrayInput } from '../models';
import { bubbleSort } from './sorting/bubbleSort';
import { selectionSort } from './sorting/selectionSort';
import { insertionSort } from './sorting/insertionSort';
import { cocktailShakerSort } from './sorting/cocktailShakerSort';
import { shellSort } from './sorting/shellSort';
import { cycleSort } from './sorting/cycleSort';
import { mergeSort } from './sorting/mergeSort';
import { quickSort } from './sorting/quickSort';
import { heapSort } from './sorting/heapSort';
import { countingSort } from './sorting/countingSort';
import { radixSort } from './sorting/radixSort';
import { bucketSort } from './sorting/bucketSort';
import { pigeonholeSort } from './sorting/pigeonholeSort';
import { timSort } from './sorting/timSort';
import { introSort } from './sorting/introSort';
// Arrays algorithms
import { arrayOperations } from './arrays/arrayOperations';
import { twoPointers } from './arrays/twoPointers';
import { slidingWindow } from './arrays/slidingWindow';
import { prefixSum } from './arrays/prefixSum';
import { kadanes } from './arrays/kadanes';
import { dutchNationalFlag } from './arrays/dutchNationalFlag';
import { mooresVoting } from './arrays/mooresVoting';
import { mergeSortedArrays } from './arrays/mergeSortedArrays';
import { rotateArray } from './arrays/rotateArray';
import { arrayRearrangement } from './arrays/arrayRearrangement';
import { nextPermutation } from './arrays/nextPermutation';

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

// ============ ARRAYS ============
// Tier 1: Basic Operations
registerAlgorithm(arrayOperations);
// Tier 2: Patterns
registerAlgorithm(twoPointers);
registerAlgorithm(slidingWindow);
registerAlgorithm(prefixSum);
// Tier 3: Classic Algorithms
registerAlgorithm(kadanes);
registerAlgorithm(dutchNationalFlag);
registerAlgorithm(mooresVoting);
registerAlgorithm(mergeSortedArrays);
registerAlgorithm(rotateArray);
registerAlgorithm(arrayRearrangement);
registerAlgorithm(nextPermutation);

// ============ SORTING ============
// Tier 1: Fundamentals
registerAlgorithm(bubbleSort);
registerAlgorithm(selectionSort);
registerAlgorithm(insertionSort);
registerAlgorithm(cocktailShakerSort);
// Tier 2: Improved Simple
registerAlgorithm(shellSort);
registerAlgorithm(cycleSort);
// Tier 3: Divide & Conquer
registerAlgorithm(mergeSort);
registerAlgorithm(quickSort);
registerAlgorithm(heapSort);
// Tier 4: Hybrid
registerAlgorithm(timSort);
registerAlgorithm(introSort);
// Tier 5: Non-Comparison
registerAlgorithm(countingSort);
registerAlgorithm(radixSort);
registerAlgorithm(bucketSort);
registerAlgorithm(pigeonholeSort);

