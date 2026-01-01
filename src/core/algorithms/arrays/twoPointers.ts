import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Two Pointers Algorithm
 * 
 * Classic pattern for solving array problems efficiently.
 * Demo: Find pair that sums to target in a sorted array.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const twoPointers: IAlgorithm<ArrayInput> = {
  id: 'two-pointers',
  name: 'Two Pointers',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function twoSum(arr, target):',
    '  left = 0',
    '  right = n - 1',
    '',
    '  while left < right:',
    '    sum = arr[left] + arr[right]',
    '',
    '    if sum == target:',
    '      return (left, right)  // Found!',
    '    else if sum < target:',
    '      left++  // Need larger sum',
    '    else:',
    '      right--  // Need smaller sum',
    '',
    '  return null  // Not found',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Sum',
      default: 10,
      min: 2,
      max: 200,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
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
    const target = (params?.target || 10) as number;

    // Sort array first (two pointers requires sorted array)
    const arr = [...input.values].sort((a, b) => a - b);
    const n = arr.length;

    yield createEvent.message(
      `Two Pointers: Find pair that sums to ${target}`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1)`,
      'info'
    );
    yield createEvent.highlight([0]);

    // Check if array was sorted - if not, update the visualization to show sorted array
    const wasSorted = JSON.stringify(input.values) === JSON.stringify(arr);
    if (!wasSorted) {
      yield createEvent.message(
        `Two Pointers requires a SORTED array. Sorting the input first...`,
        'step'
      );
      yield createEvent.message(
        `Original: [${input.values.join(', ')}] → Sorted: [${arr.join(', ')}]`,
        'explanation'
      );
      // Update the array state to show the sorted array
      for (let i = 0; i < n; i++) {
        yield createEvent.set(i, arr[i], input.values[i]);
      }
      yield createEvent.message(
        `Array is now sorted. Starting two-pointer search...`,
        'step'
      );
    }

    // Initialize pointers
    let left = 0;
    let right = n - 1;

    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [
        { index: left, label: 'left', color: 'var(--color-primary-500)' },
        { index: right, label: 'right', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'left', value: left },
        { name: 'right', value: right },
        { name: 'target', value: target },
      ]
    );

    while (left < right) {
      yield createEvent.highlight([4]);

      const sum = arr[left] + arr[right];

      yield createEvent.highlight([5]);
      yield createEvent.pointer(
        [
          { index: left, label: 'left', color: 'var(--color-primary-500)' },
          { index: right, label: 'right', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'left', value: left },
          { name: 'right', value: right },
          { name: 'arr[left]', value: arr[left], highlight: true },
          { name: 'arr[right]', value: arr[right], highlight: true },
          { name: 'sum', value: sum, highlight: true },
          { name: 'target', value: target },
        ],
        `${arr[left]} + ${arr[right]} = ${sum}`
      );

      yield createEvent.compare([left, right], sum === target ? 'eq' : (sum < target ? 'lt' : 'gt'));

      if (sum === target) {
        yield createEvent.highlight([7, 8]);
        yield createEvent.mark([left], 'sorted');
        yield createEvent.mark([right], 'sorted');
        yield createEvent.message(
          `Found pair: arr[${left}]=${arr[left]} + arr[${right}]=${arr[right]} = ${target}`,
          'info'
        );
        yield createEvent.pointer([], []);
        return;
      } else if (sum < target) {
        yield createEvent.highlight([9, 10]);
        yield createEvent.message(
          `Sum ${sum} < target ${target}, move left pointer right`,
          'explanation'
        );
        left++;
      } else {
        yield createEvent.highlight([11, 12]);
        yield createEvent.message(
          `Sum ${sum} > target ${target}, move right pointer left`,
          'explanation'
        );
        right--;
      }
    }

    yield createEvent.highlight([14]);
    yield createEvent.pointer([], []);
    yield createEvent.message(
      `No pair found that sums to ${target}`,
      'info'
    );
  },
};
