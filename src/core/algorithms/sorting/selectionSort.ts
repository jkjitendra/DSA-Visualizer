import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Selection Sort Algorithm
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Finds the minimum element in unsorted portion and swaps it to the front.
 */
export const selectionSort: IAlgorithm<ArrayInput> = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function selectionSort(arr):',
    '  n = length(arr)',
    '  for i from 0 to n-1:',
    '    minIdx = i',
    '    for j from i+1 to n:',
    '      if arr[j] < arr[minIdx]:',
    '        minIdx = j',
    '    swap(arr[i], arr[minIdx])',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n²)',
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

    yield createEvent.message(`Starting Selection Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      [{ name: 'n', value: n, highlight: true }],
      `n = ${n}`
    );

    for (let i = 0; i < n - 1; i++) {
      yield createEvent.highlight([2]);

      let minIdx = i;

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-accent-current)' }],
        [
          { name: 'i', value: i, highlight: false },
          { name: 'minIdx', value: minIdx, highlight: true },
        ],
        `Finding minimum in unsorted portion [${i}..${n - 1}]`
      );

      yield createEvent.message(`Pass ${i + 1}: Finding minimum element`);
      yield createEvent.highlight([3]);

      for (let j = i + 1; j < n; j++) {
        yield createEvent.highlight([4]);

        // Compare current with minimum
        yield createEvent.compare([j, minIdx]);

        yield createEvent.pointer(
          [
            { index: i, label: 'i', color: 'var(--color-accent-current)' },
            { index: minIdx, label: 'min', color: 'var(--color-accent-pivot)' },
            { index: j, label: 'j', color: 'var(--color-accent-compare)' },
          ],
          [
            { name: 'i', value: i, highlight: false },
            { name: 'j', value: j, highlight: false },
            { name: 'minIdx', value: minIdx, highlight: false },
            { name: `arr[j]`, value: arr[j], highlight: true },
            { name: `arr[min]`, value: arr[minIdx], highlight: true },
          ],
          `arr[${j}] < arr[${minIdx}] → ${arr[j]} < ${arr[minIdx]} = ${arr[j] < arr[minIdx]}`
        );

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          yield createEvent.message(`New minimum found at index ${j}: ${arr[j]}`);
          yield createEvent.highlight([5, 6]);
          yield createEvent.mark([minIdx], 'minimum');
        }
      }

      // Swap if minIdx changed
      if (minIdx !== i) {
        yield createEvent.highlight([7]);
        yield createEvent.swap([i, minIdx]);

        yield createEvent.pointer(
          [
            { index: i, label: 'swap', color: 'var(--color-accent-swap)' },
            { index: minIdx, label: 'swap', color: 'var(--color-accent-swap)' },
          ],
          [
            { name: `arr[${i}]`, value: arr[i], highlight: true },
            { name: `arr[${minIdx}]`, value: arr[minIdx], highlight: true },
          ],
          `Swapping arr[${i}] ↔ arr[${minIdx}]`
        );

        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;

        yield createEvent.message(`Swapped ${arr[minIdx]} and ${arr[i]}`);
      }

      // Mark position as sorted
      yield createEvent.mark([i], 'sorted');
    }

    // Mark last element as sorted
    yield createEvent.mark([n - 1], 'sorted');

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([8]);
  },
};
