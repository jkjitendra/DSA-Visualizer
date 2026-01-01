import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Array Rearrangement (Alternating Positives and Negatives)
 * 
 * Rearrange array so positives and negatives appear alternately.
 * Maintains relative order of positives and negatives.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) for this stable version
 */
export const arrayRearrangement: IAlgorithm<ArrayInput> = {
  id: 'array-rearrangement',
  name: 'Rearrangement',
  category: 'arrays',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function rearrange(arr):',
    '  // Separate positives and negatives',
    '  positives = [x for x in arr if x >= 0]',
    '  negatives = [x for x in arr if x < 0]',
    '',
    '  // Merge alternately',
    '  result = []',
    '  i = 0, j = 0',
    '',
    '  while i < len(pos) AND j < len(neg):',
    '    result.append(positives[i++])',
    '    result.append(negatives[j++])',
    '',
    '  // Append remaining elements',
    '  append remaining positives',
    '  append remaining negatives',
    '',
    '  return result',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Array must have at least 2 elements' };
    }
    if (input.values.length > 16) {
      return { ok: false, error: 'Array size must be 16 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    // Need at least one positive and one negative
    const hasPos = input.values.some((v) => v >= 0);
    const hasNeg = input.values.some((v) => v < 0);
    if (!hasPos || !hasNeg) {
      return { ok: false, error: 'Array must have at least one positive and one negative number' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Rearrangement: Alternate positives and negatives`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(n)`,
      'info'
    );

    // Phase 1: Separate positives and negatives
    yield createEvent.highlight([0, 1, 2, 3]);
    yield createEvent.message(
      `Phase 1: Separate positives and negatives`,
      'step'
    );

    const positives: number[] = [];
    const negatives: number[] = [];

    for (let i = 0; i < n; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'positives', value: positives.length },
          { name: 'negatives', value: negatives.length },
        ]
      );

      if (arr[i] >= 0) {
        positives.push(arr[i]);
        yield createEvent.mark([i], 'sorted');  // Green for positive
        yield createEvent.message(
          `${arr[i]} >= 0 → Add to positives`,
          'explanation'
        );
      } else {
        negatives.push(arr[i]);
        yield createEvent.mark([i], 'pivot');  // Red for negative
        yield createEvent.message(
          `${arr[i]} < 0 → Add to negatives`,
          'explanation'
        );
      }
    }

    yield createEvent.message(
      `Positives: [${positives.join(', ')}]`,
      'explanation'
    );
    yield createEvent.message(
      `Negatives: [${negatives.join(', ')}]`,
      'explanation'
    );

    // Clear marks
    for (let i = 0; i < n; i++) {
      yield createEvent.unmark([i]);
    }

    // Phase 2: Merge alternately
    yield createEvent.highlight([5, 6, 7, 8, 9, 10, 11]);
    yield createEvent.message(
      `Phase 2: Merge alternately (positive first)`,
      'step'
    );

    const result: number[] = [];
    let pi = 0;  // positives index
    let ni = 0;  // negatives index

    while (pi < positives.length && ni < negatives.length) {
      yield createEvent.pointer(
        [],
        [
          { name: 'pi', value: pi },
          { name: 'ni', value: ni },
          { name: 'positives[pi]', value: positives[pi], highlight: true },
          { name: 'negatives[ni]', value: negatives[ni], highlight: true },
        ]
      );

      // Add positive
      result.push(positives[pi]);
      yield createEvent.set(result.length - 1, positives[pi], arr[result.length - 1]);
      yield createEvent.mark([result.length - 1], 'sorted');
      yield createEvent.message(
        `Add positive: ${positives[pi]}`,
        'explanation'
      );
      pi++;

      // Add negative
      result.push(negatives[ni]);
      yield createEvent.set(result.length - 1, negatives[ni], arr[result.length - 1]);
      yield createEvent.mark([result.length - 1], 'current');
      yield createEvent.message(
        `Add negative: ${negatives[ni]}`,
        'explanation'
      );
      ni++;
    }

    // Append remaining positives
    yield createEvent.highlight([13, 14]);
    while (pi < positives.length) {
      result.push(positives[pi]);
      yield createEvent.set(result.length - 1, positives[pi], arr[result.length - 1]);
      yield createEvent.mark([result.length - 1], 'sorted');
      yield createEvent.message(
        `Append remaining positive: ${positives[pi]}`,
        'explanation'
      );
      pi++;
    }

    // Append remaining negatives
    yield createEvent.highlight([15]);
    while (ni < negatives.length) {
      result.push(negatives[ni]);
      yield createEvent.set(result.length - 1, negatives[ni], arr[result.length - 1]);
      yield createEvent.mark([result.length - 1], 'current');
      yield createEvent.message(
        `Append remaining negative: ${negatives[ni]}`,
        'explanation'
      );
      ni++;
    }

    yield createEvent.highlight([17]);
    yield createEvent.pointer([], []);

    // Final mark all as sorted
    for (let i = 0; i < n; i++) {
      yield createEvent.unmark([i]);
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.message(
      `Rearranged: [${result.join(', ')}]`,
      'info'
    );
    yield createEvent.message(
      `Positives and negatives now alternate!`,
      'explanation'
    );
  },
};
