import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Linear Search Algorithm
 * 
 * The simplest searching algorithm - check each element sequentially.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const linearSearch: IAlgorithm<ArrayInput> = {
  id: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function linearSearch(arr, target):',
    '  for i = 0 to n - 1:',
    '    if arr[i] == target:',
    '      return i  // Found!',
    '',
    '  return -1  // Not found',
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
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
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
      `Linear Search: Find ${target} in array of ${n} elements`,
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

    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    // Initial state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Starting',
      searchRangeData: {
        arrayLength: n,
        low: 0,
        high: n - 1,
        target,
        comparisons,
        eliminated,
        algorithm: 'linear-search',
      },
    });

    for (let i = 0; i < n; i++) {
      yield createEvent.highlight([1]);
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-accent-current)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'target', value: target },
        ],
        `arr[${i}] == ${target} ?`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: `Checking index ${i}`,
        searchRangeData: {
          arrayLength: n,
          low: i,
          high: n - 1,
          mid: i,
          target,
          currentValue: arr[i],
          comparisons,
          eliminated,
          algorithm: 'linear-search',
        },
      });

      yield createEvent.mark([i], 'current');
      yield createEvent.message(
        `Checking index ${i}: arr[${i}] = ${arr[i]}`,
        'explanation',
        2
      );
      yield createEvent.highlight([2]);

      comparisons++;
      const isMatch = arr[i] === target;
      yield createEvent.compare([i, i], isMatch ? 'eq' : 'lt');

      if (isMatch) {
        yield createEvent.highlight([3]);
        yield createEvent.mark([i], 'sorted');
        yield createEvent.pointer(
          [{ index: i, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'i', value: i },
            { name: 'arr[i]', value: arr[i], highlight: true },
            { name: 'target', value: target, highlight: true },
          ],
          `${arr[i]} == ${target} ✓`
        );

        // Found state
        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: i,
            high: i,
            mid: i,
            target,
            currentValue: arr[i],
            comparisons,
            eliminated,
            algorithm: 'linear-search',
          },
        });

        yield createEvent.message(
          `Found ${target} at index ${i}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', i, `Element Found at Index ${i}`);
        return;
      }

      yield createEvent.message(
        `${arr[i]} ≠ ${target}, continue searching...`,
        'explanation'
      );
      yield createEvent.unmark([i]);
      eliminated.push({ start: i, end: i });
    }

    yield createEvent.highlight([5]);
    yield createEvent.pointer([], []);

    // Not found state
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
        algorithm: 'linear-search',
      },
    });

    yield createEvent.message(
      `${target} not found in the array`,
      'info'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', -1, 'Element Not Present');
  },
};
