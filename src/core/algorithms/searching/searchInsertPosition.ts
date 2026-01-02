import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Search Insert Position Algorithm
 * 
 * Finds the index where a target should be inserted to maintain sorted order.
 * If target exists, returns its index.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const searchInsertPosition: IAlgorithm<ArrayInput> = {
  id: 'search-insert-position',
  name: 'Search Insert Position',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function searchInsert(arr, target):',
    '  low = 0',
    '  high = n',
    '',
    '  while low < high:',
    '    mid = (low + high) / 2',
    '',
    '    if arr[mid] == target:',
    '      return mid  // Found!',
    '    else if arr[mid] < target:',
    '      low = mid + 1',
    '    else:',
    '      high = mid',
    '',
    '  return low  // Insert position',
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
      default: 5,
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
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 5) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Search Insert Position: Find where to insert ${target}`,
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
        algorithm: 'search-insert-position',
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
        `Checking position ${mid}`
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
          algorithm: 'search-insert-position',
        },
      });

      yield createEvent.mark([mid], 'current');
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
            algorithm: 'search-insert-position',
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
        yield createEvent.highlight([9, 10]);
        yield createEvent.compare([mid, mid], 'lt');
        yield createEvent.message(
          `${arr[mid]} < ${target}, insert position is to the right`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated left portion
        eliminated.push({ start: low, end: mid });
        low = mid + 1;
      } else {
        yield createEvent.highlight([11, 12]);
        yield createEvent.compare([mid, mid], 'gt');
        yield createEvent.message(
          `${arr[mid]} > ${target}, insert position is to the left`,
          'explanation'
        );
        yield createEvent.unmark([mid]);

        // Track eliminated right portion
        eliminated.push({ start: mid, end: Math.min(high - 1, n - 1) });
        high = mid;
      }
    }

    yield createEvent.highlight([14]);

    // Show insert position
    yield createEvent.pointer(
      [{ index: Math.min(low, n - 1), label: 'INSERT', color: 'var(--color-accent-pivot)' }],
      [
        { name: 'insertAt', value: low },
        { name: 'target', value: target, highlight: true },
      ],
      `Insert ${target} at index ${low}`
    );

    if (low < n) {
      yield createEvent.mark([low], 'pivot');
    }

    const prevElement = low > 0 ? arr[low - 1] : 'none';
    const nextElement = low < n ? arr[low] : 'none';

    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Insert Position Found',
      searchRangeData: {
        arrayLength: n,
        low,
        high: low,
        mid: low,
        target,
        comparisons,
        eliminated,
        algorithm: 'search-insert-position',
      },
    });

    yield createEvent.message(
      `${target} should be inserted at index ${low}`,
      'info'
    );
    yield createEvent.message(
      `Previous element: ${prevElement}, Next element: ${nextElement}`,
      'explanation'
    );
    yield createEvent.message(
      `Array after insertion would be: [${[...arr.slice(0, low), target, ...arr.slice(low)].join(', ')}]`,
      'explanation'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', low, `Insert at Index ${low}, Previous Element: ${prevElement}`);
  },
};
