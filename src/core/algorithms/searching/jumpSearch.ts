import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Jump Search Algorithm
 * 
 * Searches in blocks of size √n, then performs linear search.
 * Works on sorted arrays.
 * 
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */
export const jumpSearch: IAlgorithm<ArrayInput> = {
  id: 'jump-search',
  name: 'Jump Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function jumpSearch(arr, target):',
    '  n = length(arr)',
    '  step = floor(√n)',
    '  prev = 0',
    '',
    '  // Jump in blocks',
    '  while arr[min(step, n) - 1] < target:',
    '    prev = step',
    '    step += floor(√n)',
    '    if prev >= n:',
    '      return -1',
    '',
    '  // Linear search in block',
    '  while arr[prev] < target:',
    '    prev++',
    '    if prev == min(step, n):',
    '      return -1',
    '',
    '  if arr[prev] == target:',
    '    return prev',
    '  return -1',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(√n)',
    worst: 'O(√n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 15,
      min: 0,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 25) {
      return { ok: false, error: 'Array size must be 25 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 15) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Jump Search: Find ${target} using √n block jumps`,
      'info',
      0
    );
    yield createEvent.highlight([0, 1, 2, 3]);

    // Sort array if needed
    const wasSorted = JSON.stringify(input.values) === JSON.stringify(arr);
    if (!wasSorted) {
      yield createEvent.message(
        `Sorting array first: [${arr.join(', ')}]`,
        'step'
      );
      for (let i = 0; i < n; i++) {
        yield createEvent.set(i, arr[i], input.values[i]);
      }
    }

    const step = Math.floor(Math.sqrt(n));
    yield createEvent.message(
      `Block size = √${n} = ${step}`,
      'explanation'
    );

    let prev = 0;
    let currentStep = step;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n },
        { name: 'step', value: step },
        { name: 'target', value: target },
      ]
    );

    // Initial search state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Block Jump Phase',
      searchRangeData: {
        arrayLength: n,
        low: prev,
        high: n - 1,
        target,
        comparisons,
        eliminated,
        algorithm: 'jump-search',
        jumpBlock: step,
      },
    });

    // Jump in blocks
    yield createEvent.message(
      `Phase 1: Jump in blocks of ${step} to find the right block`,
      'step'
    );
    yield createEvent.highlight([6, 7, 8, 9, 10]);

    while (arr[Math.min(currentStep, n) - 1] < target) {
      const checkIdx = Math.min(currentStep, n) - 1;

      // Mark the current block
      for (let i = prev; i <= checkIdx; i++) {
        yield createEvent.mark([i], 'window');
      }

      yield createEvent.pointer(
        [
          { index: prev, label: 'prev', color: 'var(--color-primary-500)' },
          { index: checkIdx, label: 'check', color: 'var(--color-accent-current)' },
        ],
        [
          { name: 'prev', value: prev },
          { name: 'step', value: currentStep },
          { name: 'arr[check]', value: arr[checkIdx], highlight: true },
          { name: 'target', value: target },
        ],
        `arr[${checkIdx}]=${arr[checkIdx]} < ${target}?`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: `Checking block [${prev}..${checkIdx}]`,
        searchRangeData: {
          arrayLength: n,
          low: prev,
          high: checkIdx,
          mid: checkIdx,
          target,
          currentValue: arr[checkIdx],
          comparisons,
          eliminated,
          algorithm: 'jump-search',
          jumpBlock: step,
        },
      });

      comparisons++;
      yield createEvent.compare([checkIdx, checkIdx], 'lt');
      yield createEvent.message(
        `arr[${checkIdx}]=${arr[checkIdx]} < ${target}, jump to next block`,
        'explanation'
      );

      // Track eliminated block
      eliminated.push({ start: prev, end: checkIdx });

      // Unmark current block
      for (let i = prev; i <= checkIdx; i++) {
        yield createEvent.unmark([i]);
      }

      prev = currentStep;
      currentStep += step;

      if (prev >= n) {
        yield createEvent.pointer([], []);

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Not Found',
          searchRangeData: {
            arrayLength: n,
            low: n,
            high: n - 1,
            target,
            comparisons,
            eliminated,
            algorithm: 'jump-search',
            jumpBlock: step,
          },
        });

        yield createEvent.message(
          `Jumped past array end. ${target} not found.`,
          'info'
        );
        yield createEvent.result('search', -1, 'Element Not Present');
        return;
      }
    }

    // Mark the found block
    const blockEnd = Math.min(currentStep, n) - 1;
    yield createEvent.message(
      `Block found! ${target} is in block [${prev}..${blockEnd}]`,
      'step'
    );

    // Update state for linear phase
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Linear Search Phase',
      searchRangeData: {
        arrayLength: n,
        low: prev,
        high: blockEnd,
        target,
        comparisons,
        eliminated,
        algorithm: 'jump-search',
        jumpBlock: step,
      },
    });

    for (let i = prev; i <= blockEnd; i++) {
      yield createEvent.mark([i], 'window');
    }

    // Linear search in block
    yield createEvent.message(
      `Phase 2: Linear search within the block`,
      'step'
    );
    yield createEvent.highlight([13, 14, 15, 16]);

    while (arr[prev] < target) {
      yield createEvent.pointer(
        [{ index: prev, label: 'prev', color: 'var(--color-accent-current)' }],
        [
          { name: 'prev', value: prev },
          { name: 'arr[prev]', value: arr[prev], highlight: true },
          { name: 'target', value: target },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: `Linear check at ${prev}`,
        searchRangeData: {
          arrayLength: n,
          low: prev,
          high: blockEnd,
          mid: prev,
          target,
          currentValue: arr[prev],
          comparisons,
          eliminated,
          algorithm: 'jump-search',
          jumpBlock: step,
        },
      });

      yield createEvent.mark([prev], 'current');
      comparisons++;
      yield createEvent.compare([prev, prev], 'lt');
      yield createEvent.message(
        `arr[${prev}]=${arr[prev]} < ${target}, continue`,
        'explanation'
      );
      yield createEvent.unmark([prev]);

      prev++;
      if (prev === Math.min(currentStep, n)) {
        yield createEvent.pointer([], []);

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Not Found',
          searchRangeData: {
            arrayLength: n,
            low: prev,
            high: blockEnd,
            target,
            comparisons,
            eliminated,
            algorithm: 'jump-search',
            jumpBlock: step,
          },
        });

        yield createEvent.message(
          `Reached end of block. ${target} not found.`,
          'info'
        );
        yield createEvent.result('search', -1, 'Element Not Present');
        return;
      }
    }

    yield createEvent.highlight([18, 19]);
    comparisons++;

    if (arr[prev] === target) {
      // Clear window marks
      for (let i = 0; i < n; i++) {
        yield createEvent.unmark([i]);
      }

      yield createEvent.compare([prev, prev], 'eq');
      yield createEvent.mark([prev], 'sorted');
      yield createEvent.pointer(
        [{ index: prev, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'index', value: prev },
          { name: 'value', value: arr[prev], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: prev,
          high: prev,
          mid: prev,
          target,
          currentValue: arr[prev],
          comparisons,
          eliminated,
          algorithm: 'jump-search',
          jumpBlock: step,
        },
      });

      yield createEvent.message(
        `Found ${target} at index ${prev}!`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons} (optimal for √n = ${step})`,
        'explanation'
      );
      yield createEvent.result('search', prev, `Element Found at Index ${prev}`);
    } else {
      yield createEvent.pointer([], []);

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Not Found',
        searchRangeData: {
          arrayLength: n,
          low: prev,
          high: blockEnd,
          target,
          comparisons,
          eliminated,
          algorithm: 'jump-search',
          jumpBlock: step,
        },
      });

      yield createEvent.message(
        `${target} not found in the array`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons} (optimal for √n = ${step})`,
        'explanation'
      );
      yield createEvent.result('search', -1, 'Element Not Present');
    }
  },
};
