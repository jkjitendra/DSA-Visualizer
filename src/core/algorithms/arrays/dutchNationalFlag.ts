import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Dutch National Flag Algorithm (3-Way Partitioning)
 * 
 * Sort an array containing only 0s, 1s, and 2s in a single pass.
 * Uses three pointers: low, mid, high.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const dutchNationalFlag: IAlgorithm<ArrayInput> = {
  id: 'dutch-national-flag',
  name: 'Dutch National Flag',
  category: 'arrays',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function dutchNationalFlag(arr):',
    '  low = 0, mid = 0',
    '  high = n - 1',
    '',
    '  while mid <= high:',
    '    if arr[mid] == 0:',
    '      swap(arr[low], arr[mid])',
    '      low++, mid++',
    '    else if arr[mid] == 1:',
    '      mid++',
    '    else:  // arr[mid] == 2',
    '      swap(arr[mid], arr[high])',
    '      high--',
    '',
    '  return arr  // Sorted!',
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
    // Check that only 0, 1, 2 are present
    if (!input.values.every((v) => v === 0 || v === 1 || v === 2)) {
      return { ok: false, error: 'Array must contain only 0s, 1s, and 2s' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Dutch National Flag: Sort array of 0s, 1s, 2s`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) single pass | Space: O(1)`,
      'info'
    );

    // Initialize pointers
    yield createEvent.highlight([0, 1, 2]);
    let low = 0;
    let mid = 0;
    let high = n - 1;

    yield createEvent.message(
      `Initialize: low=0, mid=0, high=${high}`,
      'explanation'
    );
    yield createEvent.pointer(
      [
        { index: low, label: 'low', color: 'var(--color-red-500)' },
        { index: mid, label: 'mid', color: 'var(--color-primary-500)' },
        { index: high, label: 'high', color: 'var(--color-blue-500)' },
      ],
      [
        { name: 'low', value: low },
        { name: 'mid', value: mid },
        { name: 'high', value: high },
      ]
    );

    // Main loop
    while (mid <= high) {
      yield createEvent.highlight([4]);
      yield createEvent.message(
        `mid=${mid} <= high=${high}? YES → Continue`,
        'explanation'
      );

      // Update pointer visualization
      const pointers = [
        { index: mid, label: 'mid', color: 'var(--color-primary-500)' },
      ];
      if (low !== mid) {
        pointers.unshift({ index: low, label: 'low', color: 'var(--color-red-500)' });
      }
      if (high !== mid && high !== low) {
        pointers.push({ index: high, label: 'high', color: 'var(--color-blue-500)' });
      }

      yield createEvent.pointer(
        pointers,
        [
          { name: 'low', value: low },
          { name: 'mid', value: mid },
          { name: 'high', value: high },
          { name: 'arr[mid]', value: arr[mid], highlight: true },
        ]
      );

      if (arr[mid] === 0) {
        yield createEvent.highlight([5, 6, 7]);
        yield createEvent.message(
          `arr[${mid}] = 0 → Swap with low, move both pointers`,
          'step'
        );

        // Swap
        yield createEvent.compare([mid, low], 'eq');
        const temp = arr[low];
        arr[low] = arr[mid];
        arr[mid] = temp;
        yield createEvent.swap([low, mid]);

        // Mark the 0 in its final position
        yield createEvent.mark([low], 'sorted');

        low++;
        mid++;

        yield createEvent.message(
          `After swap: low=${low}, mid=${mid}`,
          'explanation'
        );
      } else if (arr[mid] === 1) {
        yield createEvent.highlight([8, 9]);
        yield createEvent.message(
          `arr[${mid}] = 1 → Already in middle, just move mid`,
          'step'
        );

        // Mark 1 as current (it's in place for now)
        yield createEvent.mark([mid], 'current');

        mid++;

        yield createEvent.message(
          `After: mid=${mid}`,
          'explanation'
        );
      } else {
        // arr[mid] === 2
        yield createEvent.highlight([10, 11, 12]);
        yield createEvent.message(
          `arr[${mid}] = 2 → Swap with high, move high left`,
          'step'
        );

        // Swap
        yield createEvent.compare([mid, high], 'eq');
        const temp = arr[high];
        arr[high] = arr[mid];
        arr[mid] = temp;
        yield createEvent.swap([mid, high]);

        // Mark the 2 in its final position
        yield createEvent.mark([high], 'sorted');

        high--;

        yield createEvent.message(
          `After swap: high=${high} (mid stays to check swapped value)`,
          'explanation'
        );
      }

      // Update array visualization
      for (let i = 0; i < n; i++) {
        yield createEvent.set(i, arr[i], input.values[i]);
      }
    }

    yield createEvent.highlight([14]);
    yield createEvent.pointer([], []);

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.message(
      `Array sorted: [${arr.join(', ')}]`,
      'info'
    );
    yield createEvent.message(
      `All 0s are at the beginning, 1s in the middle, 2s at the end`,
      'explanation'
    );
  },
};
