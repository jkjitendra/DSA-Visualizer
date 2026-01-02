import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Anagram Detection
 * 
 * Checks if two strings are anagrams using frequency count comparison.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is alphabet size
 */
export const anagramDetection: IAlgorithm<ArrayInput> = {
  id: 'anagram-detection',
  name: 'Anagram Detection',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function isAnagram(str1, str2):',
    '  if length(str1) ≠ length(str2):',
    '    return false',
    '',
    '  freq1 = countFrequency(str1)',
    '  freq2 = countFrequency(str2)',
    '',
    '  for each char in freq1:',
    '    if freq1[char] ≠ freq2[char]:',
    '      return false',
    '',
    '  return true',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(k)',

  parameters: [
    {
      type: 'text',
      id: 'secondString',
      label: 'Second String',
      default: 'LISTEN',
      placeholder: 'String to compare',
      maxLength: 20,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'Need at least 2 characters' };
    }
    if (input.values.length > 20) {
      return { ok: false, error: 'String length must be 20 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const chars1 = arr.map(v => String.fromCharCode(v));
    const str1 = chars1.join('');

    // Use the second string from parameters
    const str2 = ((params?.secondString as string) || 'LISTEN').toUpperCase();
    const chars2 = str2.split('');

    yield createEvent.message(
      `Anagram Detection using Frequency Count`,
      'info',
      0
    );
    yield createEvent.message(
      `String 1: "${str1}" | String 2: "${str2}"`,
      'explanation'
    );

    // Check lengths first
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(
      `Checking lengths: ${str1.length} vs ${str2.length}`,
      'step'
    );

    if (str1.length !== str2.length) {
      yield createEvent.message(
        `Different lengths - NOT anagrams`,
        'info'
      );
      return;
    }

    yield createEvent.message(
      `Lengths match. Building frequency counts...`,
      'step'
    );
    yield createEvent.highlight([4, 5]);

    // Build frequency maps
    const freq1 = new Map<string, number>();
    const freq2 = new Map<string, number>();

    // Count str1
    for (let i = 0; i < n; i++) {
      freq1.set(chars1[i], (freq1.get(chars1[i]) || 0) + 1);

      yield createEvent.mark([i], 'current');
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'char', value: chars1[i], highlight: true },
          { name: 'count', value: freq1.get(chars1[i]) || 0 },
        ]
      );

      const frequencies1 = Array.from(freq1.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([c, count]) => ({ char: c, count, highlight: c === chars1[i] }));

      yield createEvent.auxiliary({
        type: 'frequency',
        frequencyState: {
          frequencies: frequencies1,
        },
        stringChars: {
          text: chars1.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'current' : (idx < i ? 'found' : undefined),
          })),
        },
      });

      yield createEvent.unmark([i]);
    }

    yield createEvent.message(
      `String 1 frequency: {${Array.from(freq1.entries()).map(([c, n]) => `'${c}':${n}`).join(', ')}}`,
      'explanation'
    );

    // Count str2
    yield createEvent.message(
      `Counting String 2...`,
      'step'
    );

    for (let i = 0; i < chars2.length; i++) {
      freq2.set(chars2[i], (freq2.get(chars2[i]) || 0) + 1);
    }

    yield createEvent.message(
      `String 2 frequency: {${Array.from(freq2.entries()).map(([c, n]) => `'${c}':${n}`).join(', ')}}`,
      'explanation'
    );

    // Compare frequencies
    yield createEvent.highlight([7, 8, 9]);
    yield createEvent.message(
      `Comparing frequency counts...`,
      'step'
    );

    const freq1Arr = Array.from(freq1.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    const freq2Arr = Array.from(freq2.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    let isAnagram = true;

    for (const [char, count1] of freq1Arr) {
      const count2 = freq2.get(char) || 0;

      yield createEvent.auxiliary({
        type: 'frequency',
        frequencyState: {
          frequencies: freq1Arr.map(([c, n]) => ({
            char: c,
            count: n,
            highlight: c === char,
          })),
          frequencies2: freq2Arr.map(([c, n]) => ({
            char: c,
            count: n,
            highlight: c === char,
          })),
          isMatch: count1 === count2,
        },
      });

      if (count1 !== count2) {
        isAnagram = false;
        yield createEvent.message(
          `Mismatch for '${char}': ${count1} vs ${count2}`,
          'explanation'
        );
        break;
      }

      yield createEvent.message(
        `'${char}': ${count1} == ${count2} ✓`,
        'explanation'
      );
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([11]);

    // Emit result event
    yield createEvent.result(
      'boolean',
      isAnagram,
      isAnagram ? `"${str1}" and "${str2}" ARE anagrams!` : `"${str1}" and "${str2}" are NOT anagrams`
    );

    if (isAnagram) {
      yield createEvent.message(
        `"${str1}" and "${str2}" ARE anagrams! ✓`,
        'info'
      );

      // Mark all as sorted
      for (let i = 0; i < n; i++) {
        yield createEvent.mark([i], 'sorted');
      }
    } else {
      yield createEvent.message(
        `"${str1}" and "${str2}" are NOT anagrams. ✗`,
        'info'
      );
    }
  },
};
