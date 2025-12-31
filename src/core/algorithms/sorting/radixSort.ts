import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BucketData } from '../../events/events';

/**
 * Radix Sort Algorithm (LSD - Least Significant Digit)
 * 
 * Time Complexity: O(d × (n + k))
 * Space Complexity: O(n + k)
 * 
 * Non-comparison sort that sorts digit by digit.
 */
export const radixSort: IAlgorithm<ArrayInput> = {
  id: 'radix-sort',
  name: 'Radix Sort',
  category: 'sorting',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function radixSort(arr, n):',
    '  max = getMax(arr)          // Find maximum value',
    '',
    '  // Sort by each digit (1s, 10s, 100s...)',
    '  for exp = 1 while max/exp > 0:',
    '    countingSortByDigit(arr, n, exp)',
    '    exp = exp * 10',
    '',
    'function countingSortByDigit(arr, n, exp):',
    '  output = new array[n]',
    '  count = new array[10] = {0}  // Digits 0-9',
    '',
    '  // Count occurrences of each digit',
    '  for i = 0 to n - 1:',
    '    digit = (arr[i] / exp) % 10',
    '    count[digit]++',
    '',
    '  // Cumulative count (positions)',
    '  for i = 1 to 9:',
    '    count[i] += count[i - 1]',
    '',
    '  // Build output array (stable: right to left)',
    '  for i = n - 1 down to 0:',
    '    digit = (arr[i] / exp) % 10',
    '    output[count[digit] - 1] = arr[i]',
    '    count[digit]--',
    '',
    '  // Copy output back to arr',
    '  copy output to arr',
  ],

  timeComplexity: {
    best: 'O(d(n+k))',
    average: 'O(d(n+k))',
    worst: 'O(d(n+k))',
  },

  spaceComplexity: 'O(n + k)',

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
    if (!input.values.every((v) => typeof v === 'number' && Number.isInteger(v) && v >= 0)) {
      return { ok: false, error: 'Radix Sort requires non-negative integers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Starting Radix Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    const max = Math.max(...arr);
    const maxDigits = max === 0 ? 1 : Math.floor(Math.log10(max)) + 1;

    yield createEvent.pointer(
      [],
      [
        { name: 'max', value: max, highlight: true },
        { name: 'digits', value: maxDigits, highlight: true },
      ],
      `Max = ${max}, need ${maxDigits} digit passes`
    );

    // Process each digit position
    let digitPosition = 1;
    for (let exp = 1; Math.floor(max / exp) > 0 || exp === 1; exp *= 10) {
      // Create EMPTY buckets for this digit pass
      const buckets: BucketData[] = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        label: String(i),
        values: [],
        highlight: false,
      }));

      yield createEvent.message(`Digit ${digitPosition}: Distributing by ${exp === 1 ? "ones" : exp === 10 ? "tens" : "hundreds"} place`);
      yield createEvent.highlight([2, 3]);

      // Show empty buckets first
      yield createEvent.auxiliary({
        type: 'buckets',
        phase: 'Distribution',
        currentDigit: digitPosition,
        maxDigit: maxDigits,
        buckets: buckets.map(b => ({ ...b, values: [...b.values] })), // Deep copy values array
      });

      // Distribution phase - place elements ONE BY ONE
      for (let i = 0; i < n; i++) {
        const digitVal = Math.floor(arr[i] / exp) % 10;

        // Add this element to its bucket
        buckets[digitVal].values.push(arr[i]);

        yield createEvent.visit(i);
        yield createEvent.pointer(
          [{ index: i, label: String(digitVal), color: 'var(--color-accent-compare)' }],
          [
            { name: 'value', value: arr[i], highlight: true },
            { name: 'digit', value: digitVal, highlight: true },
          ],
          `${arr[i]} → bucket ${digitVal}`
        );

        // Show updated buckets with current bucket highlighted
        yield createEvent.auxiliary({
          type: 'buckets',
          phase: 'Distribution',
          currentDigit: digitPosition,
          maxDigit: maxDigits,
          buckets: buckets.map((b, idx) => ({
            ...b,
            values: [...b.values], // Create copy
            highlight: idx === digitVal,
          })),
        });
      }

      // Collection phase
      yield createEvent.message(`Digit ${digitPosition}: Collecting from buckets`);
      yield createEvent.auxiliary({
        type: 'buckets',
        phase: 'Collection',
        currentDigit: digitPosition,
        maxDigit: maxDigits,
        buckets: buckets.map(b => ({ ...b, values: [...b.values] })),
      });

      let idx = 0;
      for (let b = 0; b < 10; b++) {
        for (const val of buckets[b].values) {
          arr[idx] = val;
          yield createEvent.set(idx, val);
          idx++;
        }
      }

      digitPosition++;
      if (exp * 10 > max) break;
    }

    // Clear auxiliary and mark sorted
    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Complete',
      buckets: [],
    });

    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([7]);
  },
};
