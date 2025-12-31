import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Cycle Sort Algorithm
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Minimizes memory writes by placing each element at its correct position.
 */
export const cycleSort: IAlgorithm<ArrayInput> = {
  id: 'cycle-sort',
  name: 'Cycle Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function cycleSort(arr):',
    '  for cycleStart from 0 to n-2:',
    '    item = arr[cycleStart]',
    '    pos = cycleStart',
    '    for i from cycleStart+1 to n:',
    '      if arr[i] < item:',
    '        pos = pos + 1',
    '    if pos == cycleStart: continue',
    '    while item == arr[pos]: pos++',
    '    swap(arr[pos], item)',
    '    // Rotate the cycle',
    '    while pos != cycleStart: ...',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 50) {
      return { ok: false, error: 'Array size must be 50 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    let writes = 0;

    yield createEvent.message(`Starting Cycle Sort with ${n} elements (minimizing writes)`);
    yield createEvent.highlight([0]);

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
      yield createEvent.highlight([1]);

      let item = arr[cycleStart];
      let pos = cycleStart;

      yield createEvent.pointer(
        [{ index: cycleStart, label: 'start', color: 'var(--color-accent-current)' }],
        [
          { name: 'cycleStart', value: cycleStart, highlight: false },
          { name: 'item', value: item, highlight: true },
          { name: 'writes', value: writes, highlight: false },
        ],
        `Starting cycle from index ${cycleStart}, item = ${item}`
      );

      // Find correct position
      yield createEvent.message(`Finding correct position for ${item}`);
      yield createEvent.highlight([4, 5, 6]);

      for (let i = cycleStart + 1; i < n; i++) {
        yield createEvent.compare([cycleStart, i]);
        if (arr[i] < item) {
          pos++;
        }
      }

      // If already in place, skip
      if (pos === cycleStart) {
        yield createEvent.mark([cycleStart], 'sorted');
        yield createEvent.message(`Element ${item} already in correct position`);
        continue;
      }

      yield createEvent.highlight([7]);

      // Handle duplicates
      while (item === arr[pos]) {
        pos++;
      }

      // Place at correct position
      if (pos !== cycleStart) {
        yield createEvent.highlight([9]);
        yield createEvent.swap([cycleStart, pos]);

        const temp = arr[pos];
        arr[pos] = item;
        item = temp;
        writes++;

        yield createEvent.pointer(
          [{ index: pos, label: 'placed', color: 'var(--color-accent-swap)' }],
          [
            { name: 'item', value: item, highlight: true },
            { name: 'pos', value: pos, highlight: false },
            { name: 'writes', value: writes, highlight: true },
          ],
          `Placed element at index ${pos}, writes = ${writes}`
        );
      }

      // Rotate rest of the cycle
      yield createEvent.highlight([11]);

      while (pos !== cycleStart) {
        pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
          if (arr[i] < item) {
            pos++;
          }
        }

        while (item === arr[pos]) {
          pos++;
        }

        if (item !== arr[pos]) {
          yield createEvent.swap([cycleStart, pos]);

          const temp = arr[pos];
          arr[pos] = item;
          item = temp;
          writes++;

          yield createEvent.pointer(
            [{ index: pos, label: 'cycle', color: 'var(--color-accent-swap)' }],
            [
              { name: 'item', value: item, highlight: true },
              { name: 'writes', value: writes, highlight: true },
            ],
            `Cycle rotation: placed at ${pos}, writes = ${writes}`
          );
        }
      }

      yield createEvent.mark([cycleStart], 'sorted');
    }

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message(`Array sorted with only ${writes} writes!`);
    yield createEvent.highlight([12]);
  },
};
