import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Sliding Window Algorithm
 * 
 * Efficient pattern for finding subarrays/substrings meeting certain criteria.
 * Demo: Find maximum sum of subarray of size k.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const slidingWindow: IAlgorithm<ArrayInput> = {
  id: 'sliding-window',
  name: 'Sliding Window',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function maxSumSubarray(arr, k):',
    '  // Calculate sum of first window',
    '  windowSum = sum(arr[0...k-1])',
    '  maxSum = windowSum',
    '',
    '  // Slide the window',
    '  for i = k to n - 1:',
    '    // Add new element, remove old element',
    '    windowSum = windowSum + arr[i] - arr[i - k]',
    '    maxSum = max(maxSum, windowSum)',
    '',
    '  return maxSum',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'windowSize',
      label: 'Window Size (k)',
      default: 3,
      min: 1,
      max: 10,
    } as AlgorithmParameter,
  ],

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

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const k = Math.min((params?.windowSize || 3) as number, input.values.length);
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Sliding Window: Find max sum of subarray of size ${k}`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1)`,
      'info'
    );
    yield createEvent.highlight([0]);

    // Calculate sum of first window
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(
      `Step 1: Calculate sum of first window (indices 0 to ${k - 1})`,
      'step'
    );

    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'windowSum', value: windowSum },
        ]
      );
      yield createEvent.mark([i], 'current');
      windowSum += arr[i];
      yield createEvent.message(`Adding arr[${i}] = ${arr[i]}, windowSum = ${windowSum}`, 'explanation');
    }

    let maxSum = windowSum;
    let maxStart = 0;

    yield createEvent.highlight([3]);
    yield createEvent.message(`Initial window sum: ${windowSum}`, 'step');

    // Mark initial window
    for (let i = 0; i < k; i++) {
      yield createEvent.mark([i], 'selected');
    }

    yield createEvent.pointer(
      [
        { index: 0, label: 'start', color: 'var(--color-accent-sorted)' },
        { index: k - 1, label: 'end', color: 'var(--color-accent-sorted)' },
      ],
      [
        { name: 'windowSum', value: windowSum, highlight: true },
        { name: 'maxSum', value: maxSum },
      ]
    );

    // Slide the window
    yield createEvent.highlight([5, 6]);
    yield createEvent.message(`Step 2: Slide window across array`, 'step');

    for (let i = k; i < n; i++) {
      const windowStart = i - k + 1;
      const oldElement = arr[i - k];
      const newElement = arr[i];

      // Clear previous marks
      for (let j = 0; j < n; j++) {
        yield createEvent.unmark([j]);
      }

      yield createEvent.highlight([7, 8]);
      yield createEvent.pointer(
        [
          { index: i - k, label: 'remove', color: 'var(--color-accent-swap)' },
          { index: i, label: 'add', color: 'var(--color-accent-sorted)' },
        ],
        [
          { name: 'removing', value: oldElement },
          { name: 'adding', value: newElement, highlight: true },
          { name: 'windowSum', value: windowSum },
        ],
        `${windowSum} + ${newElement} - ${oldElement}`
      );

      windowSum = windowSum + newElement - oldElement;

      yield createEvent.message(
        `Window [${windowStart}..${i}]: Remove ${oldElement}, Add ${newElement} → Sum = ${windowSum}`,
        'explanation'
      );

      // Mark current window
      for (let j = windowStart; j <= i; j++) {
        yield createEvent.mark([j], 'selected');
      }

      yield createEvent.pointer(
        [
          { index: windowStart, label: 'start', color: 'var(--color-primary-500)' },
          { index: i, label: 'end', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'windowSum', value: windowSum, highlight: true },
          { name: 'maxSum', value: maxSum },
        ]
      );

      if (windowSum > maxSum) {
        yield createEvent.highlight([9]);
        maxSum = windowSum;
        maxStart = windowStart;
        yield createEvent.message(
          `New maximum found: ${maxSum} at window [${windowStart}..${i}]`,
          'step'
        );
      }
    }

    // Highlight final best window
    for (let j = 0; j < n; j++) {
      yield createEvent.unmark([j]);
    }
    for (let j = maxStart; j < maxStart + k; j++) {
      yield createEvent.mark([j], 'sorted');
    }

    yield createEvent.highlight([11]);
    yield createEvent.pointer([], []);
    yield createEvent.message(
      `Maximum sum: ${maxSum} at indices [${maxStart}..${maxStart + k - 1}]`,
      'info'
    );
  },
};
