import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Sentinel Linear Search Algorithm
 * 
 * Optimized linear search that places target as sentinel at end,
 * eliminating the need for bounds checking in the loop.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const sentinelLinearSearch: IAlgorithm<ArrayInput> = {
  id: 'sentinel-linear-search',
  name: 'Sentinel Linear Search',
  category: 'searching',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function sentinelSearch(arr, target):',
    '  last = arr[n - 1]',
    '  arr[n - 1] = target  // Place sentinel',
    '',
    '  i = 0',
    '  while arr[i] != target:',
    '    i++',
    '',
    '  arr[n - 1] = last  // Restore',
    '  if i < n - 1 or last == target:',
    '    return i',
    '  return -1',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 22,
      min: 0,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Array size must be 20 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 22) as number;
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Sentinel Linear Search: Find ${target}`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.pointer(
      [],
      [
        { name: 'target', value: target },
        { name: 'n', value: n },
      ]
    );

    // Store last element
    const last = arr[n - 1];
    yield createEvent.highlight([1]);
    yield createEvent.message(
      `Save last element: last = arr[${n - 1}] = ${last}`,
      'explanation'
    );
    yield createEvent.mark([n - 1], 'current');

    // Place sentinel
    arr[n - 1] = target;
    yield createEvent.highlight([2]);
    yield createEvent.set(n - 1, target, last);
    yield createEvent.message(
      `Place sentinel: arr[${n - 1}] = ${target}`,
      'step'
    );
    yield createEvent.mark([n - 1], 'pivot');
    yield createEvent.pointer(
      [{ index: n - 1, label: 'sentinel', color: 'var(--color-accent-pivot)' }],
      [
        { name: 'last', value: last },
        { name: 'sentinel', value: target, highlight: true },
      ]
    );

    // Search without bounds check
    let i = 0;
    let comparisons = 0;
    yield createEvent.highlight([4, 5]);
    yield createEvent.message(
      `Now search without bounds checking (sentinel guarantees we'll find target)`,
      'step'
    );

    while (arr[i] !== target) {
      yield createEvent.pointer(
        [
          { index: i, label: 'i', color: 'var(--color-accent-current)' },
          { index: n - 1, label: 'sentinel', color: 'var(--color-accent-pivot)' },
        ],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'target', value: target },
        ],
        `arr[${i}] != ${target} ?`
      );
      yield createEvent.mark([i], 'current');

      comparisons++;
      yield createEvent.compare([i, i], 'lt');
      yield createEvent.message(
        `arr[${i}] = ${arr[i]} ≠ ${target}, continue...`,
        'explanation'
      );
      yield createEvent.highlight([6]);

      yield createEvent.unmark([i]);
      i++;
    }

    comparisons++;

    // Restore last element
    arr[n - 1] = last;
    yield createEvent.highlight([8]);
    yield createEvent.set(n - 1, last, target);
    yield createEvent.message(
      `Restore last element: arr[${n - 1}] = ${last}`,
      'step'
    );
    yield createEvent.unmark([n - 1]);

    // Check if found
    yield createEvent.highlight([9, 10, 11]);
    if (i < n - 1 || last === target) {
      yield createEvent.mark([i], 'sorted');
      yield createEvent.pointer(
        [{ index: i, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: input.values[i], highlight: true },
          { name: 'target', value: target, highlight: true },
        ],
        `Found at index ${i}`
      );
      yield createEvent.message(
        `Found ${target} at index ${i}!`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons} (no bounds checks in loop!)`,
        'explanation'
      );
      yield createEvent.result('search', i, `Element Found at Index ${i}`);
    } else {
      yield createEvent.pointer([], []);
      yield createEvent.message(
        `${target} not found in the array`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons} (no bounds checks in loop!)`,
        'explanation'
      );
      yield createEvent.result('search', -1, 'Element Not Present');
    }
  },
};
