import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Binary Search Algorithm
 * 
 * Efficient search algorithm for sorted arrays.
 * Repeatedly divides the search interval in half.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const binarySearch: IAlgorithm<ArrayInput> = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function binarySearch(arr, target):',
    '  low = 0',
    '  high = n - 1',
    '',
    '  while low <= high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] == target:',
    '      return mid  // Found!',
    '    else if arr[mid] < target:',
    '      low = mid + 1  // Search right',
    '    else:',
    '      high = mid - 1  // Search left',
    '',
    '  return -1  // Not found',
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
      default: 7,
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
    const target = (params?.target ?? 7) as number;
    // Sort the array for binary search
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Binary Search: Find ${target} in sorted array`,
      'info',
      0
    );
    yield createEvent.highlight([0]);

    // Check if array was sorted
    const wasSorted = JSON.stringify(input.values) === JSON.stringify(arr);
    if (!wasSorted) {
      yield createEvent.message(
        `Binary Search requires sorted array. Sorting first...`,
        'step'
      );
      for (let i = 0; i < n; i++) {
        yield createEvent.set(i, arr[i], input.values[i]);
      }
      yield createEvent.message(
        `Array sorted: [${arr.join(', ')}]`,
        'explanation'
      );
    }

    let low = 0;
    let high = n - 1;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [
        { index: low, label: 'low', color: 'var(--color-primary-500)' },
        { index: high, label: 'high', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'low', value: low },
        { name: 'high', value: high },
        { name: 'target', value: target },
      ]
    );

    // Emit initial search range state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Initializing',
      searchRangeData: {
        arrayLength: n,
        low,
        high,
        target,
        comparisons,
        eliminated,
        algorithm: 'binary-search',
      },
    });

    while (low <= high) {
      yield createEvent.highlight([4]);
      const mid = Math.floor((low + high) / 2);

      yield createEvent.highlight([5]);
      yield createEvent.pointer(
        [
          { index: low, label: 'low', color: 'var(--color-primary-500)' },
          { index: mid, label: 'mid', color: 'var(--color-accent-current)' },
          { index: high, label: 'high', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'low', value: low },
          { name: 'mid', value: mid },
          { name: 'high', value: high },
          { name: 'arr[mid]', value: arr[mid], highlight: true },
          { name: 'target', value: target },
        ],
        `mid = (${low} + ${high}) / 2 = ${mid}`
      );

      // Emit search range state with mid
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing',
        searchRangeData: {
          arrayLength: n,
          low,
          high,
          mid,
          target,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'binary-search',
        },
      });

      yield createEvent.mark([mid], 'current');
      yield createEvent.message(
        `Checking mid=${mid}: arr[${mid}] = ${arr[mid]}`,
        'explanation'
      );

      comparisons++;

      if (arr[mid] === target) {
        yield createEvent.highlight([7, 8]);
        yield createEvent.compare([mid, mid], 'eq');
        yield createEvent.mark([mid], 'sorted');
        yield createEvent.pointer(
          [{ index: mid, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: mid },
            { name: 'arr[mid]', value: arr[mid], highlight: true },
            { name: 'target', value: target, highlight: true },
          ],
          `${arr[mid]} == ${target} ✓`
        );

        // Emit final state
        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: mid,
            high: mid,
            mid,
            target,
            currentValue: arr[mid],
            comparisons,
            eliminated,
            algorithm: 'binary-search',
          },
        });

        yield createEvent.message(
          `Found ${target} at index ${mid}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons} (log₂(${n}) ≈ ${Math.ceil(Math.log2(n))})`,
          'explanation'
        );
        yield createEvent.result('search', mid, `Element Found at Index ${mid}`);
        return;
      } else if (arr[mid] < target) {
        yield createEvent.highlight([9, 10]);
        yield createEvent.compare([mid, mid], 'lt');
        yield createEvent.message(
          `${arr[mid]} < ${target}, search right half`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated region
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      } else {
        yield createEvent.highlight([11, 12]);
        yield createEvent.compare([mid, mid], 'gt');
        yield createEvent.message(
          `${arr[mid]} > ${target}, search left half`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated region
        eliminated.push({ start: mid, end: high });
        high = mid - 1;
      }
    }

    yield createEvent.highlight([14]);
    yield createEvent.pointer([], []);

    // Emit not found state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Not Found',
      searchRangeData: {
        arrayLength: n,
        low,
        high,
        target,
        comparisons,
        eliminated,
        algorithm: 'binary-search',
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
