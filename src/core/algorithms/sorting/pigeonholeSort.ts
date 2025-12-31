import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BucketData } from '../../events/events';

/**
 * Pigeonhole Sort Algorithm
 * 
 * Time Complexity: O(n + range)
 * Space Complexity: O(range)
 * 
 * Places each element in its "pigeonhole" based on value.
 */
export const pigeonholeSort: IAlgorithm<ArrayInput> = {
  id: 'pigeonhole-sort',
  name: 'Pigeonhole Sort',
  category: 'sorting',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function pigeonholeSort(arr, n):',
    '  min = getMin(arr)',
    '  max = getMax(arr)',
    '  range = max - min + 1',
    '  holes = new array[range]  // Empty pigeonholes',
    '',
    '  // Place each element in its hole',
    '  for i = 0 to n - 1:',
    '    holeIndex = arr[i] - min',
    '    holes[holeIndex].add(arr[i])',
    '',
    '  // Collect elements in order',
    '  idx = 0',
    '  for h = 0 to range - 1:',
    '    for each element in holes[h]:',
    '      arr[idx++] = element',
    '',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n + r)',
    average: 'O(n + r)',
    worst: 'O(n + r)',
  },

  spaceComplexity: 'O(n + r)',

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
    if (!input.values.every((v) => typeof v === 'number' && Number.isInteger(v))) {
      return { ok: false, error: 'Pigeonhole Sort requires integers' };
    }
    const min = Math.min(...input.values);
    const max = Math.max(...input.values);
    if (max - min > 20) {
      return { ok: false, error: 'Range must be 20 or less for clear visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(`Starting Pigeonhole Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const holes: number[][] = Array.from({ length: range }, () => []);

    // Helper to create bucket visualization
    const getHolesViz = (highlightIdx?: number): BucketData[] => {
      return holes.map((hole, i) => ({
        id: i,
        label: String(min + i),
        values: [...hole],
        highlight: i === highlightIdx,
      }));
    };

    yield createEvent.pointer(
      [],
      [
        { name: 'min', value: min, highlight: false },
        { name: 'max', value: max, highlight: false },
        { name: 'range', value: range, highlight: true },
      ],
      `Range: ${min} to ${max} = ${range} pigeonholes`
    );

    // Show empty holes
    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Initialize',
      buckets: getHolesViz(),
    });

    // Place elements in holes
    yield createEvent.message('Placing elements in pigeonholes');
    yield createEvent.highlight([6, 7, 8]);

    for (let i = 0; i < n; i++) {
      const holeIdx = arr[i] - min;
      holes[holeIdx].push(arr[i]);

      yield createEvent.visit(i);
      yield createEvent.pointer(
        [{ index: i, label: `h${holeIdx}`, color: 'var(--color-accent-compare)' }],
        [
          { name: 'value', value: arr[i], highlight: true },
          { name: 'holeIndex', value: holeIdx, highlight: true },
        ],
        `${arr[i]} → hole[${holeIdx}] (value ${min + holeIdx})`
      );

      yield createEvent.auxiliary({
        type: 'buckets',
        phase: 'Distribution',
        buckets: getHolesViz(holeIdx),
      });
    }

    // Collect from holes
    yield createEvent.message('Collecting from pigeonholes in order');
    yield createEvent.highlight([11, 12, 13, 14]);

    yield createEvent.auxiliary({
      type: 'buckets',
      phase: 'Collection',
      buckets: getHolesViz(),
    });

    let idx = 0;
    for (let h = 0; h < range; h++) {
      for (const val of holes[h]) {
        arr[idx] = val;
        yield createEvent.set(idx, val);
        yield createEvent.mark([idx], 'sorted');

        yield createEvent.pointer(
          [{ index: idx, label: '✓', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'idx', value: idx, highlight: true },
            { name: 'value', value: val, highlight: true },
          ],
          `arr[${idx}] = ${val} (from hole ${h})`
        );

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
    yield createEvent.highlight([16]);
  },
};
