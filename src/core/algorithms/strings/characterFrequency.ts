import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Character Frequency Count
 * 
 * Counts the frequency of each character in a string and displays as histogram.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is unique characters
 */
export const characterFrequency: IAlgorithm<ArrayInput> = {
  id: 'character-frequency',
  name: 'Character Frequency',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function countFrequency(str):',
    '  freq = empty map',
    '',
    '  for each char in str:',
    '    if char in freq:',
    '      freq[char]++',
    '    else:',
    '      freq[char] = 1',
    '',
    '  return freq',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(k)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 1) {
      return { ok: false, error: 'String must have at least 1 character' };
    }
    if (input.values.length > 30) {
      return { ok: false, error: 'String length must be 30 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const chars = arr.map(v => String.fromCharCode(v));
    const str = chars.join('');

    yield createEvent.message(
      `Character Frequency Count`,
      'info',
      0
    );
    yield createEvent.message(
      `Input: "${str}" (${n} characters)`,
      'explanation'
    );
    yield createEvent.highlight([0, 1]);

    // Frequency map
    const freq = new Map<string, number>();

    // Show initial state
    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, i) => ({ char: c, index: i })),
      },
    });

    yield createEvent.message('Building frequency map...', 'step');
    yield createEvent.highlight([3, 4, 5, 6, 7]);

    for (let i = 0; i < n; i++) {
      const char = chars[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'char', value: char, highlight: true },
          { name: 'count', value: (freq.get(char) || 0) + 1 },
        ],
        `freq['${char}'] = ${(freq.get(char) || 0) + 1}`
      );

      // Update frequency
      freq.set(char, (freq.get(char) || 0) + 1);

      // Build frequency data for histogram
      const frequencies = Array.from(freq.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([c, count]) => ({
          char: c,
          count,
          highlight: c === char,
        }));

      yield createEvent.auxiliary({
        type: 'frequency',
        frequencyState: {
          frequencies,
        },
        stringChars: {
          text: chars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'current' : (idx < i ? 'found' : undefined),
          })),
        },
      });

      yield createEvent.message(
        `Character '${char}': count = ${freq.get(char)}`,
        'explanation'
      );

      yield createEvent.unmark([i]);
      yield createEvent.mark([i], 'sorted');
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([9]);

    // Final result
    const sortedFreq = Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1]);

    yield createEvent.message(
      `Frequency count complete! Found ${freq.size} unique characters.`,
      'info'
    );

    // Show most frequent and emit result
    if (sortedFreq.length > 0) {
      const [topChar, topCount] = sortedFreq[0];

      // Emit result event
      yield createEvent.result(
        'frequency',
        `'${topChar}' × ${topCount}`,
        `Most frequent: '${topChar}' (${topCount} times)`
      );

      yield createEvent.message(
        `Most frequent: '${topChar}' appears ${topCount} time${topCount > 1 ? 's' : ''}`,
        'explanation'
      );
    }
  },
};
