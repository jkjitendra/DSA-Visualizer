import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, CountArrayItem } from '../../events/events';

/**
 * Counting Sort Algorithm
 * 
 * Time Complexity: O(n + k)
 * Space Complexity: O(k)
 * 
 * Non-comparison sort that counts occurrences.
 */
export const countingSort: IAlgorithm<ArrayInput> = {
  id: 'counting-sort',
  name: 'Counting Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function countingSort(arr, n):',
    '  max = getMax(arr)',
    '  count = new array[max + 1] = {0}',
    '',
    '  // Step 1: Count frequency of each element',
    '  for i = 0 to n - 1:',
    '    count[arr[i]]++',
    '',
    '  // Step 2: Reconstruct sorted array',
    '  idx = 0',
    '  for i = 0 to max:',
    '    while count[i] > 0:',
    '      arr[idx] = i',
    '      idx++',
    '      count[i]--',
    '',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n + k)',
    average: 'O(n + k)',
    worst: 'O(n + k)',
  },

  spaceComplexity: 'O(k)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 50) {
      return { ok: false, error: 'Array size must be 50 or less' };
    }
    if (!input.values.every((v) => typeof v === 'number' && Number.isInteger(v) && v >= 0)) {
      return { ok: false, error: 'Counting Sort requires non-negative integers' };
    }
    const max = Math.max(...input.values);
    if (max > 100) {
      return { ok: false, error: 'For visualization, max value should be 100 or less' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Starting Counting Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    // Find min and max values
    const max = Math.max(...arr);
    const min = Math.min(...arr);

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n, highlight: false },
        { name: 'max', value: max, highlight: true },
      ],
      `Max value = ${max}, creating count array of size ${max + 1}`
    );

    // Create count array - show only a subset for visualization (up to 20 slots)
    const count = new Array(max + 1).fill(0);
    const vizSize = Math.min(max + 1, 20);

    // Helper to create count array visualization (show relevant portion)
    const getCountArrayViz = (highlightIdx?: number): CountArrayItem[] => {
      // Find which indices have non-zero counts or are being highlighted
      const relevantIndices: number[] = [];
      for (let i = 0; i <= max; i++) {
        if (count[i] > 0 || i === highlightIdx || arr.includes(i)) {
          relevantIndices.push(i);
        }
      }
      // Limit to vizSize items
      const indicesToShow = relevantIndices.slice(0, vizSize);

      return indicesToShow.map((i) => ({
        index: i,
        count: count[i],
        highlight: i === highlightIdx,
      }));
    };

    yield createEvent.message('Creating empty count array');
    yield createEvent.highlight([2]);

    // Show initial empty count array
    yield createEvent.auxiliary({
      type: 'count',
      phase: 'Initialize',
      countArray: getCountArrayViz(),
      outputArray: [],
    });

    yield createEvent.message('Counting occurrences of each element');
    yield createEvent.highlight([3, 4]);

    // Count occurrences - show each increment
    for (let i = 0; i < n; i++) {
      const val = arr[i];
      count[val]++;

      yield createEvent.visit(i);
      yield createEvent.pointer(
        [{ index: i, label: String(val), color: 'var(--color-accent-compare)' }],
        [
          { name: 'value', value: val, highlight: true },
          { name: 'count[' + val + ']', value: count[val], highlight: true },
        ],
        `count[${val}]++ → ${count[val]}`
      );

      yield createEvent.auxiliary({
        type: 'count',
        phase: 'Frequency Count',
        countArray: getCountArrayViz(val),
        outputArray: [],
      });
    }

    yield createEvent.message('Reconstructing sorted array');
    yield createEvent.highlight([5, 6, 7, 8]);

    // Reconstruct sorted array
    const output: number[] = [];
    let idx = 0;
    for (let i = 0; i <= max; i++) {
      while (count[i] > 0) {
        arr[idx] = i;
        output.push(i);

        yield createEvent.set(idx, i);
        yield createEvent.mark([idx], 'sorted');

        yield createEvent.pointer(
          [{ index: idx, label: 'idx', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'value', value: i, highlight: true },
            { name: 'count[' + i + ']', value: count[i], highlight: false },
          ],
          `arr[${idx}] = ${i}`
        );

        count[i]--;

        yield createEvent.auxiliary({
          type: 'count',
          phase: 'Reconstruction',
          countArray: getCountArrayViz(i),
          outputArray: [...output],
        });

        idx++;
      }
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([10]);
  },
};
