import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * String Rotation Check
 * 
 * Check if one string is a rotation of another using concatenation trick.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const stringRotation: IAlgorithm<ArrayInput> = {
  id: 'string-rotation',
  name: 'String Rotation Check',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function isRotation(str1, str2):',
    '  if length(str1) ≠ length(str2):',
    '    return false',
    '',
    '  // Concatenate str1 with itself',
    '  combined = str1 + str1',
    '',
    '  // Check if str2 is substring',
    '  if str2 in combined:',
    '    return true',
    '  return false',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'text',
      id: 'secondString',
      label: 'Check if this is rotation',
      default: 'LLOHE',
      placeholder: 'Potential rotation',
      maxLength: 12,
    },
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of character codes' };
    }
    if (input.values.length < 2) {
      return { ok: false, error: 'String must have at least 2 characters' };
    }
    if (input.values.length > 12) {
      return { ok: false, error: 'String length must be 12 or less for visualization' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;
    const chars1 = arr.map(v => String.fromCharCode(v));
    const str1 = chars1.join('');

    // Use second string from parameters
    const str2 = ((params?.secondString as string) || 'LLOHE').toUpperCase();
    const chars2 = str2.split('');

    yield createEvent.message(
      `String Rotation Check`,
      'info',
      0
    );
    yield createEvent.message(
      `String 1: "${str1}" | String 2: "${str2}"`,
      'explanation'
    );

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars1.map((c, i) => ({ char: c, index: i })),
        pattern: chars2.map((c, i) => ({ char: c, index: i })),
      },
    });

    // Check lengths
    yield createEvent.highlight([1, 2]);
    yield createEvent.message(
      `Checking lengths: ${str1.length} vs ${str2.length}`,
      'step'
    );

    if (str1.length !== str2.length) {
      yield createEvent.message(
        `Different lengths - NOT a rotation`,
        'info'
      );
      return;
    }

    // Concatenate str1 with itself
    yield createEvent.highlight([4, 5]);
    const combined = str1 + str1;
    const combinedChars = combined.split('');

    yield createEvent.message(
      `Concatenating: "${str1}" + "${str1}" = "${combined}"`,
      'step'
    );

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: combinedChars.map((c, i) => ({
          char: c,
          index: i,
          highlight: i < n ? 'pattern' : undefined,
        })),
        pattern: chars2.map((c, i) => ({ char: c, index: i })),
      },
    });

    yield createEvent.message(
      `Any rotation of str1 must appear as a substring in str1+str1`,
      'explanation'
    );

    // Search for str2 in combined
    yield createEvent.highlight([7, 8, 9]);
    yield createEvent.message(
      `Searching for "${str2}" in "${combined}"...`,
      'step'
    );

    let found = false;
    let foundPos = -1;

    for (let i = 0; i <= combined.length - str2.length; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'position', value: i },
          { name: 'window', value: combined.substring(i, i + n) },
        ]
      );

      let match = true;
      for (let j = 0; j < n; j++) {
        if (combinedChars[i + j] !== chars2[j]) {
          match = false;
          break;
        }
      }

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: combinedChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx >= i && idx < i + n ? (match ? 'match' : 'current') : undefined,
          })),
          pattern: chars2.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: match ? 'match' : undefined,
          })),
          patternOffset: i,
        },
      });

      if (match) {
        found = true;
        foundPos = i;
        break;
      }
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([9, 10]);

    if (found) {
      yield createEvent.message(
        `Found "${str2}" at position ${foundPos} in "${combined}"`,
        'info'
      );

      // Emit result event
      yield createEvent.result(
        'boolean',
        true,
        `"${str2}" IS a rotation of "${str1}" (rotated by ${foundPos})`
      );

      // Show the rotation
      yield createEvent.message(
        `"${str1}" rotated by ${foundPos} positions = "${str2}" ✓`,
        'info'
      );

      // Mark all as sorted
      for (let i = 0; i < n; i++) {
        yield createEvent.mark([i], 'sorted');
      }

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: combinedChars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx >= foundPos && idx < foundPos + n ? 'found' : undefined,
          })),
          pattern: chars2.map((c, idx) => ({ char: c, index: idx, highlight: 'found' })),
          patternOffset: foundPos,
        },
      });
    } else {
      // Emit result event
      yield createEvent.result(
        'boolean',
        false,
        `"${str2}" is NOT a rotation of "${str1}"`
      );

      yield createEvent.message(
        `"${str2}" is NOT a rotation of "${str1}" ✗`,
        'info'
      );
    }
  },
};
