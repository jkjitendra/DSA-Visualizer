import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Ternary Search Algorithm
 * 
 * Divides array into 3 parts instead of 2.
 * Useful for unimodal functions (finding max/min).
 * 
 * Time Complexity: O(log₃ n)
 * Space Complexity: O(1)
 */
export const ternarySearch: IAlgorithm<ArrayInput> = {
  id: 'ternary-search',
  name: 'Ternary Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function ternarySearch(arr, target):',
    '  low = 0, high = n - 1',
    '',
    '  while low <= high:',
    '    // Divide into 3 parts',
    '    mid1 = low + (high - low) / 3',
    '    mid2 = high - (high - low) / 3',
    '',
    '    if arr[mid1] == target:',
    '      return mid1',
    '    if arr[mid2] == target:',
    '      return mid2',
    '',
    '    if target < arr[mid1]:',
    '      high = mid1 - 1  // Left third',
    '    else if target > arr[mid2]:',
    '      low = mid2 + 1   // Right third',
    '    else:',
    '      low = mid1 + 1   // Middle third',
    '      high = mid2 - 1',
    '',
    '  return -1',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(log₃ n)',
    worst: 'O(log₃ n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 11,
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
    const target = (params?.target ?? 11) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Ternary Search: Find ${target} by dividing array into 3 parts`,
      'info',
      0
    );
    yield createEvent.highlight([0, 1]);

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

    let low = 0;
    let high = n - 1;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

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
        algorithm: 'ternary-search',
      },
    });

    while (low <= high) {
      yield createEvent.highlight([3]);

      // Calculate two mid points
      yield createEvent.highlight([5, 6]);
      const mid1 = low + Math.floor((high - low) / 3);
      const mid2 = high - Math.floor((high - low) / 3);

      yield createEvent.pointer(
        [
          { index: low, label: 'low', color: 'var(--color-primary-500)' },
          { index: mid1, label: 'mid1', color: 'var(--color-accent-compare)' },
          { index: mid2, label: 'mid2', color: 'var(--color-accent-swap)' },
          { index: high, label: 'high', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'low', value: low },
          { name: 'mid1', value: mid1 },
          { name: 'mid2', value: mid2 },
          { name: 'high', value: high },
          { name: 'arr[mid1]', value: arr[mid1], highlight: true },
          { name: 'arr[mid2]', value: arr[mid2], highlight: true },
        ],
        `Three parts: [${low}..${mid1}], [${mid1 + 1}..${mid2 - 1}], [${mid2}..${high}]`
      );

      // Update search state with both mid points
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Comparing',
        searchRangeData: {
          arrayLength: n,
          low,
          high,
          mid1,
          mid2,
          target,
          comparisons,
          eliminated,
          algorithm: 'ternary-search',
        },
      });

      yield createEvent.mark([mid1], 'current');
      yield createEvent.mark([mid2], 'window');

      yield createEvent.message(
        `Checking mid1=${mid1} (${arr[mid1]}) and mid2=${mid2} (${arr[mid2]})`,
        'explanation'
      );

      // Check mid1
      yield createEvent.highlight([8, 9]);
      comparisons++;
      if (arr[mid1] === target) {
        yield createEvent.compare([mid1, mid1], 'eq');
        yield createEvent.unmark([mid2]);
        yield createEvent.mark([mid1], 'sorted');
        yield createEvent.pointer(
          [{ index: mid1, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: mid1 },
            { name: 'value', value: arr[mid1], highlight: true },
          ]
        );

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: mid1,
            high: mid1,
            mid1,
            mid2,
            target,
            comparisons,
            eliminated,
            algorithm: 'ternary-search',
          },
        });

        yield createEvent.message(
          `Found ${target} at mid1 = ${mid1}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', mid1, `Element Found at Index ${mid1}`);
        return;
      }

      // Check mid2
      yield createEvent.highlight([10, 11]);
      comparisons++;
      if (arr[mid2] === target) {
        yield createEvent.compare([mid2, mid2], 'eq');
        yield createEvent.unmark([mid1]);
        yield createEvent.mark([mid2], 'sorted');
        yield createEvent.pointer(
          [{ index: mid2, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: mid2 },
            { name: 'value', value: arr[mid2], highlight: true },
          ]
        );

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: mid2,
            high: mid2,
            mid1,
            mid2,
            target,
            comparisons,
            eliminated,
            algorithm: 'ternary-search',
          },
        });

        yield createEvent.message(
          `Found ${target} at mid2 = ${mid2}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', mid2, `Element Found at Index ${mid2}`);
        return;
      }

      // Determine which third to search
      if (target < arr[mid1]) {
        yield createEvent.highlight([13, 14]);
        yield createEvent.compare([mid1, mid1], 'gt');
        yield createEvent.message(
          `${target} < ${arr[mid1]}, search LEFT third [${low}..${mid1 - 1}]`,
          'explanation'
        );
        yield createEvent.unmark([mid1]);
        yield createEvent.unmark([mid2]);

        // Track eliminated regions (middle and right)
        eliminated.push({ start: mid1, end: high });
        high = mid1 - 1;
      } else if (target > arr[mid2]) {
        yield createEvent.highlight([15, 16]);
        yield createEvent.compare([mid2, mid2], 'lt');
        yield createEvent.message(
          `${target} > ${arr[mid2]}, search RIGHT third [${mid2 + 1}..${high}]`,
          'explanation'
        );
        yield createEvent.unmark([mid1]);
        yield createEvent.unmark([mid2]);

        // Track eliminated regions (left and middle)
        eliminated.push({ start: low, end: mid2 });
        low = mid2 + 1;
      } else {
        yield createEvent.highlight([17, 18, 19]);
        yield createEvent.message(
          `${arr[mid1]} < ${target} < ${arr[mid2]}, search MIDDLE third [${mid1 + 1}..${mid2 - 1}]`,
          'explanation'
        );
        yield createEvent.unmark([mid1]);
        yield createEvent.unmark([mid2]);

        // Track eliminated regions (left and right thirds)
        eliminated.push({ start: low, end: mid1 });
        eliminated.push({ start: mid2, end: high });
        low = mid1 + 1;
        high = mid2 - 1;
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
        algorithm: 'ternary-search',
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
