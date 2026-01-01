import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Next Permutation
 * 
 * Find the next lexicographically greater permutation.
 * If already largest, wrap to smallest (sorted).
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const nextPermutation: IAlgorithm<ArrayInput> = {
  id: 'next-permutation',
  name: 'Next Permutation',
  category: 'arrays',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function nextPermutation(arr):',
    '  // Step 1: Find rightmost ascending pair',
    '  i = n - 2',
    '  while i >= 0 AND arr[i] >= arr[i+1]:',
    '    i--',
    '',
    '  if i >= 0:  // Found pivot',
    '    // Step 2: Find rightmost element > pivot',
    '    j = n - 1',
    '    while arr[j] <= arr[i]:',
    '      j--',
    '    // Step 3: Swap pivot with element',
    '    swap(arr[i], arr[j])',
    '',
    '  // Step 4: Reverse suffix after pivot',
    '  reverse(arr, i+1, n-1)',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'Array size must be 12 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Next Permutation: Find next lexicographically greater arrangement`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1)`,
      'info'
    );
    yield createEvent.message(
      `Input: [${arr.join(', ')}]`,
      'explanation'
    );

    // Step 1: Find rightmost ascending pair
    yield createEvent.highlight([1, 2, 3, 4]);
    yield createEvent.message(
      `Step 1: Find rightmost position where arr[i] < arr[i+1]`,
      'step'
    );

    let i = n - 2;
    while (i >= 0) {
      yield createEvent.pointer(
        [
          { index: i, label: 'i', color: 'var(--color-primary-500)' },
          { index: i + 1, label: 'i+1', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'arr[i+1]', value: arr[i + 1], highlight: true },
        ],
        `${arr[i]} >= ${arr[i + 1]}?`
      );

      yield createEvent.compare([i, i + 1], arr[i] >= arr[i + 1] ? 'gt' : 'lt');

      if (arr[i] < arr[i + 1]) {
        yield createEvent.message(
          `Found pivot! arr[${i}]=${arr[i]} < arr[${i + 1}]=${arr[i + 1]}`,
          'step'
        );
        yield createEvent.mark([i], 'pivot');
        break;
      }

      yield createEvent.message(
        `arr[${i}]=${arr[i]} >= arr[${i + 1}]=${arr[i + 1]}, continue left`,
        'explanation'
      );
      i--;
    }

    if (i < 0) {
      // Array is in descending order, reverse to get smallest
      yield createEvent.highlight([6]);
      yield createEvent.message(
        `No pivot found! Array is largest permutation. Reversing to get smallest.`,
        'step'
      );
    } else {
      // Step 2: Find rightmost element greater than pivot
      yield createEvent.highlight([6, 7, 8, 9, 10]);
      yield createEvent.message(
        `Step 2: Find rightmost element > arr[${i}]=${arr[i]}`,
        'step'
      );

      let j = n - 1;
      while (arr[j] <= arr[i]) {
        yield createEvent.pointer(
          [
            { index: i, label: 'pivot', color: 'var(--color-primary-500)' },
            { index: j, label: 'j', color: 'var(--color-secondary-500)' },
          ],
          [
            { name: 'arr[pivot]', value: arr[i] },
            { name: 'arr[j]', value: arr[j], highlight: true },
          ]
        );

        yield createEvent.message(
          `arr[${j}]=${arr[j]} <= arr[${i}]=${arr[i]}, continue left`,
          'explanation'
        );
        j--;
      }

      yield createEvent.message(
        `Found! arr[${j}]=${arr[j]} > arr[${i}]=${arr[i]}`,
        'step'
      );
      yield createEvent.mark([j], 'selected');

      // Step 3: Swap pivot with j
      yield createEvent.highlight([11, 12]);
      yield createEvent.message(
        `Step 3: Swap arr[${i}]=${arr[i]} with arr[${j}]=${arr[j]}`,
        'step'
      );

      yield createEvent.pointer(
        [
          { index: i, label: 'pivot', color: 'var(--color-primary-500)' },
          { index: j, label: 'j', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'arr[j]', value: arr[j], highlight: true },
        ],
        `swap ${arr[i]} ↔ ${arr[j]}`
      );

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      yield createEvent.swap([i, j]);

      yield createEvent.message(
        `After swap: [${arr.join(', ')}]`,
        'explanation'
      );
    }

    // Clear marks before reversing
    for (let k = 0; k < n; k++) {
      yield createEvent.unmark([k]);
    }

    // Step 4: Reverse suffix after pivot
    yield createEvent.highlight([14, 15]);
    const reverseStart = i + 1;
    yield createEvent.message(
      `Step 4: Reverse suffix arr[${reverseStart}..${n - 1}]`,
      'step'
    );

    // Mark the suffix to be reversed
    for (let k = reverseStart; k < n; k++) {
      yield createEvent.mark([k], 'window');
    }

    let left = reverseStart;
    let right = n - 1;

    while (left < right) {
      yield createEvent.pointer(
        [
          { index: left, label: 'left', color: 'var(--color-primary-500)' },
          { index: right, label: 'right', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'arr[left]', value: arr[left], highlight: true },
          { name: 'arr[right]', value: arr[right], highlight: true },
        ],
        `swap ${arr[left]} ↔ ${arr[right]}`
      );

      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      yield createEvent.swap([left, right]);

      left++;
      right--;
    }

    // Final result
    yield createEvent.pointer([], []);

    // Clear all marks
    for (let k = 0; k < n; k++) {
      yield createEvent.unmark([k]);
    }

    // Mark all as sorted
    for (let k = 0; k < n; k++) {
      yield createEvent.mark([k], 'sorted');
    }

    yield createEvent.message(
      `Next permutation: [${arr.join(', ')}]`,
      'info'
    );

    // Show comparison
    yield createEvent.message(
      `Original: [${input.values.join(', ')}] → Next: [${arr.join(', ')}]`,
      'explanation'
    );
  },
};
