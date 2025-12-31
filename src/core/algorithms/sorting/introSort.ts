import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Intro Sort Algorithm (Simplified)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n)
 * 
 * Hybrid: Quick Sort + Heap Sort + Insertion Sort
 */
export const introSort: IAlgorithm<ArrayInput> = {
  id: 'intro-sort',
  name: 'Intro Sort',
  category: 'sorting',
  difficulty: 'advanced',

  parameters: [
    {
      type: 'number',
      id: 'insertionThreshold',
      label: 'Insertion Threshold',
      default: 8,
      min: 4,
      max: 32,
      step: 2,
    },
  ],

  pseudocodeLines: [
    'function introSort(arr, n):',
    '  maxDepth = 2 * floor(log2(n))',
    '  introSortUtil(arr, 0, n-1, maxDepth)',
    '',
    'function introSortUtil(arr, lo, hi, depth):',
    '  size = hi - lo + 1',
    '  if size < threshold:',
    '    insertionSort(arr, lo, hi)  // Small array',
    '  else if depth == 0:',
    '    heapSort(arr, lo, hi)       // Depth limit',
    '  else:',
    '    pivot = partition(arr, lo, hi)',
    '    introSortUtil(lo, pivot, depth-1)',
    '    introSortUtil(pivot+1, hi, depth-1)',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
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
      return { ok: false, error: 'Array size must be 50 or less' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const maxDepth = Math.floor(2 * Math.log2(n));
    const INSERTION_THRESHOLD = (params?.insertionThreshold as number) || 8;

    yield createEvent.message(`Starting Intro Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n, highlight: false },
        { name: 'maxDepth', value: maxDepth, highlight: true },
        { name: 'threshold', value: INSERTION_THRESHOLD, highlight: true },
      ],
      `Max depth: ${maxDepth}, Insertion threshold: ${INSERTION_THRESHOLD}`
    );

    // Use a stack for iterative implementation
    const stack: { lo: number; hi: number; depth: number }[] = [{ lo: 0, hi: n - 1, depth: maxDepth }];

    while (stack.length > 0) {
      const { lo, hi, depth } = stack.pop()!;
      const size = hi - lo + 1;

      if (size <= 1) continue;

      if (size < INSERTION_THRESHOLD) {
        // Insertion Sort for small arrays
        yield createEvent.message(`📝 Insertion Sort for [${lo}..${hi}] (size ${size} < ${INSERTION_THRESHOLD})`);
        yield createEvent.highlight([6, 7]);

        yield createEvent.auxiliary({
          type: 'mode',
          phase: 'Small subarray',
          modeData: {
            mode: 'insertion',
            depth,
            maxDepth,
            range: { lo, hi },
          },
        });

        for (let i = lo + 1; i <= hi; i++) {
          const key = arr[i];
          let j = i - 1;
          while (j >= lo && arr[j] > key) {
            arr[j + 1] = arr[j];
            yield createEvent.swap([j, j + 1]);
            j--;
          }
          arr[j + 1] = key;
        }

        for (let i = lo; i <= hi; i++) {
          yield createEvent.mark([i], 'sorted');
        }
      } else if (depth === 0) {
        // Heap Sort when depth exhausted
        yield createEvent.message(`🌳 Heap Sort for [${lo}..${hi}] (depth exhausted)`);
        yield createEvent.highlight([8, 9]);

        yield createEvent.auxiliary({
          type: 'mode',
          phase: 'Depth limit reached',
          modeData: {
            mode: 'heapsort',
            depth,
            maxDepth,
            range: { lo, hi },
          },
        });

        // Build max heap
        for (let i = lo + Math.floor(size / 2) - 1; i >= lo; i--) {
          yield* heapify(arr, lo, hi, i);
        }

        // Extract elements
        for (let i = hi; i > lo; i--) {
          yield createEvent.swap([lo, i]);
          const temp = arr[lo];
          arr[lo] = arr[i];
          arr[i] = temp;
          yield createEvent.mark([i], 'sorted');
          yield* heapify(arr, lo, i - 1, lo);
        }
        yield createEvent.mark([lo], 'sorted');
      } else {
        // Quick Sort partition
        yield createEvent.message(`⚡ Quick Sort partition [${lo}..${hi}]`);
        yield createEvent.highlight([10, 11, 12]);

        yield createEvent.auxiliary({
          type: 'mode',
          phase: `QuickSort depth ${maxDepth - depth + 1}/${maxDepth}`,
          modeData: {
            mode: 'quicksort',
            depth,
            maxDepth,
            range: { lo, hi },
          },
        });

        const pivot = arr[hi];
        yield createEvent.mark([hi], 'pivot');

        let i = lo - 1;
        for (let j = lo; j < hi; j++) {
          yield createEvent.compare([j, hi]);
          if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
              yield createEvent.swap([i, j]);
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
            }
          }
        }

        i++;
        if (i !== hi) {
          yield createEvent.swap([i, hi]);
          const temp = arr[i];
          arr[i] = arr[hi];
          arr[hi] = temp;
        }

        yield createEvent.mark([i], 'sorted');

        // Push subarrays to stack
        if (i - 1 > lo) stack.push({ lo, hi: i - 1, depth: depth - 1 });
        if (i + 1 < hi) stack.push({ lo: i + 1, hi, depth: depth - 1 });
      }
    }

    // Clear mode view
    yield createEvent.auxiliary({
      type: 'mode',
      phase: 'Complete',
      modeData: { mode: 'insertion', depth: 0, maxDepth: 0, range: { lo: 0, hi: 0 } },
    });

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([13]);
  },
};

function* heapify(arr: number[], lo: number, hi: number, i: number): Generator<AlgoEvent, void, unknown> {
  let largest = i;
  const left = lo + 2 * (i - lo) + 1;
  const right = lo + 2 * (i - lo) + 2;

  if (left <= hi && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right <= hi && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    yield createEvent.swap([i, largest]);
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    yield* heapify(arr, lo, hi, largest);
  }
}
