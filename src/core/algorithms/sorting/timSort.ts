import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Tim Sort Algorithm (Simplified)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * Hybrid: uses Insertion Sort for small runs, then merges.
 */
export const timSort: IAlgorithm<ArrayInput> = {
  id: 'tim-sort',
  name: 'Tim Sort',
  category: 'sorting',
  difficulty: 'advanced',

  parameters: [
    {
      type: 'number',
      id: 'minRun',
      label: 'Min Run Size',
      default: 4,
      min: 2,
      max: 16,
      step: 1,
    },
  ],

  pseudocodeLines: [
    'function timSort(arr, n):',
    '  minRun = calculateMinRun(n)',
    '',
    '  // Phase 1: Sort runs with insertion sort',
    '  for i = 0 to n by minRun:',
    '    insertionSort(arr, i, min(i+minRun, n))',
    '',
    '  // Phase 2: Merge runs',
    '  for size = minRun, doubling:',
    '    for start = 0, by 2*size:',
    '      merge(arr, start, mid, end)',
    '',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

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
    const MIN_RUN = (params?.minRun as number) || 4;

    yield createEvent.message(`Starting Tim Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    // Detect runs
    const runs: { start: number; end: number }[] = [];
    for (let i = 0; i < n; i += MIN_RUN) {
      runs.push({ start: i, end: Math.min(i + MIN_RUN - 1, n - 1) });
    }

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n, highlight: false },
        { name: 'minRun', value: MIN_RUN, highlight: true },
        { name: 'runs', value: runs.length, highlight: true },
      ],
      `Dividing into ${runs.length} runs of size ${MIN_RUN}`
    );

    // Show runs visualization
    yield createEvent.auxiliary({
      type: 'runs',
      phase: 'Detecting Runs',
      runData: {
        runs: [...runs],
        currentRun: undefined,
        phase: 'detecting',
      },
    });

    // Sort each run using insertion sort
    yield createEvent.message('Phase 1: Sorting runs with Insertion Sort');
    yield createEvent.highlight([4, 5]);

    for (let runIdx = 0; runIdx < runs.length; runIdx++) {
      const { start, end } = runs[runIdx];

      yield createEvent.auxiliary({
        type: 'runs',
        phase: `Sorting run ${runIdx + 1}`,
        runData: {
          runs: [...runs],
          currentRun: runIdx,
          phase: 'sorting',
        },
      });

      yield createEvent.pointer(
        [
          { index: start, label: 'run', color: 'var(--color-accent-current)' },
        ],
        [
          { name: 'runStart', value: start, highlight: true },
          { name: 'runEnd', value: end, highlight: true },
        ],
        `Sorting run [${start}..${end}]`
      );

      // Insertion sort for this run
      for (let i = start + 1; i <= end; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= start && arr[j] > key) {
          arr[j + 1] = arr[j];
          yield createEvent.swap([j, j + 1]);
          j--;
        }
        arr[j + 1] = key;
      }
    }

    // Merge runs
    yield createEvent.message('Phase 2: Merging runs');
    yield createEvent.highlight([8, 9, 10]);

    yield createEvent.auxiliary({
      type: 'runs',
      phase: 'Merging Runs',
      runData: {
        runs: [...runs],
        currentRun: undefined,
        phase: 'merging',
      },
    });

    for (let size = MIN_RUN; size < n; size *= 2) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = Math.min(left + size - 1, n - 1);
        const right = Math.min(left + 2 * size - 1, n - 1);

        if (mid < right) {
          yield createEvent.pointer(
            [
              { index: left, label: 'L', color: 'var(--color-accent-compare)' },
              { index: mid, label: 'M', color: 'var(--color-accent-pivot)' },
              { index: right, label: 'R', color: 'var(--color-accent-compare)' },
            ],
            [
              { name: 'size', value: size, highlight: true },
            ],
            `Merging [${left}..${mid}] and [${mid + 1}..${right}]`
          );

          // Merge
          const leftArr = arr.slice(left, mid + 1);
          const rightArr = arr.slice(mid + 1, right + 1);
          let i = 0, j = 0, k = left;

          while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
              arr[k] = leftArr[i];
              i++;
            } else {
              arr[k] = rightArr[j];
              j++;
            }
            yield createEvent.set(k, arr[k]);
            k++;
          }

          while (i < leftArr.length) {
            arr[k] = leftArr[i];
            yield createEvent.set(k, arr[k]);
            i++;
            k++;
          }

          while (j < rightArr.length) {
            arr[k] = rightArr[j];
            yield createEvent.set(k, arr[k]);
            j++;
            k++;
          }
        }
      }
    }

    // Clear runs view
    yield createEvent.auxiliary({
      type: 'runs',
      phase: 'Complete',
      runData: { runs: [], currentRun: undefined, phase: 'merging' },
    });

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([12]);
  },
};
