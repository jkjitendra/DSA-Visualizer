import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Lower Bound (First Occurrence) Search
 * 
 * Finds the first occurrence of target value in a sorted array.
 * Also known as std::lower_bound in C++.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const lowerBound: IAlgorithm<ArrayInput> = {
  id: 'lower-bound',
  name: 'Lower Bound',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function lowerBound(arr, target):',
    '  low = 0',
    '  high = n',
    '  result = -1',
    '',
    '  while low < high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] >= target:',
    '      result = mid  // Potential answer',
    '      high = mid    // Search left',
    '    else:',
    '      low = mid + 1  // Search right',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 2,
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
    const target = (params?.target ?? 2) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Lower Bound: Find first occurrence of ${target}`,
      'info',
      0
    );
    yield createEvent.highlight([0]);

    // Update array display if it was sorted
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

    let low = 0;
    let high = n;
    let result = -1;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    yield createEvent.highlight([1, 2, 3]);
    yield createEvent.pointer(
      [
        { index: low, label: 'low', color: 'var(--color-primary-500)' },
        { index: Math.min(high, n - 1), label: 'high', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'low', value: low },
        { name: 'high', value: high },
        { name: 'result', value: result },
        { name: 'target', value: target },
      ]
    );

    // Initial state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Initializing',
      searchRangeData: {
        arrayLength: n,
        low,
        high: Math.min(high, n - 1),
        target,
        comparisons,
        eliminated,
        algorithm: 'lower-bound',
      },
    });

    while (low < high) {
      yield createEvent.highlight([5]);
      const mid = Math.floor((low + high) / 2);

      yield createEvent.highlight([6]);
      yield createEvent.pointer(
        [
          { index: low, label: 'low', color: 'var(--color-primary-500)' },
          { index: mid, label: 'mid', color: 'var(--color-accent-current)' },
          { index: Math.min(high, n - 1), label: 'high', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'low', value: low },
          { name: 'mid', value: mid },
          { name: 'high', value: high },
          { name: 'arr[mid]', value: arr[mid], highlight: true },
          { name: 'target', value: target },
          { name: 'result', value: result },
        ],
        `mid = ${mid}, arr[${mid}] = ${arr[mid]}`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing',
        searchRangeData: {
          arrayLength: n,
          low,
          high: Math.min(high, n - 1),
          mid,
          target,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'lower-bound',
        },
      });

      yield createEvent.mark([mid], 'current');
      comparisons++;

      if (arr[mid] >= target) {
        yield createEvent.highlight([8, 9, 10]);
        yield createEvent.compare([mid, mid], arr[mid] === target ? 'eq' : 'gt');

        result = mid;
        yield createEvent.message(
          `${arr[mid]} >= ${target}, potential first occurrence at ${mid}. Search left.`,
          'explanation'
        );

        if (arr[mid] === target) {
          yield createEvent.mark([mid], 'sorted');
        }

        // Track eliminated right portion
        if (mid + 1 <= Math.min(high - 1, n - 1)) {
          eliminated.push({ start: mid + 1, end: Math.min(high - 1, n - 1) });
        }
        high = mid;
      } else {
        yield createEvent.highlight([11, 12]);
        yield createEvent.compare([mid, mid], 'lt');
        yield createEvent.message(
          `${arr[mid]} < ${target}, search right half`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated left portion
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      }
    }

    yield createEvent.highlight([14]);
    yield createEvent.pointer([], []);

    if (result !== -1 && arr[result] === target) {
      // Mark all occurrences
      for (let i = result; i < n && arr[i] === target; i++) {
        yield createEvent.mark([i], 'sorted');
      }
      yield createEvent.pointer(
        [{ index: result, label: 'FIRST', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'firstIndex', value: result },
          { name: 'value', value: arr[result], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: result,
          high: result,
          mid: result,
          target,
          currentValue: arr[result],
          comparisons,
          eliminated,
          algorithm: 'lower-bound',
        },
      });

      yield createEvent.message(
        `First occurrence of ${target} is at index ${result}`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons}`,
        'explanation'
      );
      yield createEvent.result('search', result, `First Occurrence at Index ${result}`);
    } else {
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Not Found',
        searchRangeData: {
          arrayLength: n,
          low,
          high: Math.min(high, n - 1),
          target,
          comparisons,
          eliminated,
          algorithm: 'lower-bound',
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
    }
  },
};
