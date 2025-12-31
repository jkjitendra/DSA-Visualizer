import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Bubble Sort Algorithm
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they are in the wrong order.
 */
export const bubbleSort: IAlgorithm<ArrayInput> = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function bubbleSort(arr):',
    '  n = length(arr)',
    '  for i from 0 to n-1:',
    '    for j from 0 to n-i-2:',
    '      if arr[j] > arr[j+1]:',
    '        swap(arr[j], arr[j+1])',
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

    // Initial message
    yield createEvent.message(
      `Starting Bubble Sort with ${n} elements`,
      'info',
      0
    );
    yield createEvent.highlight([0, 1]);

    for (let i = 0; i < n - 1; i++) {
      yield createEvent.message(
        `Pass ${i + 1}: Bubbling largest unsorted element to position ${n - 1 - i}`,
        'step',
        2
      );
      yield createEvent.highlight([2]);

      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        yield createEvent.highlight([3]);

        // Compare adjacent elements
        yield createEvent.message(
          `Comparing ${arr[j]} and ${arr[j + 1]}`,
          'explanation',
          4
        );
        yield createEvent.highlight([4]);

        const compareResult = arr[j] > arr[j + 1] ? 'gt' : (arr[j] < arr[j + 1] ? 'lt' : 'eq');
        yield createEvent.compare([j, j + 1], compareResult);

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          yield createEvent.message(
            `${arr[j]} > ${arr[j + 1]}, swapping`,
            'explanation',
            5
          );
          yield createEvent.highlight([5]);

          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          yield createEvent.swap([j, j + 1]);
          swapped = true;
        } else {
          yield createEvent.message(
            `${arr[j]} ≤ ${arr[j + 1]}, no swap needed`,
            'explanation'
          );
        }
      }

      // Mark the sorted element
      yield createEvent.mark([n - 1 - i], 'sorted');
      yield createEvent.message(
        `Element ${arr[n - 1 - i]} is now in its final position`,
        'step'
      );

      // Early termination if no swaps
      if (!swapped) {
        yield createEvent.message(
          'No swaps in this pass - array is sorted!',
          'info'
        );
        // Mark remaining elements as sorted
        for (let k = 0; k < n - 1 - i; k++) {
          yield createEvent.mark([k], 'sorted');
        }
        break;
      }
    }

    // Mark first element as sorted (if not already)
    yield createEvent.mark([0], 'sorted');

    yield createEvent.message(
      'Bubble Sort complete!',
      'info',
      6
    );
    yield createEvent.highlight([6]);
  },
};
