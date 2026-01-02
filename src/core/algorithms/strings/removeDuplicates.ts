import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Remove Duplicates from String
 * 
 * Remove duplicate characters while preserving order.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is alphabet size
 */
export const removeDuplicates: IAlgorithm<ArrayInput> = {
  id: 'remove-duplicates',
  name: 'Remove Duplicates',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function removeDuplicates(str):',
    '  seen = empty set',
    '  result = ""',
    '',
    '  for each char in str:',
    '    if char not in seen:',
    '      seen.add(char)',
    '      result += char',
    '',
    '  return result',
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
    if (input.values.length > 20) {
      return { ok: false, error: 'String length must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const chars = arr.map(v => String.fromCharCode(v));
    const str = chars.join('');

    yield createEvent.message(
      `Remove Duplicate Characters`,
      'info',
      0
    );
    yield createEvent.message(
      `Input: "${str}"`,
      'explanation'
    );
    yield createEvent.highlight([1, 2]);

    const seen = new Set<string>();
    let result = '';

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, i) => ({ char: c, index: i })),
      },
    });

    yield createEvent.message(
      `Scanning through string, tracking seen characters...`,
      'step'
    );
    yield createEvent.highlight([4, 5, 6, 7]);

    for (let i = 0; i < n; i++) {
      const char = chars[i];

      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'char', value: char, highlight: true },
          { name: 'seen', value: `{${Array.from(seen).join(', ')}}` },
          { name: 'result', value: result },
        ]
      );

      const frequencies = Array.from(seen).map(c => ({
        char: c,
        count: 1,
        highlight: c === char,
      }));

      if (!seen.has(char)) {
        seen.add(char);
        result += char;

        yield createEvent.message(
          `'${char}' is new → add to result: "${result}"`,
          'explanation'
        );

        yield createEvent.mark([i], 'sorted');

        yield createEvent.auxiliary({
          type: 'frequency',
          frequencyState: {
            frequencies: [...frequencies, { char, count: 1, highlight: true }],
          },
          stringChars: {
            text: chars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === i ? 'match' :
                (idx < i && result.includes(c) && chars.indexOf(c) === idx ? 'found' : undefined),
            })),
          },
        });
      } else {
        yield createEvent.message(
          `'${char}' already seen → skip`,
          'explanation'
        );

        yield createEvent.auxiliary({
          type: 'frequency',
          frequencyState: {
            frequencies,
          },
          stringChars: {
            text: chars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === i ? 'mismatch' :
                (idx < i && result.includes(c) && chars.indexOf(c) === idx ? 'found' : undefined),
            })),
          },
        });
      }

      yield createEvent.unmark([i]);
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([9]);

    // Emit result event with deduplicated string
    yield createEvent.result(
      'string',
      result,
      `Result: "${result}"`
    );

    yield createEvent.message(
      `Result: "${result}" (${result.length} unique characters from ${n})`,
      'info'
    );

    // Mark positions of characters that made it to result
    for (let i = 0; i < n; i++) {
      if (chars.indexOf(chars[i]) === i) {
        yield createEvent.mark([i], 'sorted');
      }
    }
  },
};
