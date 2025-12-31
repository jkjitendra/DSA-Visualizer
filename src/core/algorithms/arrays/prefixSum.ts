import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Prefix Sum Algorithm
 * 
 * Precompute cumulative sums to enable O(1) range sum queries.
 * 
 * Time Complexity: O(n) build, O(1) query
 * Space Complexity: O(n)
 */
export const prefixSum: IAlgorithm<ArrayInput> = {
  id: 'prefix-sum',
  name: 'Prefix Sum',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: [
    '// Phase 1: Build prefix sum array',
    'function buildPrefixSum(arr):',
    '  prefix[0] = arr[0]',
    '  for i = 1 to n - 1:',
    '    prefix[i] = prefix[i-1] + arr[i]',
    '',
    '// Phase 2: Range sum query O(1)',
    'function rangeSum(left, right):',
    '  if left == 0:',
    '    return prefix[right]',
    '  return prefix[right] - prefix[left - 1]',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'number',
      id: 'queryLeft',
      label: 'Query Left Index',
      default: 1,
      min: 0,
      max: 10,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'queryRight',
      label: 'Query Right Index',
      default: 4,
      min: 0,
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
    const queryLeft = Math.min((params?.queryLeft || 1) as number, n - 1);
    const queryRight = Math.min(Math.max((params?.queryRight || 4) as number, queryLeft), n - 1);

    yield createEvent.message(
      `Prefix Sum: Build O(n), Query O(1)`,
      'info',
      0
    );
    yield createEvent.message(
      `Space: O(n) for prefix array`,
      'info'
    );

    // Phase 1: Build prefix sum array
    yield createEvent.highlight([0, 1]);
    yield createEvent.message(
      `Phase 1: Build prefix sum array`,
      'step'
    );

    const prefix: number[] = new Array(n);

    // First element
    yield createEvent.highlight([2]);
    prefix[0] = arr[0];
    yield createEvent.pointer(
      [{ index: 0, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'arr[0]', value: arr[0], highlight: true },
        { name: 'prefix[0]', value: prefix[0] },
      ]
    );
    yield createEvent.message(`prefix[0] = arr[0] = ${arr[0]}`, 'explanation');

    // Show auxiliary array
    yield createEvent.auxiliary({
      type: 'count',
      phase: 'Building prefix sum',
      countArray: [{ index: 0, count: prefix[0], highlight: true }],
    });

    // Build rest of prefix array
    for (let i = 1; i < n; i++) {
      yield createEvent.highlight([3, 4]);
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'prefix[i-1]', value: prefix[i - 1] },
        ],
        `${prefix[i - 1]} + ${arr[i]}`
      );

      prefix[i] = prefix[i - 1] + arr[i];

      yield createEvent.message(
        `prefix[${i}] = prefix[${i - 1}] + arr[${i}] = ${prefix[i - 1]} + ${arr[i]} = ${prefix[i]}`,
        'explanation'
      );

      // Update auxiliary display
      const countArray = prefix.slice(0, i + 1).map((val, idx) => ({
        index: idx,
        count: val,
        highlight: idx === i,
      }));
      yield createEvent.auxiliary({
        type: 'count',
        phase: 'Building prefix sum',
        countArray,
      });
    }

    yield createEvent.mark([...Array(n).keys()], 'sorted');
    yield createEvent.message(`Prefix sum array built!`, 'step');

    // Show complete prefix array
    const finalCountArray = prefix.map((val, idx) => ({
      index: idx,
      count: val,
    }));
    yield createEvent.auxiliary({
      type: 'count',
      phase: 'Prefix sum complete',
      countArray: finalCountArray,
    });

    // Phase 2: Range sum query
    yield createEvent.highlight([6, 7]);
    yield createEvent.message(
      `Phase 2: Range sum query [${queryLeft}..${queryRight}]`,
      'step'
    );

    // Clear marks
    for (let i = 0; i < n; i++) {
      yield createEvent.unmark([i]);
    }

    // Highlight query range
    for (let i = queryLeft; i <= queryRight; i++) {
      yield createEvent.mark([i], 'selected');
    }

    let rangeSum: number;
    if (queryLeft === 0) {
      yield createEvent.highlight([8, 9]);
      rangeSum = prefix[queryRight];
      yield createEvent.pointer(
        [{ index: queryRight, label: 'right', color: 'var(--color-secondary-500)' }],
        [
          { name: 'left', value: queryLeft },
          { name: 'right', value: queryRight },
          { name: 'prefix[right]', value: prefix[queryRight], highlight: true },
        ]
      );
      yield createEvent.message(
        `left=0, so rangeSum = prefix[${queryRight}] = ${rangeSum}`,
        'explanation'
      );
    } else {
      yield createEvent.highlight([10]);
      rangeSum = prefix[queryRight] - prefix[queryLeft - 1];
      yield createEvent.pointer(
        [
          { index: queryLeft, label: 'left', color: 'var(--color-primary-500)' },
          { index: queryRight, label: 'right', color: 'var(--color-secondary-500)' },
        ],
        [
          { name: 'prefix[right]', value: prefix[queryRight] },
          { name: 'prefix[left-1]', value: prefix[queryLeft - 1] },
          { name: 'rangeSum', value: rangeSum, highlight: true },
        ],
        `${prefix[queryRight]} - ${prefix[queryLeft - 1]}`
      );
      yield createEvent.message(
        `rangeSum = prefix[${queryRight}] - prefix[${queryLeft - 1}] = ${prefix[queryRight]} - ${prefix[queryLeft - 1]} = ${rangeSum}`,
        'explanation'
      );
    }

    // Highlight result in auxiliary
    const queryCountArray = prefix.map((val, idx) => ({
      index: idx,
      count: val,
      highlight: idx === queryRight || idx === queryLeft - 1,
    }));
    yield createEvent.auxiliary({
      type: 'count',
      phase: 'Query complete',
      countArray: queryCountArray,
    });

    // Final result
    for (let i = queryLeft; i <= queryRight; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], []);
    yield createEvent.message(
      `Sum of arr[${queryLeft}..${queryRight}] = ${rangeSum} ✓`,
      'info'
    );
  },
};
