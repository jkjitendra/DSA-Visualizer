import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Fibonacci Search Algorithm
 * 
 * Divides array using Fibonacci numbers instead of halving.
 * Uses only addition and subtraction (no division).
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const fibonacciSearch: IAlgorithm<ArrayInput> = {
  id: 'fibonacci-search',
  name: 'Fibonacci Search',
  category: 'searching',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function fibonacciSearch(arr, target):',
    '  // Find smallest Fib >= n',
    '  fibM2 = 0, fibM1 = 1',
    '  fibM = fibM1 + fibM2',
    '  while fibM < n:',
    '    fibM2 = fibM1',
    '    fibM1 = fibM',
    '    fibM = fibM1 + fibM2',
    '',
    '  offset = -1',
    '  while fibM > 1:',
    '    i = min(offset + fibM2, n - 1)',
    '    if arr[i] < target:',
    '      fibM = fibM1; fibM1 = fibM2',
    '      fibM2 = fibM - fibM1; offset = i',
    '    else if arr[i] > target:',
    '      fibM = fibM2; fibM1 -= fibM2',
    '      fibM2 = fibM - fibM1',
    '    else: return i',
    '',
    '  if fibM1 and arr[offset+1] == target:',
    '    return offset + 1',
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
      default: 15,
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
    const target = (params?.target ?? 15) as number;
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Fibonacci Search: Find ${target} using Fibonacci numbers`,
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

    // Find smallest Fibonacci >= n
    yield createEvent.message(
      `Phase 1: Find Fibonacci number >= ${n}`,
      'step'
    );
    yield createEvent.highlight([2, 3, 4, 5, 6, 7]);

    let fibM2 = 0; // (m-2)th Fibonacci
    let fibM1 = 1; // (m-1)th Fibonacci
    let fibM = fibM1 + fibM2; // mth Fibonacci
    const fibSequence = [0, 1];

    while (fibM < n) {
      fibM2 = fibM1;
      fibM1 = fibM;
      fibM = fibM1 + fibM2;
      fibSequence.push(fibM);
    }

    yield createEvent.message(
      `Fibonacci sequence: ${fibSequence.join(', ')} (using ${fibM} >= ${n})`,
      'explanation'
    );
    yield createEvent.pointer(
      [],
      [
        { name: 'fibM', value: fibM },
        { name: 'fibM1', value: fibM1 },
        { name: 'fibM2', value: fibM2 },
        { name: 'n', value: n },
      ]
    );

    let offset = -1;
    let comparisons = 0;
    const eliminated: { start: number; end: number }[] = [];

    // Initial state
    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Fibonacci Division',
      searchRangeData: {
        arrayLength: n,
        low: 0,
        high: n - 1,
        target,
        comparisons,
        eliminated,
        algorithm: 'fibonacci-search',
        fibNumbers: [...fibSequence],
      },
    });

    yield createEvent.message(
      `Phase 2: Search using Fibonacci division`,
      'step'
    );
    yield createEvent.highlight([9, 10]);

    while (fibM > 1) {
      const i = Math.min(offset + fibM2, n - 1);

      yield createEvent.highlight([11]);
      yield createEvent.pointer(
        [
          { index: Math.max(0, offset), label: 'offset', color: 'var(--color-primary-500)' },
          { index: i, label: `i=${i}`, color: 'var(--color-accent-current)' },
        ],
        [
          { name: 'offset', value: offset },
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'fibM', value: fibM },
          { name: 'fibM1', value: fibM1 },
          { name: 'fibM2', value: fibM2 },
        ],
        `i = min(${offset} + ${fibM2}, ${n - 1}) = ${i}`
      );

      // Update search state
      yield createEvent.auxiliary({
        type: 'search-range',
        phase: `Checking index ${i}`,
        searchRangeData: {
          arrayLength: n,
          low: Math.max(0, offset + 1),
          high: n - 1,
          mid: i,
          target,
          currentValue: arr[i],
          comparisons,
          eliminated,
          algorithm: 'fibonacci-search',
          fibNumbers: [fibM2, fibM1, fibM],
        },
      });

      yield createEvent.mark([i], 'current');
      comparisons++;

      if (arr[i] < target) {
        yield createEvent.highlight([12, 13, 14]);
        yield createEvent.compare([i, i], 'lt');
        yield createEvent.message(
          `${arr[i]} < ${target}: Move one Fibonacci down (search right)`,
          'explanation'
        );
        yield createEvent.unmark([i]);

        // Track eliminated left portion
        eliminated.push({ start: Math.max(0, offset + 1), end: i });

        fibM = fibM1;
        fibM1 = fibM2;
        fibM2 = fibM - fibM1;
        offset = i;
      } else if (arr[i] > target) {
        yield createEvent.highlight([15, 16, 17]);
        yield createEvent.compare([i, i], 'gt');
        yield createEvent.message(
          `${arr[i]} > ${target}: Move two Fibonacci down (search left)`,
          'explanation'
        );
        yield createEvent.unmark([i]);

        // Track eliminated right portion
        eliminated.push({ start: i, end: n - 1 });

        fibM = fibM2;
        fibM1 = fibM1 - fibM2;
        fibM2 = fibM - fibM1;
      } else {
        yield createEvent.highlight([18]);
        yield createEvent.compare([i, i], 'eq');
        yield createEvent.mark([i], 'sorted');
        yield createEvent.pointer(
          [{ index: i, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'index', value: i },
            { name: 'value', value: arr[i], highlight: true },
          ]
        );

        yield createEvent.auxiliary({
          type: 'search-range',
          phase: 'Found!',
          searchRangeData: {
            arrayLength: n,
            low: i,
            high: i,
            mid: i,
            target,
            currentValue: arr[i],
            comparisons,
            eliminated,
            algorithm: 'fibonacci-search',
            fibNumbers: [fibM2, fibM1, fibM],
          },
        });

        yield createEvent.message(
          `Found ${target} at index ${i}!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', i, `Element Found at Index ${i}`);
        return;
      }
    }

    // Check last element
    yield createEvent.highlight([20, 21]);
    if (fibM1 && offset + 1 < n && arr[offset + 1] === target) {
      comparisons++;
      yield createEvent.mark([offset + 1], 'sorted');
      yield createEvent.pointer(
        [{ index: offset + 1, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'index', value: offset + 1 },
          { name: 'value', value: arr[offset + 1], highlight: true },
        ]
      );

      yield createEvent.auxiliary({
        type: 'search-range',
        phase: 'Found!',
        searchRangeData: {
          arrayLength: n,
          low: offset + 1,
          high: offset + 1,
          mid: offset + 1,
          target,
          currentValue: arr[offset + 1],
          comparisons,
          eliminated,
          algorithm: 'fibonacci-search',
          fibNumbers: [fibM2, fibM1, fibM],
        },
      });

      yield createEvent.message(
        `Found ${target} at index ${offset + 1}!`,
        'info'
      );
      yield createEvent.message(
        `Total comparisons: ${comparisons}`,
        'explanation'
      );
      yield createEvent.result('search', offset + 1, `Element Found at Index ${offset + 1}`);
      return;
    }

    yield createEvent.highlight([22]);
    yield createEvent.pointer([], []);

    yield createEvent.auxiliary({
      type: 'search-range',
      phase: 'Not Found',
      searchRangeData: {
        arrayLength: n,
        low: offset + 1,
        high: n - 1,
        target,
        comparisons,
        eliminated,
        algorithm: 'fibonacci-search',
        fibNumbers: [fibM2, fibM1, fibM],
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
