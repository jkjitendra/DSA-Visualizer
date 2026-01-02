import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Find Minimum in Rotated Sorted Array
 * 
 * Finds the minimum element (rotation point) in a rotated sorted array.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const rotatedArrayMin: IAlgorithm<ArrayInput> = {
  id: 'rotated-array-min',
  name: 'Rotated Array Minimum',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function findMin(arr):',
    '  low = 0, high = n - 1',
    '',
    '  // If not rotated',
    '  if arr[low] < arr[high]:',
    '    return arr[low]',
    '',
    '  while low < high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] > arr[high]:',
    '      low = mid + 1  // Min on right',
    '    else:',
    '      high = mid  // Min at mid or left',
    '',
    '  return arr[low]  // Minimum',
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

    // Check if it's a valid rotated sorted array
    // A valid rotated sorted array has at most ONE point where arr[i] > arr[i+1]
    const arr = input.values;
    let rotationPoints = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        rotationPoints++;
      }
    }

    // Must have exactly 0 or 1 rotation point
    // If 1 rotation point, the last element must be less than or equal to the first
    if (rotationPoints > 1) {
      return {
        ok: false,
        error: 'Input is not a valid rotated sorted array. A rotated sorted array should be a sorted array that was rotated (e.g., [4, 5, 6, 1, 2, 3]). Please use a valid rotated sorted array.'
      };
    }

    // If there's one rotation point, verify it wraps correctly
    if (rotationPoints === 1 && arr[arr.length - 1] > arr[0]) {
      return {
        ok: false,
        error: 'Input is not a valid rotated sorted array. The last element should be less than or equal to the first element when rotated. Example: [4, 5, 6, 1, 2, 3]'
      };
    }

    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Find Minimum in Rotated Sorted Array`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.message(
      `Array: [${arr.join(', ')}]`,
      'explanation'
    );

    let low = 0;
    let high = n - 1;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    yield createEvent.highlight([1]);
    yield createEvent.pointer(
      [
        { index: low, label: 'low', color: 'var(--color-primary-500)' },
        { index: high, label: 'high', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'low', value: low },
        { name: 'high', value: high },
        { name: 'arr[low]', value: arr[low] },
        { name: 'arr[high]', value: arr[high] },
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
        target: 0, // Finding minimum, not specific target
        comparisons,
        eliminated,
        algorithm: 'rotated-array-min',
      },
    });

    // Check if array is not rotated
    yield createEvent.highlight([4, 5]);
    comparisons++;
    if (arr[low] < arr[high]) {
      yield createEvent.message(
        `Array is not rotated (arr[0]=${arr[low]} < arr[${n - 1}]=${arr[high]})`,
        'explanation'
      );
      yield createEvent.mark([0], 'sorted');
      yield createEvent.pointer(
        [{ index: 0, label: 'MIN', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'minIndex', value: 0 },
          { name: 'minValue', value: arr[0], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: 0,
          high: 0,
          mid: 0,
          target: 0,
          currentValue: arr[0],
          comparisons,
          eliminated,
          algorithm: 'rotated-array-min',
        },
      });

      yield createEvent.message(
        `Minimum is at index 0: ${arr[0]}`,
        'info'
      );
      yield createEvent.result('search', 0, `Minimum at Index 0, Value: ${arr[0]}`);
      return;
    }

    yield createEvent.message(
      `Array is rotated. Finding the rotation point (minimum)...`,
      'step'
    );

    while (low < high) {
      yield createEvent.highlight([7]);
      const mid = Math.floor((low + high) / 2);

      yield createEvent.highlight([8]);
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
          { name: 'arr[high]', value: arr[high] },
        ],
        `Compare arr[${mid}]=${arr[mid]} with arr[${high}]=${arr[high]}`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing',
        searchRangeData: {
          arrayLength: n,
          low,
          high,
          mid,
          target: 0,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'rotated-array-min',
        },
      });

      yield createEvent.mark([mid], 'current');
      comparisons++;

      if (arr[mid] > arr[high]) {
        yield createEvent.highlight([10, 11]);
        yield createEvent.compare([mid, high], 'gt');
        yield createEvent.message(
          `${arr[mid]} > ${arr[high]}: rotation point (min) is on the right`,
          'explanation'
        );

        // Mark left side as eliminated
        for (let i = low; i <= mid; i++) {
          yield createEvent.mark([i], 'minimum');
        }

        // Track eliminated left portion
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      } else {
        yield createEvent.highlight([12, 13]);
        yield createEvent.compare([mid, high], 'lt');
        yield createEvent.message(
          `${arr[mid]} <= ${arr[high]}: rotation point (min) is at mid or left`,
          'explanation'
        );

        // Mark right side as eliminated
        for (let i = mid + 1; i <= high; i++) {
          yield createEvent.mark([i], 'minimum');
        }

        // Track eliminated right portion
        eliminated.push({ start: mid + 1, end: high });
        high = mid;
      }
    }

    yield createEvent.highlight([15]);

    // Clear all marks and show result
    for (let i = 0; i < n; i++) {
      yield createEvent.unmark([i]);
    }

    yield createEvent.mark([low], 'sorted');
    yield createEvent.pointer(
      [{ index: low, label: 'MIN', color: 'var(--color-accent-sorted)' }],
      [
        { name: 'minIndex', value: low },
        { name: 'minValue', value: arr[low], highlight: true },
        { name: 'rotationPoint', value: low },
      ]
    );

    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Found!',
      searchRangeData: {
        arrayLength: n,
        low,
        high: low,
        mid: low,
        target: 0,
        currentValue: arr[low],
        comparisons,
        eliminated,
        algorithm: 'rotated-array-min',
      },
    });

    yield createEvent.message(
      `Minimum found at index ${low}: ${arr[low]}`,
      'info'
    );
    yield createEvent.message(
      `The array was rotated ${low} times (or rotated right ${n - low} times)`,
      'explanation'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', low, `Minimum at Index ${low}, Value: ${arr[low]}`);
  },
};
