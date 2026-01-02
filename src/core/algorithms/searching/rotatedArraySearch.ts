import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Search in Rotated Sorted Array
 * 
 * Finds a target in a rotated sorted array using modified binary search.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const rotatedArraySearch: IAlgorithm<ArrayInput> = {
  id: 'rotated-array-search',
  name: 'Rotated Array Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function searchRotated(arr, target):',
    '  low = 0, high = n - 1',
    '',
    '  while low <= high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] == target:',
    '      return mid',
    '',
    '    // Check which half is sorted',
    '    if arr[low] <= arr[mid]:  // Left sorted',
    '      if arr[low] <= target < arr[mid]:',
    '        high = mid - 1',
    '      else:',
    '        low = mid + 1',
    '    else:  // Right sorted',
    '      if arr[mid] < target <= arr[high]:',
    '        low = mid + 1',
    '      else:',
    '        high = mid - 1',
    '',
    '  return -1',
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
      default: 0,
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
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }

    // Check if it's a valid rotated sorted array
    const arr = input.values;
    let rotationPoints = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        rotationPoints++;
      }
    }

    if (rotationPoints > 1) {
      return {
        ok: false,
        error: 'Input is not a valid rotated sorted array. It should be a sorted array that was rotated (e.g., [4, 5, 6, 1, 2, 3]).'
      };
    }

    if (rotationPoints === 1 && arr[arr.length - 1] > arr[0]) {
      return {
        ok: false,
        error: 'Input is not a valid rotated sorted array. Example valid input: [4, 5, 6, 1, 2, 3]'
      };
    }

    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 0) as number;
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Search in Rotated Sorted Array: Find ${target}`,
      'info',
      0
    );
    yield createEvent.highlight([0]);
    yield createEvent.message(
      `Array: [${arr.join(', ')}] (rotated sorted array)`,
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
        high,
        target,
        comparisons,
        eliminated,
        algorithm: 'rotated-array-search',
      },
    });

    while (low <= high) {
      yield createEvent.highlight([3]);
      const mid = Math.floor((low + high) / 2);

      yield createEvent.highlight([4]);
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
        ]
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
          target,
          currentValue: arr[mid],
          comparisons,
          eliminated,
          algorithm: 'rotated-array-search',
        },
      });

      yield createEvent.mark([mid], 'current');
      comparisons++;

      if (arr[mid] === target) {
        yield createEvent.highlight([6, 7]);
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
            algorithm: 'rotated-array-search',
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
        yield createEvent.result('search', mid, `Found at Index ${mid}, Value: ${arr[mid]}`);
        return;
      }

      // Check which half is sorted
      yield createEvent.highlight([10]);
      if (arr[low] <= arr[mid]) {
        // Left half is sorted
        yield createEvent.message(
          `Left half [${low}..${mid}] is sorted (${arr[low]} <= ${arr[mid]})`,
          'explanation'
        );

        for (let i = low; i <= mid; i++) {
          if (i !== mid) yield createEvent.mark([i], 'window');
        }

        yield createEvent.highlight([11, 12, 13, 14]);
        if (arr[low] <= target && target < arr[mid]) {
          yield createEvent.message(
            `Target ${target} is in sorted left half [${arr[low]}..${arr[mid]})`,
            'explanation'
          );
          // Clear marks
          for (let i = mid; i <= high; i++) {
            yield createEvent.unmark([i]);
          }
          // Track eliminated right
          eliminated.push({ start: mid, end: high });
          high = mid - 1;
        } else {
          yield createEvent.message(
            `Target ${target} is NOT in left half, search right`,
            'explanation'
          );
          // Clear marks
          for (let i = low; i <= mid; i++) {
            yield createEvent.unmark([i]);
          }
          // Track eliminated left
          eliminated.push({ start: low, end: mid });
          low = mid + 1;
        }
      } else {
        // Right half is sorted
        yield createEvent.highlight([15]);
        yield createEvent.message(
          `Right half [${mid}..${high}] is sorted (${arr[mid]} < ${arr[high]})`,
          'explanation'
        );

        for (let i = mid; i <= high; i++) {
          if (i !== mid) yield createEvent.mark([i], 'window');
        }

        yield createEvent.highlight([16, 17, 18, 19]);
        if (arr[mid] < target && target <= arr[high]) {
          yield createEvent.message(
            `Target ${target} is in sorted right half (${arr[mid]}..${arr[high]}]`,
            'explanation'
          );
          // Clear marks
          for (let i = low; i <= mid; i++) {
            yield createEvent.unmark([i]);
          }
          // Track eliminated left
          eliminated.push({ start: low, end: mid });
          low = mid + 1;
        } else {
          yield createEvent.message(
            `Target ${target} is NOT in right half, search left`,
            'explanation'
          );
          // Clear marks
          for (let i = mid; i <= high; i++) {
            yield createEvent.unmark([i]);
          }
          // Track eliminated right
          eliminated.push({ start: mid, end: high });
          high = mid - 1;
        }
      }
    }

    yield createEvent.highlight([21]);
    yield createEvent.pointer([], []);

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
        algorithm: 'rotated-array-search',
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
