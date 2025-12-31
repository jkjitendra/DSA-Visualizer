import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BucketData } from '../../events/events';

/**
 * Bucket Sort Algorithm
 * 
 * Time Complexity: O(n + k) average, O(n²) worst
 * Space Complexity: O(n + k)
 * 
 * Distributes elements into buckets, sorts each bucket.
 */
export const bucketSort: IAlgorithm<ArrayInput> = {
  id: 'bucket-sort',
  name: 'Bucket Sort',
  category: 'sorting',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function bucketSort(arr):',
    '  n = length(arr)',
    '  max = max(arr)',
    '  buckets = createBuckets(n)',
    '  for each element in arr:',
    '    index = element * n / (max + 1)',
    '    buckets[index].add(element)',
    '  for each bucket:',
    '    sort(bucket)',
    '  concatenate all buckets',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n + k)',
    average: 'O(n + k)',
    worst: 'O(n²)',
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
    if (!input.values.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0)) {
      return { ok: false, error: 'Bucket Sort requires non-negative numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Starting Bucket Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    const max = Math.max(...arr);
    const bucketCount = Math.min(n, 8);
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    // Helper to create bucket visualization
    const getBucketViz = (highlightIdx?: number): BucketData[] => {
      const rangeSize = (max + 1) / bucketCount;
      return buckets.map((bucket, i) => ({
        id: i,
        label: `B${i}`,
        values: [...bucket],
        highlight: i === highlightIdx,
      }));
    };

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n, highlight: false },
        { name: 'max', value: max, highlight: true },
        { name: 'buckets', value: bucketCount, highlight: true },
      ],
      `Creating ${bucketCount} buckets for range [0, ${max}]`
    );

    // Show empty buckets
    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Initialize',
      buckets: getBucketViz(),
    });

    // Distribute elements into buckets
    yield createEvent.message('Distributing elements into buckets');
    yield createEvent.highlight([3, 4, 5]);

    for (let i = 0; i < n; i++) {
      const idx = max === 0 ? 0 : Math.min(Math.floor((arr[i] * bucketCount) / (max + 1)), bucketCount - 1);
      buckets[idx].push(arr[i]);

      yield createEvent.visit(i);
      yield createEvent.pointer(
        [{ index: i, label: `B${idx}`, color: 'var(--color-accent-compare)' }],
        [
          { name: 'value', value: arr[i], highlight: true },
          { name: 'bucket', value: idx, highlight: true },
        ],
        `${arr[i]} → bucket B${idx}`
      );

      yield createEvent.auxiliary({
        type: 'buckets',
        phase: 'Distribution',
        buckets: getBucketViz(idx),
      });
    }

    // Sort each bucket and concatenate
    yield createEvent.message('Sorting buckets and concatenating');
    yield createEvent.highlight([6, 7, 8]);

    // Sort each bucket
    for (let b = 0; b < bucketCount; b++) {
      if (buckets[b].length > 0) {
        buckets[b].sort((a, c) => a - c);
        yield createEvent.auxiliary({
          type: 'buckets',
          phase: 'Sorting Buckets',
          buckets: getBucketViz(b),
        });
      }
    }

    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Collection',
      buckets: getBucketViz(),
    });

    let idx = 0;
    for (let b = 0; b < bucketCount; b++) {
      for (const val of buckets[b]) {
        arr[idx] = val;
        yield createEvent.set(idx, val);
        yield createEvent.mark([idx], 'sorted');
        idx++;
      }
    }

    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Complete',
      buckets: [],
    });
    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([9]);
  },
};
