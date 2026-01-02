import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Peak Element Search Algorithm
 * 
 * Finds a peak element - an element greater than its neighbors.
 * Uses binary search for O(log n) complexity.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const peakElement: IAlgorithm<ArrayInput> = {
  id: 'peak-element',
  name: 'Peak Element',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function findPeak(arr):',
    '  low = 0',
    '  high = n - 1',
    '',
    '  while low < high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] < arr[mid + 1]:',
    '      low = mid + 1  // Peak on right',
    '    else:',
    '      high = mid  // Peak on left or mid',
    '',
    '  return low  // Peak index',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Peak Element: Find element greater than its neighbors`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.message(
      `Array: [${arr.join(', ')}]`,
      'explanation'
    );
    yield createEvent.message(
      `Note: arr[-1] = arr[n] = -∞ (boundary elements can be peaks)`,
      'explanation'
    );

    if (n === 1) {
      yield createEvent.mark([0], 'sorted');
      yield createEvent.message(
        `Single element is always a peak! Peak at index 0 = ${arr[0]}`,
        'info'
      );
      yield createEvent.result('search', 0, `Peak at Index 0, Value: ${arr[0]}`);
      return;
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
      ]
    );

    // Initial state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Initializing',
      searchRangeData: {
        arrayLength: n,
        low,
        high,
        target: 0, // Not searching for target, finding peak
        comparisons,
        eliminated,
        algorithm: 'peak-element',
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
          { index: high, label: 'high', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'low', value: low },
          { name: 'mid', value: mid },
          { name: 'high', value: high },
          { name: 'arr[mid]', value: arr[mid], highlight: true },
          { name: 'arr[mid+1]', value: arr[mid + 1] },
        ],
        `Compare arr[${mid}]=${arr[mid]} with arr[${mid + 1}]=${arr[mid + 1]}`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing slope',
        searchRangeData: {
          arrayLength: n,
          low,
          high,
          mid,
          target: 0,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'peak-element',
        },
      });

      yield createEvent.mark([mid], 'current');
      yield createEvent.mark([mid + 1], 'window');
      comparisons++;

      if (arr[mid] < arr[mid + 1]) {
        yield createEvent.highlight([7, 8]);
        yield createEvent.compare([mid, mid + 1], 'lt');
        yield createEvent.message(
          `${arr[mid]} < ${arr[mid + 1]}, ascending slope → peak is on the right`,
          'explanation'
        );
        yield createEvent.unmark([mid]);
        yield createEvent.unmark([mid + 1]);

        // Track eliminated left portion
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      } else {
        yield createEvent.highlight([9, 10]);
        yield createEvent.compare([mid, mid + 1], 'gt');
        yield createEvent.message(
          `${arr[mid]} >= ${arr[mid + 1]}, descending slope → peak is at mid or left`,
          'explanation'
        );
        yield createEvent.unmark([mid]);
        yield createEvent.unmark([mid + 1]);

        // Track eliminated right portion
        eliminated.push({ start: mid + 1, end: high });
        high = mid;
      }
    }

    yield createEvent.highlight([12]);

    // low is the peak
    yield createEvent.mark([low], 'sorted');
    yield createEvent.pointer(
      [{ index: low, label: 'PEAK!', color: 'var(--color-accent-sorted)' }],
      [
        { name: 'peakIndex', value: low },
        { name: 'peakValue', value: arr[low], highlight: true },
        { name: 'leftNeighbor', value: low > 0 ? arr[low - 1] : '-∞' },
        { name: 'rightNeighbor', value: low < n - 1 ? arr[low + 1] : '-∞' },
      ]
    );

    // Found state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Peak Found!',
      searchRangeData: {
        arrayLength: n,
        low,
        high: low,
        mid: low,
        target: 0,
        currentValue: arr[low],
        comparisons,
        eliminated,
        algorithm: 'peak-element',
      },
    });

    yield createEvent.message(
      `Peak found at index ${low}: value = ${arr[low]}`,
      'info'
    );
    yield createEvent.message(
      `Verification: ${arr[low]} > ${low > 0 ? arr[low - 1] : '-∞'} (left) and ${arr[low]} > ${low < n - 1 ? arr[low + 1] : '-∞'} (right)`,
      'explanation'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', low, `Peak at Index ${low}, Value: ${arr[low]}`);
  },
};
