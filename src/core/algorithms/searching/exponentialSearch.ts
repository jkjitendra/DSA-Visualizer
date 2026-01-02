import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Exponential Search Algorithm
 * 
 * Finds the range where target exists, then uses binary search.
 * Good for unbounded/infinite arrays.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const exponentialSearch: IAlgorithm<ArrayInput> = {
  id: 'exponential-search',
  name: 'Exponential Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function exponentialSearch(arr, target):',
    '  if arr[0] == target:',
    '    return 0',
    '',
    '  // Find range: double i until arr[i] > target',
    '  i = 1',
    '  while i < n and arr[i] <= target:',
    '    i = i * 2',
    '',
    '  // Binary search in range [i/2, min(i, n-1)]',
    '  low = i / 2',
    '  high = min(i, n - 1)',
    '  return binarySearch(arr, target, low, high)',
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
      default: 10,
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
    const target = (params?.target ?? 10) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Exponential Search: Find ${target}`,
      'info',
      0
    );
    yield createEvent.highlight([0]);

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

    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];
    const rangeHistory: number[] = [1];

    // Initial state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Exponential Expansion',
      searchRangeData: {
        arrayLength: n,
        low: 0,
        high: n - 1,
        target,
        comparisons,
        eliminated,
        algorithm: 'exponential-search',
        exponentialRange: rangeHistory,
      },
    });

    // Check first element
    yield createEvent.highlight([1, 2]);
    yield createEvent.mark([0], 'current');
    yield createEvent.pointer(
      [{ index: 0, label: 'check', color: 'var(--color-accent-current)' }],
      [
        { name: 'arr[0]', value: arr[0] },
        { name: 'target', value: target },
      ]
    );

    comparisons++;
    if (arr[0] === target) {
      yield createEvent.compare([0, 0], 'eq');
      yield createEvent.mark([0], 'sorted');

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: 0,
          high: 0,
          mid: 0,
          target,
          currentValue: arr[0],
          comparisons,
          eliminated,
          algorithm: 'exponential-search',
          exponentialRange: rangeHistory,
        },
      });

      yield createEvent.message(
        `Found ${target} at index 0!`,
        'info'
      );
      yield createEvent.result('search', 0, `Element Found at Index 0`);
      return;
    }
    yield createEvent.compare([0, 0], 'lt');
    yield createEvent.unmark([0]);

    // Find range by doubling
    yield createEvent.message(
      `Phase 1: Exponentially expand range (1, 2, 4, 8...)`,
      'step'
    );
    yield createEvent.highlight([5, 6, 7]);

    let i = 1;

    while (i < n && arr[i] <= target) {
      yield createEvent.pointer(
        [
          { index: Math.floor(i / 2), label: 'prev', color: 'var(--color-primary-500)' },
          { index: Math.min(i, n - 1), label: `i=${i}`, color: 'var(--color-accent-current)' },
        ],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[Math.min(i, n - 1)], highlight: true },
          { name: 'target', value: target },
        ],
        `Checking arr[${Math.min(i, n - 1)}]=${arr[Math.min(i, n - 1)]}`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: `Range: 0 to ${i}`,
        searchRangeData: {
          arrayLength: n,
          low: Math.floor(i / 2),
          high: Math.min(i, n - 1),
          mid: Math.min(i, n - 1),
          target,
          currentValue: arr[Math.min(i, n - 1)],
          comparisons,
          eliminated,
          algorithm: 'exponential-search',
          exponentialRange: [...rangeHistory],
        },
      });

      yield createEvent.mark([Math.min(i, n - 1)], 'current');
      comparisons++;

      if (i < n) {
        yield createEvent.compare([i, i], arr[i] <= target ? 'lt' : 'gt');
      }

      yield createEvent.message(
        `arr[${i}]=${arr[Math.min(i, n - 1)]} <= ${target}, expand range`,
        'explanation'
      );

      yield createEvent.unmark([Math.min(i, n - 1)]);
      i = i * 2;
      rangeHistory.push(i);
    }

    // Define binary search range
    const low = Math.floor(i / 2);
    const high = Math.min(i, n - 1);

    yield createEvent.highlight([10, 11]);
    yield createEvent.message(
      `Range found: [${low}, ${high}]`,
      'step'
    );
    yield createEvent.message(
      `Range expansion: ${rangeHistory.slice(0, -1).join(' → ')} → ${i} (exceeded)`,
      'explanation'
    );

    // Mark the range
    for (let j = low; j <= high; j++) {
      yield createEvent.mark([j], 'window');
    }

    // Binary search in range
    yield createEvent.message(
      `Phase 2: Binary search within range [${low}, ${high}]`,
      'step'
    );
    yield createEvent.highlight([12]);

    // Update state for binary phase
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Binary Search Phase',
      searchRangeData: {
        arrayLength: n,
        low,
        high,
        target,
        comparisons,
        eliminated,
        algorithm: 'exponential-search',
        exponentialRange: rangeHistory,
      },
    });

    let lo = low;
    let hi = high;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);

      yield createEvent.pointer(
        [
          { index: lo, label: 'lo', color: 'var(--color-primary-500)' },
          { index: mid, label: 'mid', color: 'var(--color-accent-current)' },
          { index: hi, label: 'hi', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'lo', value: lo },
          { name: 'mid', value: mid },
          { name: 'hi', value: hi },
          { name: 'arr[mid]', value: arr[mid], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing',
        searchRangeData: {
          arrayLength: n,
          low: lo,
          high: hi,
          mid,
          target,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'exponential-search',
          exponentialRange: rangeHistory,
        },
      });

      yield createEvent.mark([mid], 'current');
      comparisons++;

      if (arr[mid] === target) {
        // Clear window marks
        for (let j = 0; j < n; j++) {
          yield createEvent.unmark([j]);
        }

        yield createEvent.compare([mid, mid], 'eq');
        yield createEvent.mark([mid], 'sorted');
        yield createEvent.pointer(
          [{ index: mid, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: mid },
            { name: 'value', value: arr[mid], highlight: true },
          ]
        );

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
            algorithm: 'exponential-search',
            exponentialRange: rangeHistory,
          },
        });

        yield createEvent.message(
          `Found ${target} at index ${mid}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', mid, `Element Found at Index ${mid}`);
        return;
      } else if (arr[mid] < target) {
        yield createEvent.compare([mid, mid], 'lt');
        yield createEvent.message(
          `${arr[mid]} < ${target}, search right`,
          'explanation'
        );
        eliminated.push({ start: lo, end: mid });
        lo = mid + 1;
      } else {
        yield createEvent.compare([mid, mid], 'gt');
        yield createEvent.message(
          `${arr[mid]} > ${target}, search left`,
          'explanation'
        );
        eliminated.push({ start: mid, end: hi });
        hi = mid - 1;
      }
    }

    // Clear all marks
    for (let j = 0; j < n; j++) {
      yield createEvent.unmark([j]);
    }

    yield createEvent.pointer([], []);

    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Not Found',
      searchRangeData: {
        arrayLength: n,
        low: lo,
        high: hi,
        target,
        comparisons,
        eliminated,
        algorithm: 'exponential-search',
        exponentialRange: rangeHistory,
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
