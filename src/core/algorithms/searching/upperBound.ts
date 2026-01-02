import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Upper Bound (Last Occurrence) Search
 * 
 * Finds the last occurrence of target value in a sorted array.
 * Returns the index AFTER the last occurrence (like std::upper_bound).
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const upperBound: IAlgorithm<ArrayInput> = {
  id: 'upper-bound',
  name: 'Upper Bound',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function upperBound(arr, target):',
    '  low = 0',
    '  high = n',
    '',
    '  while low < high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] <= target:',
    '      low = mid + 1  // Search right',
    '    else:',
    '      high = mid  // Search left',
    '',
    '  // low points to first element > target',
    '  return low - 1  // Last occurrence',
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
      `Upper Bound: Find last occurrence of ${target}`,
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
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [
        { index: low, label: 'low', color: 'var(--color-primary-500)' },
        { index: Math.min(high, n - 1), label: 'high', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'low', value: low },
        { name: 'high', value: high },
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
        algorithm: 'upper-bound',
      },
    });

    while (low < high) {
      yield createEvent.highlight([4]);
      const mid = Math.floor((low + high) / 2);

      yield createEvent.highlight([5]);
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
          algorithm: 'upper-bound',
        },
      });

      yield createEvent.mark([mid], 'current');
      comparisons++;

      if (arr[mid] <= target) {
        yield createEvent.highlight([7, 8]);
        yield createEvent.compare([mid, mid], arr[mid] === target ? 'eq' : 'lt');

        yield createEvent.message(
          `${arr[mid]} <= ${target}, continue searching right for last occurrence`,
          'explanation'
        );

        if (arr[mid] === target) {
          yield createEvent.mark([mid], 'sorted');
        }

        // Track eliminated left portion
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      } else {
        yield createEvent.highlight([9, 10]);
        yield createEvent.compare([mid, mid], 'gt');
        yield createEvent.message(
          `${arr[mid]} > ${target}, search left half`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated right portion
        if (mid <= Math.min(high - 1, n - 1)) {
          eliminated.push({ start: mid, end: Math.min(high - 1, n - 1) });
        }
        high = mid;
      }
    }

    yield createEvent.highlight([13]);
    const lastIndex = low - 1;

    yield createEvent.pointer([], []);

    if (lastIndex >= 0 && arr[lastIndex] === target) {
      // Mark all occurrences
      let firstOccurrence = lastIndex;
      while (firstOccurrence > 0 && arr[firstOccurrence - 1] === target) {
        firstOccurrence--;
      }
      for (let i = firstOccurrence; i <= lastIndex; i++) {
        yield createEvent.mark([i], 'sorted');
      }
      yield createEvent.pointer(
        [{ index: lastIndex, label: 'LAST', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'lastIndex', value: lastIndex },
          { name: 'value', value: arr[lastIndex], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: lastIndex,
          high: lastIndex,
          mid: lastIndex,
          target,
          currentValue: arr[lastIndex],
          comparisons,
          eliminated,
          algorithm: 'upper-bound',
        },
      });

      yield createEvent.message(
        `Last occurrence of ${target} is at index ${lastIndex}`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons}`,
        'explanation'
      );
      yield createEvent.result('search', lastIndex, `Last Occurrence at Index ${lastIndex}`);
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
          algorithm: 'upper-bound',
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
