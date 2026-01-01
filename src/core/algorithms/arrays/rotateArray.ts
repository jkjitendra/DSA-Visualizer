import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Rotate Array
 * 
 * Rotate array by k positions using the reversal algorithm.
 * Efficient O(n) time and O(1) space solution.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const rotateArray: IAlgorithm<ArrayInput> = {
  id: 'rotate-array',
  name: 'Rotate Array',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function rotate(arr, k, direction):',
    '  k = k % n  // Handle k > n',
    '',
    '  // Reversal algorithm (for right rotation):',
    '  // Step 1: Reverse entire array',
    '  reverse(arr, 0, n-1)',
    '',
    '  // Step 2: Reverse first k elements',
    '  reverse(arr, 0, k-1)',
    '',
    '  // Step 3: Reverse remaining elements',
    '  reverse(arr, k, n-1)',
    '',
    'function reverse(arr, start, end):',
    '  while start < end:',
    '    swap(arr[start], arr[end])',
    '    start++, end--',
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
      id: 'k',
      label: 'Rotation Count (k)',
      default: 2,
      min: 1,
      max: 10,
    } as AlgorithmParameter,
    {
      type: 'select',
      id: 'direction',
      label: 'Direction',
      default: 'right',
      options: [
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
      ],
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    if (input.values.length > 15) {
      return { ok: false, error: 'Array size must be 15 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    let k = ((params?.k || 2) as number) % n;
    const direction = (params?.direction || 'right') as string;

    // For left rotation, convert to equivalent right rotation
    if (direction === 'left') {
      k = n - k;
    }

    yield createEvent.message(
      `Rotate Array ${direction} by ${params?.k || 2} positions`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1) using reversal algorithm`,
      'info'
    );

    if (k === 0) {
      yield createEvent.message(
        `k % n = 0, array unchanged`,
        'info'
      );
      for (let i = 0; i < n; i++) {
        yield createEvent.mark([i], 'sorted');
      }
      return;
    }

    yield createEvent.highlight([0, 1]);
    yield createEvent.message(
      `Effective k = ${k} (after mod n)`,
      'explanation'
    );

    // Helper generator for reverse
    function* reverse(
      arr: number[],
      start: number,
      end: number,
      stepLabel: string
    ): Generator<AlgoEvent, void, unknown> {
      yield createEvent.message(
        `${stepLabel}: Reverse arr[${start}..${end}]`,
        'step'
      );

      while (start < end) {
        yield createEvent.pointer(
          [
            { index: start, label: 'start', color: 'var(--color-primary-500)' },
            { index: end, label: 'end', color: 'var(--color-secondary-500)' },
          ],
          [
            { name: 'arr[start]', value: arr[start], highlight: true },
            { name: 'arr[end]', value: arr[end], highlight: true },
          ],
          `swap ${arr[start]} ↔ ${arr[end]}`
        );

        yield createEvent.compare([start, end], 'eq');

        // Swap
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        yield createEvent.swap([start, end]);

        // Update visualization
        yield createEvent.set(start, arr[start], temp);
        yield createEvent.set(end, arr[end], arr[start]);

        start++;
        end--;
      }
    }

    // Step 1: Reverse entire array
    yield createEvent.highlight([3, 4, 5]);
    yield* reverse(arr, 0, n - 1, 'Step 1');

    // Show intermediate state
    yield createEvent.message(
      `After full reverse: [${arr.join(', ')}]`,
      'explanation'
    );

    // Step 2: Reverse first k elements
    yield createEvent.highlight([6, 7, 8]);
    yield* reverse(arr, 0, k - 1, 'Step 2');

    yield createEvent.message(
      `After reversing [0..${k - 1}]: [${arr.join(', ')}]`,
      'explanation'
    );

    // Step 3: Reverse remaining elements
    yield createEvent.highlight([9, 10, 11]);
    yield* reverse(arr, k, n - 1, 'Step 3');

    yield createEvent.message(
      `After reversing [${k}..${n - 1}]: [${arr.join(', ')}]`,
      'explanation'
    );

    // Mark all as sorted
    yield createEvent.pointer([], []);
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.message(
      `Rotated ${direction} by ${params?.k || 2}: [${arr.join(', ')}]`,
      'info'
    );
  },
};
