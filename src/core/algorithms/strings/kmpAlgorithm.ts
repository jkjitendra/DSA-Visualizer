import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * KMP (Knuth-Morris-Pratt) Algorithm
 * 
 * Efficient pattern matching using LPS (Longest Proper Prefix which is also Suffix) array.
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(m) for LPS array
 */
export const kmpAlgorithm: IAlgorithm<ArrayInput> = {
  id: 'kmp-algorithm',
  name: 'KMP Algorithm',
  category: 'strings',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function computeLPS(pattern):',
    '  lps[0] = 0, length = 0, i = 1',
    '  while i < m:',
    '    if pattern[i] == pattern[length]:',
    '      lps[i++] = ++length',
    '    else if length > 0:',
    '      length = lps[length-1]',
    '    else:',
    '      lps[i++] = 0',
    '',
    'function KMP(text, pattern):',
    '  i = 0, j = 0',
    '  while i < n:',
    '    if text[i] == pattern[j]:',
    '      i++, j++',
    '    if j == m: found, j = lps[j-1]',
    '    else if mismatch:',
    '      if j > 0: j = lps[j-1]',
    '      else: i++',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n + m)',
    worst: 'O(n + m)',
  },

  spaceComplexity: 'O(m)',

  parameters: [
    {
      type: 'text',
      id: 'pattern',
      label: 'Search Pattern',
      default: 'ABAB',
      placeholder: 'Enter pattern to search',
      maxLength: 10,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 3) {
      return { ok: false, error: 'Text must have at least 3 characters' };
    }
    if (input.values.length > 25) {
      return { ok: false, error: 'Text length must be 25 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const patternStr = ((params?.pattern as string) || 'ABAB').toUpperCase();
    const arr = [...input.values];
    const n = arr.length;
    const textChars = arr.map(v => String.fromCharCode(v));
    const text = textChars.join('');
    const patternChars = patternStr.split('');
    const m = patternChars.length;

    yield createEvent.message(
      `KMP (Knuth-Morris-Pratt) Algorithm`,
      'info',
      0
    );
    yield createEvent.message(
      `Text: "${text}" | Pattern: "${patternStr}"`,
      'explanation'
    );

    // Phase 1: Build LPS array
    yield createEvent.message(
      `Phase 1: Building LPS (Longest Proper Prefix Suffix) array...`,
      'step'
    );
    yield createEvent.highlight([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    const lps = yield* buildLPS(patternChars);

    // Phase 2: Pattern matching
    yield createEvent.message(
      `Phase 2: Searching for pattern using LPS array...`,
      'step'
    );
    yield createEvent.highlight([10, 11, 12, 13, 14, 15, 16, 17]);

    const matches: number[] = [];
    let i = 0; // text index
    let j = 0; // pattern index

    while (i < n) {
      yield createEvent.pointer(
        [
          { index: i, label: 'i', color: 'var(--color-primary-500)' },
        ],
        [
          { name: 'i (text)', value: i },
          { name: 'j (pattern)', value: j },
          { name: 'text[i]', value: textChars[i], highlight: true },
          { name: 'pattern[j]', value: patternChars[j] || '-' },
        ]
      );

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: textChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'current' : (matches.some(m => idx >= m && idx < m + m) ? 'found' : undefined),
          })),
          pattern: patternChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === j ? 'current' : (idx < j ? 'match' : undefined),
          })),
          patternOffset: i - j,
          matchPositions: matches,
        },
        lpsState: {
          array: lps.map((v, idx) => ({
            index: idx,
            value: v,
            highlight: idx === j,
          })),
          arrayType: 'lps',
        },
      });

      if (textChars[i] === patternChars[j]) {
        yield createEvent.compare([i, j], 'eq');
        yield createEvent.message(
          `text[${i}]='${textChars[i]}' == pattern[${j}]='${patternChars[j]}' ✓`,
          'explanation'
        );
        i++;
        j++;

        if (j === m) {
          matches.push(i - j);
          yield createEvent.message(
            `Match found at position ${i - j}!`,
            'info'
          );

          // Mark matched positions
          for (let k = i - j; k < i; k++) {
            yield createEvent.mark([k], 'sorted');
          }

          yield createEvent.message(
            `Using LPS: j = lps[${j - 1}] = ${lps[j - 1]}`,
            'explanation'
          );
          j = lps[j - 1];
        }
      } else {
        yield createEvent.compare([i, j], 'lt');

        if (j !== 0) {
          yield createEvent.message(
            `Mismatch! Using LPS: j = lps[${j - 1}] = ${lps[j - 1]} (skip ${j - lps[j - 1]} positions)`,
            'explanation'
          );
          j = lps[j - 1];
        } else {
          yield createEvent.message(
            `Mismatch at start of pattern, moving to next text position`,
            'explanation'
          );
          i++;
        }
      }
    }

    yield createEvent.pointer([], []);

    // Emit result event
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
  },
};

function* buildLPS(pattern: string[]): Generator<AlgoEvent, number[], unknown> {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let length = 0;
  let i = 1;

  yield createEvent.message(
    `LPS[0] = 0 (first element is always 0)`,
    'explanation'
  );

  yield createEvent.auxiliary({
    type: 'lps',
    lpsState: {
      array: lps.map((v, idx) => ({ index: idx, value: v })),
      arrayType: 'lps',
      currentBuildIndex: 0,
    },
    stringChars: {
      text: pattern.map((c, idx) => ({ char: c, index: idx })),
    },
  });

  while (i < m) {
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'i', value: i },
        { name: 'length', value: length },
        { name: 'pattern[i]', value: pattern[i], highlight: true },
        { name: 'pattern[length]', value: pattern[length] },
      ]
    );

    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;

      yield createEvent.message(
        `pattern[${i}]='${pattern[i]}' == pattern[${length - 1}]='${pattern[length - 1]}' → LPS[${i}] = ${length}`,
        'explanation'
      );

      yield createEvent.auxiliary({
        type: 'lps',
        lpsState: {
          array: lps.map((v, idx) => ({
            index: idx,
            value: v,
            highlight: idx === i,
            prefixEnd: length - 1,
            suffixStart: i - length + 1,
          })),
          arrayType: 'lps',
          currentBuildIndex: i,
        },
        stringChars: {
          text: pattern.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx <= length - 1 || (idx >= i - length + 1 && idx <= i) ? 'match' : undefined,
          })),
        },
      });

      i++;
    } else {
      if (length !== 0) {
        yield createEvent.message(
          `Mismatch: falling back to LPS[${length - 1}] = ${lps[length - 1]}`,
          'explanation'
        );
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        yield createEvent.message(
          `No prefix match found: LPS[${i}] = 0`,
          'explanation'
        );

        yield createEvent.auxiliary({
          type: 'lps',
          lpsState: {
            array: lps.map((v, idx) => ({
              index: idx,
              value: v,
              highlight: idx === i,
            })),
            arrayType: 'lps',
            currentBuildIndex: i,
          },
          stringChars: {
            text: pattern.map((c, idx) => ({ char: c, index: idx })),
          },
        });

        i++;
      }
    }
  }

  yield createEvent.message(
    `LPS array complete: [${lps.join(', ')}]`,
    'info'
  );

  return lps;
}
