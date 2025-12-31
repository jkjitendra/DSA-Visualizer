import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Cocktail Shaker Sort (Bidirectional Bubble Sort)
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Like Bubble Sort, but alternates between forward and backward passes.
 */
export const cocktailShakerSort: IAlgorithm<ArrayInput> = {
  id: 'cocktail-shaker-sort',
  name: 'Cocktail Shaker Sort',
  category: 'sorting',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function cocktailShakerSort(arr):',
    '  start = 0, end = length(arr) - 1',
    '  while start < end:',
    '    // Forward pass',
    '    for i from start to end-1:',
    '      if arr[i] > arr[i+1]: swap',
    '    end = end - 1',
    '    // Backward pass',
    '    for i from end to start+1:',
    '      if arr[i] < arr[i-1]: swap',
    '    start = start + 1',
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
    let start = 0;
    let end = arr.length - 1;
    let swapped = true;
    let pass = 0;

    yield createEvent.message(`Starting Cocktail Shaker Sort with ${arr.length} elements`);
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      [
        { name: 'start', value: start, highlight: false },
        { name: 'end', value: end, highlight: false },
      ],
      `Boundaries: start=${start}, end=${end}`
    );

    while (swapped && start < end) {
      swapped = false;
      pass++;

      // Forward pass (left to right)
      yield createEvent.message(`Pass ${pass}: Forward sweep →`);
      yield createEvent.highlight([3, 4]);

      for (let i = start; i < end; i++) {
        yield createEvent.pointer(
          [
            { index: i, label: 'i', color: 'var(--color-accent-compare)' },
            { index: i + 1, label: 'i+1', color: 'var(--color-accent-compare)' },
          ],
          [
            { name: 'i', value: i, highlight: false },
            { name: `arr[i]`, value: arr[i], highlight: true },
            { name: `arr[i+1]`, value: arr[i + 1], highlight: true },
          ],
          `Comparing arr[${i}] with arr[${i + 1}]`
        );

        yield createEvent.compare([i, i + 1]);
        yield createEvent.highlight([5]);

        if (arr[i] > arr[i + 1]) {
          yield createEvent.swap([i, i + 1]);
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          yield createEvent.message(`Swapped ${arr[i]} and ${arr[i + 1]}`);
        }
      }

      // Mark end as sorted
      yield createEvent.mark([end], 'sorted');
      end--;
      yield createEvent.highlight([6]);

      if (!swapped) break;

      // Backward pass (right to left)
      yield createEvent.message(`Pass ${pass}: Backward sweep ←`);
      yield createEvent.highlight([7, 8]);

      for (let i = end; i > start; i--) {
        yield createEvent.pointer(
          [
            { index: i, label: 'i', color: 'var(--color-accent-compare)' },
            { index: i - 1, label: 'i-1', color: 'var(--color-accent-compare)' },
          ],
          [
            { name: 'i', value: i, highlight: false },
            { name: `arr[i]`, value: arr[i], highlight: true },
            { name: `arr[i-1]`, value: arr[i - 1], highlight: true },
          ],
          `Comparing arr[${i}] with arr[${i - 1}]`
        );

        yield createEvent.compare([i, i - 1]);
        yield createEvent.highlight([9]);

        if (arr[i] < arr[i - 1]) {
          yield createEvent.swap([i, i - 1]);
          const temp = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1] = temp;
          swapped = true;
          yield createEvent.message(`Swapped ${arr[i]} and ${arr[i - 1]}`);
        }
      }

      // Mark start as sorted
      yield createEvent.mark([start], 'sorted');
      start++;
      yield createEvent.highlight([10]);
    }

    // Mark remaining elements as sorted
    for (let i = start; i <= end; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([11]);
  },
};
