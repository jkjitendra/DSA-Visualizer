import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Interpolation Search Algorithm
 * 
 * Uses interpolation formula to probe positions.
 * Best for uniformly distributed data.
 * 
 * Time Complexity: O(log log n) for uniform, O(n) worst
 * Space Complexity: O(1)
 */
export const interpolationSearch: IAlgorithm<ArrayInput> = {
  id: 'interpolation-search',
  name: 'Interpolation Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function interpolationSearch(arr, target):',
    '  low = 0, high = n - 1',
    '',
    '  while low <= high and target in range:',
    '    // Interpolation formula',
    '    pos = low + ((target - arr[low]) *',
    '          (high - low)) / (arr[high] - arr[low])',
    '',
    '    if arr[pos] == target:',
    '      return pos',
    '    else if arr[pos] < target:',
    '      low = pos + 1',
    '    else:',
    '      high = pos - 1',
    '',
    '  return -1',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(log log n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 50,
      min: 0,
      max: 200,
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
    const target = (params?.target ?? 50) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Interpolation Search: Find ${target} using position estimation`,
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

    yield createEvent.message(
      `Unlike binary search, interpolation estimates WHERE the target likely is based on its value`,
      'explanation'
    );

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
        { name: 'arr[low]', value: arr[low] },
        { name: 'arr[high]', value: arr[high] },
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
        algorithm: 'interpolation-search',
      },
    });

    while (low <= high && target >= arr[low] && target <= arr[high]) {
      yield createEvent.highlight([3]);

      // Prevent division by zero
      if (arr[high] === arr[low]) {
        if (arr[low] === target) {
          yield createEvent.mark([low], 'sorted');
          yield createEvent.message(
            `All elements equal to target. Found at index ${low}!`,
            'info'
          );
          yield createEvent.result('search', low, `Element Found at Index ${low}`);
          return;
        }
        break;
      }

      // Interpolation formula
      yield createEvent.highlight([5, 6]);
      const pos = Math.floor(
        low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
      );

      yield createEvent.message(
        `pos = ${low} + ((${target} - ${arr[low]}) × (${high} - ${low})) / (${arr[high]} - ${arr[low]}) = ${pos}`,
        'explanation'
      );

      yield createEvent.pointer(
        [
          { index: low, label: 'low', color: 'var(--color-primary-500)' },
          { index: pos, label: 'probe', color: 'var(--color-accent-current)' },
          { index: high, label: 'high', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'low', value: low },
          { name: 'pos', value: pos, highlight: true },
          { name: 'high', value: high },
          { name: 'arr[pos]', value: arr[pos], highlight: true },
          { name: 'target', value: target },
        ],
        `Probing position ${pos}`
      );

      // Update search state with probe position
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Probing',
        searchRangeData: {
          arrayLength: n,
          low,
          high,
          mid: pos,
          target,
          currentValue: arr[pos],
          comparisons,
          eliminated,
          algorithm: 'interpolation-search',
          probePosition: pos,
        },
      });

      yield createEvent.mark([pos], 'current');
      comparisons++;

      if (arr[pos] === target) {
        yield createEvent.highlight([8, 9]);
        yield createEvent.compare([pos, pos], 'eq');
        yield createEvent.mark([pos], 'sorted');
        yield createEvent.pointer(
          [{ index: pos, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: pos },
            { name: 'value', value: arr[pos], highlight: true },
          ]
        );

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: pos,
            high: pos,
            mid: pos,
            target,
            currentValue: arr[pos],
            comparisons,
            eliminated,
            algorithm: 'interpolation-search',
            probePosition: pos,
          },
        });

        yield createEvent.message(
          `Found ${target} at index ${pos}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons} (O(log log n) for uniform data!)`,
          'explanation'
        );
        yield createEvent.result('search', pos, `Element Found at Index ${pos}`);
        return;
      } else if (arr[pos] < target) {
        yield createEvent.highlight([10, 11]);
        yield createEvent.compare([pos, pos], 'lt');
        yield createEvent.message(
          `${arr[pos]} < ${target}, search right half`,
          'explanation'
        );
        yield createEvent.unmark([pos]);

        // Track eliminated left portion
        eliminated.push({ start: low, end: pos });
        low = pos + 1;
      } else {
        yield createEvent.highlight([12, 13]);
        yield createEvent.compare([pos, pos], 'gt');
        yield createEvent.message(
          `${arr[pos]} > ${target}, search left half`,
          'explanation'
        );
        yield createEvent.unmark([pos]);

        // Track eliminated right portion
        eliminated.push({ start: pos, end: high });
        high = pos - 1;
      }
    }

    yield createEvent.highlight([15]);
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
        algorithm: 'interpolation-search',
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
