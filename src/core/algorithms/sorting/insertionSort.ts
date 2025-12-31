import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Insertion Sort Algorithm
 * 
 * Time Complexity: O(n²) worst, O(n) best
 * Space Complexity: O(1)
 * 
 * Builds sorted array one element at a time by inserting each element
 * into its correct position.
 */
export const insertionSort: IAlgorithm<ArrayInput> = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function insertionSort(arr):',
    '  for i from 1 to length(arr):',
    '    key = arr[i]',
    '    j = i - 1',
    '    while j >= 0 and arr[j] > key:',
    '      arr[j+1] = arr[j]',
    '      j = j - 1',
    '    arr[j+1] = key',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 50) {
      return { ok: false, error: 'Array size must be 50 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Starting Insertion Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    // First element is already "sorted"
    yield createEvent.mark([0], 'sorted');

    for (let i = 1; i < n; i++) {
      yield createEvent.highlight([1]);

      const key = arr[i];
      let j = i - 1;

      yield createEvent.pointer(
        [{ index: i, label: 'key', color: 'var(--color-accent-current)' }],
        [
          { name: 'i', value: i, highlight: false },
          { name: 'key', value: key, highlight: true },
          { name: 'j', value: j, highlight: false },
        ],
        `Inserting key=${key} into sorted portion [0..${i - 1}]`
      );

      yield createEvent.message(`Inserting element ${key} at correct position`);
      yield createEvent.highlight([2, 3]);

      while (j >= 0 && arr[j] > key) {
        yield createEvent.highlight([4]);

        // Compare
        yield createEvent.compare([j, i]);

        yield createEvent.pointer(
          [
            { index: j, label: 'j', color: 'var(--color-accent-compare)' },
            { index: j + 1, label: 'j+1', color: 'var(--color-accent-swap)' },
          ],
          [
            { name: 'key', value: key, highlight: true },
            { name: 'j', value: j, highlight: false },
            { name: `arr[j]`, value: arr[j], highlight: true },
          ],
          `arr[${j}] > key → ${arr[j]} > ${key} = true → shift right`
        );

        // Shift element right
        arr[j + 1] = arr[j];
        yield createEvent.message(`Shifting ${arr[j]} to position ${j + 1}`);
        yield createEvent.swap([j, j + 1]);
        yield createEvent.highlight([5]);

        j--;
        yield createEvent.highlight([6]);
      }

      // Insert key at correct position
      arr[j + 1] = key;
      yield createEvent.highlight([7]);

      yield createEvent.pointer(
        [{ index: j + 1, label: 'insert', color: 'var(--color-accent-sorted)' }],
        [
          { name: 'key', value: key, highlight: true },
          { name: 'position', value: j + 1, highlight: true },
        ],
        `Inserted ${key} at position ${j + 1}`
      );

      yield createEvent.message(`Inserted ${key} at position ${j + 1}`);

      // Mark sorted portion
      for (let k = 0; k <= i; k++) {
        yield createEvent.mark([k], 'sorted');
      }
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([8]);
  },
};
