import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Brute Force Pattern Matching
 * 
 * Simplest pattern matching algorithm - check pattern at every position.
 * 
 * Time Complexity: O(n × m) where n = text length, m = pattern length
 * Space Complexity: O(1)
 */
export const bruteForceSearch: IAlgorithm<ArrayInput> = {
  id: 'brute-force-search',
  name: 'Brute Force Search',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function bruteForceSearch(text, pattern):',
    '  n = length(text)',
    '  m = length(pattern)',
    '',
    '  for i = 0 to n - m:',
    '    j = 0',
    '    while j < m and text[i+j] == pattern[j]:',
    '      j++',
    '',
    '    if j == m:',
    '      found at position i',
    '',
    '  return matches',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n × m)',
    worst: 'O(n × m)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'text',
      id: 'pattern',
      label: 'Search Pattern',
      default: 'AB',
      placeholder: 'Enter pattern to search',
      maxLength: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Text must have at least 2 characters' };
    }
    if (input.values.length > 25) {
      return { ok: false, error: 'Text length must be 25 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const patternStr = ((params?.pattern as string) || 'AB').toUpperCase();
    const arr = [...input.values];
    const n = arr.length;
    const textChars = arr.map(v => String.fromCharCode(v));
    const text = textChars.join('');
    const patternChars = patternStr.split('');
    const m = patternChars.length;

    yield createEvent.message(
      `Brute Force Pattern Matching`,
      'info',
      0
    );
    yield createEvent.message(
      `Text: "${text}" | Pattern: "${patternStr}"`,
      'explanation'
    );
    yield createEvent.highlight([1, 2]);

    const matches: number[] = [];
    let comparisons = 0;

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: textChars.map((c, i) => ({ char: c, index: i })),
        pattern: patternChars.map((c, i) => ({ char: c, index: i })),
        patternOffset: 0,
        matchPositions: [],
      },
    });

    yield createEvent.message(
      `Sliding pattern across text, checking at each position...`,
      'step'
    );
    yield createEvent.highlight([4]);

    for (let i = 0; i <= n - m; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'position', value: `${i} to ${i + m - 1}` },
        ]
      );

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: textChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: matches.includes(idx) ? 'found' :
              (idx >= i && idx < i + m ? 'current' : undefined),
          })),
          pattern: patternChars.map((c, idx) => ({ char: c, index: idx })),
          patternOffset: i,
          matchPositions: matches,
        },
      });

      yield createEvent.message(
        `Checking position ${i}: comparing "${text.substring(i, i + m)}" with "${patternStr}"`,
        'explanation'
      );
      yield createEvent.highlight([5, 6, 7]);

      let j = 0;
      while (j < m && textChars[i + j] === patternChars[j]) {
        comparisons++;
        yield createEvent.compare([i + j, j], 'eq');

        yield createEvent.auxiliary({
          type: 'string-chars',
          stringChars: {
            text: textChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === i + j ? 'match' :
                (matches.includes(idx) ? 'found' :
                  (idx >= i && idx < i + j ? 'match' : undefined)),
            })),
            pattern: patternChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === j ? 'match' : (idx < j ? 'match' : undefined),
            })),
            patternOffset: i,
            matchPositions: matches,
          },
        });

        yield createEvent.message(
          `text[${i + j}]='${textChars[i + j]}' == pattern[${j}]='${patternChars[j]}' ✓`,
          'explanation'
        );
        j++;
      }

      if (j === m) {
        // Full match found
        matches.push(i);
        yield createEvent.highlight([9, 10]);
        yield createEvent.message(
          `Match found at position ${i}!`,
          'info'
        );

        // Mark matched positions
        for (let k = i; k < i + m; k++) {
          yield createEvent.mark([k], 'sorted');
        }
      } else if (j < m && i + j < n) {
        // Mismatch
        comparisons++;
        yield createEvent.compare([i + j, j], 'lt');

        yield createEvent.auxiliary({
          type: 'string-chars',
          stringChars: {
            text: textChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === i + j ? 'mismatch' :
                (matches.includes(idx) ? 'found' : undefined),
            })),
            pattern: patternChars.map((c, idx) => ({
              char: c,
              index: idx,
              highlight: idx === j ? 'mismatch' : undefined,
            })),
            patternOffset: i,
            matchPositions: matches,
          },
        });

        yield createEvent.message(
          `Mismatch: text[${i + j}]='${textChars[i + j]}' ≠ pattern[${j}]='${patternChars[j]}'`,
          'explanation'
        );
      }
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([12]);

    // Emit result event with found indices
    yield createEvent.result(
      'indices',
      matches,
      matches.length > 0 ? `Pattern found at indices: [${matches.join(', ')}]` : `Pattern "${patternStr}" not found`
    );

    if (matches.length > 0) {
      yield createEvent.message(
        `Found ${matches.length} match(es) at position(s): [${matches.join(', ')}]`,
        'info'
      );
    } else {
      yield createEvent.message(
        `Pattern "${patternStr}" not found in text.`,
        'info'
      );
    }

    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
  },
};
