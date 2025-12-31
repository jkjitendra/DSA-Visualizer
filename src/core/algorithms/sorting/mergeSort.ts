import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Merge Sort Algorithm
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * Divide-and-conquer: split, sort halves, merge.
 */
export const mergeSort: IAlgorithm<ArrayInput> = {
  id: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function mergeSort(arr, left, right):',
    '  if left < right:',
    '    mid = (left + right) / 2',
    '    mergeSort(arr, left, mid)',
    '    mergeSort(arr, mid + 1, right)',
    '    merge(arr, left, mid, right)',
    '',
    'function merge(arr, left, mid, right):',
    '  leftArr = arr[left..mid]',
    '  rightArr = arr[mid+1..right]',
    '  i = j = 0, k = left',
    '',
    '  while i < len(leftArr) AND j < len(rightArr):',
    '    if leftArr[i] <= rightArr[j]:',
    '      arr[k++] = leftArr[i++]',
    '    else:',
    '      arr[k++] = rightArr[j++]',
    '',
    '  // Copy remaining elements',
    '  while i < len(leftArr): arr[k++] = leftArr[i++]',
    '  while j < len(rightArr): arr[k++] = rightArr[j++]',
  ],

  timeComplexity: {
    best: 'O(n log n)',
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

    yield createEvent.message(`Starting Merge Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      [{ name: 'n', value: n, highlight: true }],
      `Array has ${n} elements, will merge in passes`
    );

    // Iterative merge sort for visualization
    for (let size = 1; size < n; size *= 2) {
      yield createEvent.message(`Merge size = ${size}`);

      for (let left = 0; left < n - 1; left += 2 * size) {
        const mid = Math.min(left + size - 1, n - 1);
        const right = Math.min(left + 2 * size - 1, n - 1);

        yield createEvent.pointer(
          [
            { index: left, label: 'L', color: 'var(--color-accent-compare)' },
            { index: mid, label: 'M', color: 'var(--color-accent-pivot)' },
            { index: right, label: 'R', color: 'var(--color-accent-compare)' },
          ],
          [
            { name: 'left', value: left, highlight: false },
            { name: 'mid', value: mid, highlight: false },
            { name: 'right', value: right, highlight: false },
            { name: 'size', value: size, highlight: true },
          ],
          `Merging [${left}..${mid}] and [${mid + 1}..${right}]`
        );

        // Merge arr[left..mid] and arr[mid+1..right]
        yield* merge(arr, left, mid, right);
      }
    }

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    // Clear merge view
    yield createEvent.auxiliary({
      type: 'merge',
      phase: 'Complete',
      mergeData: { leftArr: [], rightArr: [], leftIdx: 0, rightIdx: 0, leftStart: 0, rightStart: 0 },
    });

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([7]);
  },
};

function* merge(arr: number[], left: number, mid: number, right: number): Generator<AlgoEvent, void, unknown> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  yield createEvent.highlight([6, 7, 8]);
  yield createEvent.message(`Merging: left[${leftArr}] + right[${rightArr}]`);

  // Show initial merge state
  yield createEvent.auxiliary({
    type: 'merge',
    phase: 'Merging',
    mergeData: {
      leftArr: [...leftArr],
      rightArr: [...rightArr],
      leftIdx: i,
      rightIdx: j,
      leftStart: left,
      rightStart: mid + 1,
    },
  });

  while (i < leftArr.length && j < rightArr.length) {
    yield createEvent.highlight([11, 12, 13, 14, 15]);
    yield createEvent.compare([left + i, mid + 1 + j]);

    // Update merge view
    yield createEvent.auxiliary({
      type: 'merge',
      phase: `Comparing ${leftArr[i]} vs ${rightArr[j]}`,
      mergeData: {
        leftArr: [...leftArr],
        rightArr: [...rightArr],
        leftIdx: i,
        rightIdx: j,
        leftStart: left,
        rightStart: mid + 1,
      },
    });

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      yield createEvent.pointer(
        [{ index: k, label: '←L', color: 'var(--color-accent-compare)' }],
        [
          { name: 'leftArr[i]', value: leftArr[i], highlight: true },
          { name: 'rightArr[j]', value: rightArr[j], highlight: false },
        ],
        `${leftArr[i]} <= ${rightArr[j]}, pick left`
      );
      i++;
    } else {
      arr[k] = rightArr[j];
      yield createEvent.pointer(
        [{ index: k, label: '←R', color: 'var(--color-accent-swap)' }],
        [
          { name: 'leftArr[i]', value: leftArr[i], highlight: false },
          { name: 'rightArr[j]', value: rightArr[j], highlight: true },
        ],
        `${leftArr[i]} > ${rightArr[j]}, pick right`
      );
      j++;
    }

    yield createEvent.set(k, arr[k]);
    k++;
  }

  // Copy remaining
  yield createEvent.highlight([17]);
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    yield createEvent.set(k, arr[k]);

    yield createEvent.auxiliary({
      type: 'merge',
      phase: 'Copying remaining left',
      mergeData: {
        leftArr: [...leftArr],
        rightArr: [...rightArr],
        leftIdx: i,
        rightIdx: j,
        leftStart: left,
        rightStart: mid + 1,
      },
    });

    i++;
    k++;
  }

  yield createEvent.highlight([18]);
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    yield createEvent.set(k, arr[k]);

    yield createEvent.auxiliary({
      type: 'merge',
      phase: 'Copying remaining right',
      mergeData: {
        leftArr: [...leftArr],
        rightArr: [...rightArr],
        leftIdx: i,
        rightIdx: j,
        leftStart: left,
        rightStart: mid + 1,
      },
    });

    j++;
    k++;
  }
}
