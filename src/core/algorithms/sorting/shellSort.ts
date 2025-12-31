import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Shell Sort Algorithm
 * 
 * Time Complexity: O(n log n) to O(n²) depending on gap sequence
 * Space Complexity: O(1)
 * 
 * Generalized insertion sort using a gap sequence.
 */
export const shellSort: IAlgorithm<ArrayInput> = {
  id: 'shell-sort',
  name: 'Shell Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  parameters: [
    {
      type: 'select',
      id: 'gapSequence',
      label: 'Gap Sequence',
      default: 'shell',
      options: [
        { value: 'shell', label: 'Shell (n/2)' },
        { value: 'knuth', label: 'Knuth (3k+1)' },
        { value: 'hibbard', label: 'Hibbard (2^k-1)' },
      ],
    },
  ],

  pseudocodeLines: [
    'function shellSort(arr, n):',
    '  gap = getInitialGap(n)  // Depends on sequence',
    '',
    '  while gap > 0:',
    '    for i = gap to n - 1:',
    '      temp = arr[i]',
    '      j = i',
    '      while j >= gap AND arr[j-gap] > temp:',
    '        arr[j] = arr[j-gap]',
    '        j = j - gap',
    '      arr[j] = temp',
    '    gap = nextGap(gap)',
    '',
    '  return arr',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n^1.5)',
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

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const gapType = (params?.gapSequence as string) || 'shell';

    // Generate gap sequence based on selected type
    const generateGaps = (n: number, type: string): number[] => {
      const gaps: number[] = [];
      if (type === 'knuth') {
        // Knuth: 1, 4, 13, 40, ... (3^k - 1) / 2
        let k = 1;
        while (k < n) {
          gaps.unshift(k);
          k = 3 * k + 1;
        }
      } else if (type === 'hibbard') {
        // Hibbard: 1, 3, 7, 15, ... (2^k - 1)
        let k = 1;
        while ((1 << k) - 1 < n) {
          gaps.unshift((1 << k) - 1);
          k++;
        }
      } else {
        // Shell: n/2, n/4, ..., 1
        let g = Math.floor(n / 2);
        while (g > 0) {
          gaps.push(g);
          g = Math.floor(g / 2);
        }
      }
      return gaps;
    };

    const gapSequence = generateGaps(n, gapType);
    const gapNames: Record<string, string> = {
      shell: 'Shell (n/2)',
      knuth: 'Knuth (3k+1)',
      hibbard: 'Hibbard (2^k-1)',
    };

    yield createEvent.message(`Starting Shell Sort with ${gapNames[gapType]} gap sequence`);
    yield createEvent.highlight([0]);

    yield createEvent.pointer(
      [],
      [
        { name: 'n', value: n, highlight: false },
        { name: 'sequence', value: gapType, highlight: true },
        { name: 'gaps', value: gapSequence.length, highlight: true },
      ],
      `Using ${gapNames[gapType]}: [${gapSequence.join(', ')}]`
    );

    // Show initial gap visualization
    yield createEvent.auxiliary({
      type: 'gap',
      phase: `${gapNames[gapType]} Sequence`,
      gapData: {
        gap: gapSequence[0],
        gaps: gapSequence,
        currentIdx: -1,
        comparingIdx: -1,
      },
    });

    for (const gap of gapSequence) {
      yield createEvent.message(`Gap = ${gap}: Comparing elements ${gap} positions apart`);
      yield createEvent.highlight([3]);

      yield createEvent.auxiliary({
        type: 'gap',
        phase: `Sorting with gap ${gap}`,
        gapData: {
          gap,
          gaps: gapSequence,
          currentIdx: -1,
          comparingIdx: -1,
        },
      });

      for (let i = gap; i < n; i++) {
        yield createEvent.highlight([4]);

        const temp = arr[i];
        let j = i;

        yield createEvent.pointer(
          [{ index: i, label: 'i', color: 'var(--color-accent-current)' }],
          [
            { name: 'gap', value: gap, highlight: false },
            { name: 'i', value: i, highlight: false },
            { name: 'temp', value: temp, highlight: true },
          ],
          `temp = arr[${i}] = ${temp}`
        );

        while (j >= gap && arr[j - gap] > temp) {
          yield createEvent.highlight([7, 8]);

          yield createEvent.compare([j - gap, j]);

          yield createEvent.auxiliary({
            type: 'gap',
            phase: `Comparing at gap ${gap}`,
            gapData: {
              gap,
              gaps: gapSequence,
              currentIdx: j,
              comparingIdx: j - gap,
            },
          });

          yield createEvent.pointer(
            [
              { index: j, label: 'j', color: 'var(--color-accent-compare)' },
              { index: j - gap, label: 'j-gap', color: 'var(--color-accent-compare)' },
            ],
            [
              { name: 'j', value: j, highlight: false },
              { name: 'j-gap', value: j - gap, highlight: false },
              { name: `arr[j-gap]`, value: arr[j - gap], highlight: true },
              { name: 'temp', value: temp, highlight: true },
            ],
            `${arr[j - gap]} > ${temp} → shift`
          );

          arr[j] = arr[j - gap];
          yield createEvent.swap([j, j - gap]);
          yield createEvent.highlight([8]);

          j -= gap;
          yield createEvent.highlight([9]);
        }

        arr[j] = temp;
        yield createEvent.highlight([10]);
      }
    }

    // Clear gap view
    yield createEvent.auxiliary({
      type: 'gap',
      phase: 'Complete',
      gapData: { gap: 0, gaps: [], currentIdx: -1, comparingIdx: -1 },
    });

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([13]);
  },
};
