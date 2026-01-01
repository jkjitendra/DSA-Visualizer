import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Merge Two Sorted Arrays
 * 
 * Merge two sorted arrays into a single sorted array.
 * Uses two pointers to compare and merge.
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 */
export const mergeSortedArrays: IAlgorithm<ArrayInput> = {
  id: 'merge-sorted-arrays',
  name: 'Merge Sorted Arrays',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function mergeSorted(arr1, arr2):',
    '  result = []',
    '  i = 0, j = 0',
    '',
    '  while i < len(arr1) AND j < len(arr2):',
    '    if arr1[i] <= arr2[j]:',
    '      result.append(arr1[i])',
    '      i++',
    '    else:',
    '      result.append(arr2[j])',
    '      j++',
    '',
    '  // Append remaining elements',
    '  while i < len(arr1):',
    '    result.append(arr1[i++])',
    '  while j < len(arr2):',
    '    result.append(arr2[j++])',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n + m)',
  },

  spaceComplexity: 'O(n + m)',

  parameters: [
    {
      type: 'number',
      id: 'splitPoint',
      label: 'Split Point (divide input into two arrays)',
      default: 3,
      min: 1,
      max: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    if (input.values.length > 16) {
      return { ok: false, error: 'Array size must be 16 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    // Split array into two parts and sort each
    const splitPoint = Math.min(Math.max((params?.splitPoint || 3) as number, 1), n - 1);
    const arr1 = arr.slice(0, splitPoint).sort((a, b) => a - b);
    const arr2 = arr.slice(splitPoint).sort((a, b) => a - b);

    yield createEvent.message(
      `Merge Two Sorted Arrays`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n+m) | Space: O(n+m)`,
      'info'
    );

    yield createEvent.message(
      `Array 1: [${arr1.join(', ')}] (sorted)`,
      'explanation'
    );
    yield createEvent.message(
      `Array 2: [${arr2.join(', ')}] (sorted)`,
      'explanation'
    );

    // Show the split in main array
    for (let i = 0; i < splitPoint; i++) {
      yield createEvent.set(i, arr1[i], arr[i]);
      yield createEvent.mark([i], 'window');
    }
    for (let i = splitPoint; i < n; i++) {
      yield createEvent.set(i, arr2[i - splitPoint], arr[i]);
      yield createEvent.mark([i], 'selected');
    }

    // Show auxiliary state with both arrays
    yield createEvent.auxiliary({
      type: 'merge',
      phase: 'Merging',
      mergeData: {
        leftArr: arr1,
        rightArr: arr2,
        leftIdx: 0,
        rightIdx: 0,
        leftStart: 0,
        rightStart: splitPoint,
      },
    });

    // Initialize pointers
    yield createEvent.highlight([0, 1, 2]);
    let i = 0;
    let j = 0;
    const result: number[] = [];

    yield createEvent.pointer(
      [
        { index: 0, label: 'i', color: 'var(--color-primary-500)' },
        { index: splitPoint, label: 'j', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'i', value: i },
        { name: 'j', value: j },
        { name: 'result.length', value: 0 },
      ]
    );

    // Main merge loop
    while (i < arr1.length && j < arr2.length) {
      yield createEvent.highlight([4, 5]);

      yield createEvent.pointer(
        [
          { index: i, label: 'i', color: 'var(--color-primary-500)' },
          { index: splitPoint + j, label: 'j', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'arr1[i]', value: arr1[i], highlight: true },
          { name: 'arr2[j]', value: arr2[j], highlight: true },
          { name: 'result', value: `[${result.join(', ')}]` },
        ],
        `${arr1[i]} vs ${arr2[j]}`
      );

      yield createEvent.compare([i, splitPoint + j], arr1[i] <= arr2[j] ? 'lt' : 'gt');

      if (arr1[i] <= arr2[j]) {
        yield createEvent.highlight([5, 6, 7]);
        result.push(arr1[i]);
        yield createEvent.message(
          `${arr1[i]} <= ${arr2[j]} → Take ${arr1[i]} from arr1`,
          'explanation'
        );
        yield createEvent.mark([i], 'sorted');
        i++;
      } else {
        yield createEvent.highlight([8, 9, 10]);
        result.push(arr2[j]);
        yield createEvent.message(
          `${arr1[i - 1] !== undefined ? arr1[i] : arr1[i]} > ${arr2[j]} → Take ${arr2[j]} from arr2`,
          'explanation'
        );
        yield createEvent.mark([splitPoint + j], 'sorted');
        j++;
      }

      // Update auxiliary
      yield createEvent.auxiliary({
        type: 'merge',
        phase: `Result: [${result.join(', ')}]`,
        mergeData: {
          leftArr: arr1,
          rightArr: arr2,
          leftIdx: i,
          rightIdx: j,
          leftStart: 0,
          rightStart: splitPoint,
        },
      });
    }

    // Append remaining from arr1
    yield createEvent.highlight([12, 13, 14]);
    while (i < arr1.length) {
      yield createEvent.message(
        `Append remaining arr1[${i}] = ${arr1[i]}`,
        'explanation'
      );
      result.push(arr1[i]);
      yield createEvent.mark([i], 'sorted');
      i++;
    }

    // Append remaining from arr2
    yield createEvent.highlight([15, 16]);
    while (j < arr2.length) {
      yield createEvent.message(
        `Append remaining arr2[${j}] = ${arr2[j]}`,
        'explanation'
      );
      result.push(arr2[j]);
      yield createEvent.mark([splitPoint + j], 'sorted');
      j++;
    }

    // Update main array with result
    for (let k = 0; k < result.length; k++) {
      yield createEvent.set(k, result[k], arr[k]);
    }

    yield createEvent.highlight([18]);
    yield createEvent.pointer([], []);

    // Mark all as sorted
    for (let k = 0; k < n; k++) {
      yield createEvent.unmark([k]);
      yield createEvent.mark([k], 'sorted');
    }

    yield createEvent.auxiliary({
      type: 'merge',
      phase: `Complete: [${result.join(', ')}]`,
      mergeData: {
        leftArr: [],
        rightArr: [],
        leftIdx: 0,
        rightIdx: 0,
        leftStart: 0,
        rightStart: 0,
      },
    });

    yield createEvent.message(
      `Merged array: [${result.join(', ')}]`,
      'info'
    );
  },
};
