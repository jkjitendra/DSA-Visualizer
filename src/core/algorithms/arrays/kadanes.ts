import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Kadane's Algorithm (Maximum Subarray Sum)
 * 
 * Find the contiguous subarray with the largest sum.
 * Uses dynamic programming approach tracking current and max sum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const kadanes: IAlgorithm<ArrayInput> = {
  id: 'kadanes',
  name: "Kadane's Algorithm",
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    "function kadanes(arr):",
    "  maxSum = currentSum = arr[0]",
    "  start = end = tempStart = 0",
    "",
    "  for i = 1 to n - 1:",
    "    // Decide: extend current subarray or start new",
    "    if arr[i] > currentSum + arr[i]:",
    "      currentSum = arr[i]",
    "      tempStart = i",
    "    else:",
    "      currentSum = currentSum + arr[i]",
    "",
    "    // Update max if current is better",
    "    if currentSum > maxSum:",
    "      maxSum = currentSum",
    "      start = tempStart",
    "      end = i",
    "",
    "  return maxSum, start, end",
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 1) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'Array size must be 20 or less for visualization' };
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
      `Kadane's Algorithm: Find maximum subarray sum`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1)`,
      'info'
    );

    // Initialize
    yield createEvent.highlight([0, 1, 2]);
    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    yield createEvent.pointer(
      [{ index: 0, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'currentSum', value: currentSum, highlight: true },
        { name: 'maxSum', value: maxSum },
        { name: 'start', value: start },
        { name: 'end', value: end },
      ]
    );
    yield createEvent.message(
      `Initialize: maxSum = currentSum = arr[0] = ${arr[0]}`,
      'explanation'
    );
    yield createEvent.mark([0], 'current');

    // Main loop
    for (let i = 1; i < n; i++) {
      yield createEvent.highlight([4]);

      // Clear previous marks except the current best subarray
      for (let j = 0; j < n; j++) {
        yield createEvent.unmark([j]);
      }

      // Mark current max subarray
      for (let j = start; j <= end; j++) {
        yield createEvent.mark([j], 'sorted');
      }
      yield createEvent.mark([i], 'current');

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'currentSum', value: currentSum },
          { name: 'maxSum', value: maxSum },
        ]
      );

      // Decide: start new or extend
      yield createEvent.highlight([5, 6, 7, 8, 9, 10]);

      if (arr[i] > currentSum + arr[i]) {
        yield createEvent.message(
          `${arr[i]} > ${currentSum} + ${arr[i]} = ${currentSum + arr[i]}? YES → Start new subarray`,
          'explanation'
        );
        currentSum = arr[i];
        tempStart = i;
        yield createEvent.highlight([7, 8]);
      } else {
        yield createEvent.message(
          `${arr[i]} > ${currentSum} + ${arr[i]} = ${currentSum + arr[i]}? NO → Extend subarray`,
          'explanation'
        );
        currentSum = currentSum + arr[i];
        yield createEvent.highlight([9, 10]);
      }

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'currentSum', value: currentSum, highlight: true },
          { name: 'maxSum', value: maxSum },
          { name: 'tempStart', value: tempStart },
        ],
        `currentSum = ${currentSum}`
      );

      // Update max if needed
      yield createEvent.highlight([12, 13, 14, 15, 16]);

      if (currentSum > maxSum) {
        yield createEvent.message(
          `currentSum ${currentSum} > maxSum ${maxSum}? YES → Update max!`,
          'step'
        );
        maxSum = currentSum;
        start = tempStart;
        end = i;

        // Clear and re-mark
        for (let j = 0; j < n; j++) {
          yield createEvent.unmark([j]);
        }
        for (let j = start; j <= end; j++) {
          yield createEvent.mark([j], 'sorted');
        }
      } else {
        yield createEvent.message(
          `currentSum ${currentSum} > maxSum ${maxSum}? NO → Keep current max`,
          'explanation'
        );
      }

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'currentSum', value: currentSum },
          { name: 'maxSum', value: maxSum, highlight: true },
          { name: 'start', value: start },
          { name: 'end', value: end },
        ]
      );
    }

    // Final result
    yield createEvent.highlight([18]);

    // Clear all and mark final subarray
    for (let j = 0; j < n; j++) {
      yield createEvent.unmark([j]);
    }
    for (let j = start; j <= end; j++) {
      yield createEvent.mark([j], 'sorted');
    }

    const subarray = arr.slice(start, end + 1);
    yield createEvent.pointer([], []);
    yield createEvent.message(
      `Maximum Subarray Sum = ${maxSum}`,
      'info'
    );
    yield createEvent.message(
      `Subarray: [${subarray.join(', ')}] at indices [${start}..${end}]`,
      'explanation'
    );
  },
};
