import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Quick Sort Algorithm
 * 
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 * 
 * Divide-and-conquer using pivot partitioning.
 */
export const quickSort: IAlgorithm<ArrayInput> = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function quickSort(arr, low, high):',
    '  if low < high:',
    '    pivotIdx = partition(arr, low, high)',
    '    quickSort(arr, low, pivotIdx - 1)',
    '    quickSort(arr, pivotIdx + 1, high)',
    '',
    'function partition(arr, low, high):',
    '  pivot = arr[high]    // Choose rightmost as pivot',
    '  i = low - 1          // Index of smaller element',
    '',
    '  for j = low to high - 1:',
    '    if arr[j] <= pivot:',
    '      i = i + 1',
    '      swap(arr[i], arr[j])',
    '',
    '  swap(arr[i + 1], arr[high])  // Place pivot correctly',
    '  return i + 1',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(log n)',

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

    yield createEvent.message(`Starting Quick Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    // Iterative quick sort using stack
    const stack: [number, number][] = [[0, n - 1]];

    while (stack.length > 0) {
      const [low, high] = stack.pop()!;

      if (low < high) {
        yield createEvent.pointer(
          [
            { index: low, label: 'L', color: 'var(--color-accent-compare)' },
            { index: high, label: 'pivot', color: 'var(--color-accent-pivot)' },
          ],
          [
            { name: 'low', value: low, highlight: false },
            { name: 'high', value: high, highlight: false },
            { name: 'pivot', value: arr[high], highlight: true },
          ],
          `Partitioning [${low}..${high}], pivot = ${arr[high]}`
        );

        // Partition
        const pivot = arr[high];
        let i = low - 1;

        yield createEvent.mark([high], 'pivot');
        yield createEvent.highlight([5, 6, 7]);

        // Show partition visualization
        yield createEvent.auxiliary({
          type: 'partition',
          phase: 'Partitioning',
          partitionData: {
            low,
            high,
            pivotIdx: high,
            pivotValue: pivot,
            i,
          },
        });

        for (let j = low; j < high; j++) {
          yield createEvent.compare([j, high]);
          yield createEvent.highlight([8, 9]);

          // Update partition view
          yield createEvent.auxiliary({
            type: 'partition',
            phase: `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}`,
            partitionData: {
              low,
              high,
              pivotIdx: high,
              pivotValue: pivot,
              i,
            },
          });

          yield createEvent.pointer(
            [
              { index: j, label: 'j', color: 'var(--color-accent-compare)' },
              { index: high, label: 'pivot', color: 'var(--color-accent-pivot)' },
            ],
            [
              { name: 'j', value: j, highlight: false },
              { name: 'i', value: i, highlight: false },
              { name: `arr[j]`, value: arr[j], highlight: true },
              { name: 'pivot', value: pivot, highlight: true },
            ],
            `${arr[j]} <= ${pivot} = ${arr[j] <= pivot}`
          );

          if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
              yield createEvent.swap([i, j]);
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
            }

            // Update partition boundary
            yield createEvent.auxiliary({
              type: 'partition',
              phase: `Swapped - boundary now at ${i}`,
              partitionData: {
                low,
                high,
                pivotIdx: high,
                pivotValue: pivot,
                i,
              },
            });
          }
        }

        // Place pivot in correct position
        i++;
        if (i !== high) {
          yield createEvent.swap([i, high]);
          yield createEvent.highlight([10]);
          const temp = arr[i];
          arr[i] = arr[high];
          arr[high] = temp;
        }

        yield createEvent.message(`Pivot ${pivot} placed at index ${i}`);
        yield createEvent.mark([i], 'sorted');

        // Push subarrays to stack
        stack.push([i + 1, high]);
        stack.push([low, i - 1]);
      } else if (low === high) {
        yield createEvent.mark([low], 'sorted');
      }
    }

    // Clear partition view
    yield createEvent.auxiliary({
      type: 'partition',
      phase: 'Complete',
      partitionData: { low: 0, high: 0, pivotIdx: 0, pivotValue: 0, i: 0 },
    });

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([11]);
  },
};
