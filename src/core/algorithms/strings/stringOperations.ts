import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Core String Operations
 * 
 * Basic string operations demonstrating character-level manipulation.
 * Operations: Traversal, Reverse, Palindrome Check, String Comparison
 * 
 * Time Complexity: O(n) for most operations
 * Space Complexity: O(1) for in-place, O(n) for reverse
 */
export const stringOperations: IAlgorithm<ArrayInput> = {
  id: 'string-operations',
  name: 'String Operations',
  category: 'strings',
  difficulty: 'beginner',

  pseudocodeLines: [
    'function stringOperation(str, operation):',
    '  // Traversal',
    '  for i = 0 to length(str) - 1:',
    '    visit str[i]',
    '',
    '  // Reverse (in-place)',
    '  left = 0, right = length - 1',
    '  while left < right:',
    '    swap str[left] and str[right]',
    '    left++, right--',
    '',
    '  // Check Palindrome',
    '  for i = 0 to length/2:',
    '    if str[i] ≠ str[length-1-i]:',
    '      return false',
    '  return true',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'select',
      id: 'operation',
      label: 'Operation',
      default: 'traversal',
      options: [
        { value: 'traversal', label: 'Traversal' },
        { value: 'reverse', label: 'Reverse String' },
        { value: 'palindrome', label: 'Check Palindrome' },
        { value: 'compare', label: 'String Comparison' },
      ],
    } as AlgorithmParameter,
    {
      type: 'text',
      id: 'compareString',
      label: 'Compare With (for comparison)',
      default: 'HELLO',
      placeholder: 'Second string',
      maxLength: 20,
    } as AlgorithmParameter,
  ],

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

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'traversal') as string;
    const arr = [...input.values];
    const n = arr.length;

    // Convert to characters for display
    const chars = arr.map(v => String.fromCharCode(v));
    const str = chars.join('');

    yield createEvent.message(
      `String Operations: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`,
      'info',
      0
    );
    yield createEvent.message(
      `Input: "${str}" (${n} characters)`,
      'explanation'
    );

    // Show initial string
    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, i) => ({ char: c, index: i })),
      },
    });

    if (operation === 'traversal') {
      yield* runTraversal(arr, chars);
    } else if (operation === 'reverse') {
      yield* runReverse(arr, chars);
    } else if (operation === 'palindrome') {
      yield* runPalindromeCheck(arr, chars);
    } else if (operation === 'compare') {
      const compareStr = (params?.compareString as string) || 'HELLO';
      yield* runComparison(arr, chars, compareStr);
    }
  },
};

function* runTraversal(arr: number[], chars: string[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message('Traversing string character by character...', 'step');
  yield createEvent.highlight([2, 3]);

  for (let i = 0; i < n; i++) {
    yield createEvent.mark([i], 'current');
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'i', value: i },
        { name: 'char', value: chars[i], highlight: true },
        { name: 'code', value: arr[i] },
      ],
      `str[${i}] = '${chars[i]}'`
    );

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, idx) => ({
          char: c,
          index: idx,
          highlight: idx === i ? 'current' : (idx < i ? 'found' : undefined),
        })),
      },
    });

    yield createEvent.message(
      `Visiting index ${i}: '${chars[i]}' (ASCII: ${arr[i]})`,
      'explanation'
    );

    yield createEvent.unmark([i]);
  }

  yield createEvent.pointer([], []);
  yield createEvent.message(
    `Traversal complete! Visited all ${n} characters.`,
    'info'
  );

  // Mark all as found
  for (let i = 0; i < n; i++) {
    yield createEvent.mark([i], 'sorted');
  }
}

function* runReverse(arr: number[], chars: string[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const result = [...chars];

  yield createEvent.message('Reversing string using two pointers...', 'step');
  yield createEvent.highlight([5, 6, 7, 8]);

  let left = 0;
  let right = n - 1;

  while (left < right) {
    yield createEvent.pointer(
      [
        { index: left, label: 'left', color: 'var(--color-primary-500)' },
        { index: right, label: 'right', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'left', value: left },
        { name: 'right', value: right },
        { name: 'str[left]', value: result[left], highlight: true },
        { name: 'str[right]', value: result[right], highlight: true },
      ]
    );

    yield createEvent.compare([left, right]);
    yield createEvent.message(
      `Swapping '${result[left]}' at index ${left} with '${result[right]}' at index ${right}`,
      'explanation'
    );

    // Swap
    yield createEvent.swap([left, right]);
    const temp = result[left];
    result[left] = result[right];
    result[right] = temp;

    // Also swap in arr for visualization
    const tempVal = arr[left];
    arr[left] = arr[right];
    arr[right] = tempVal;

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: result.map((c, idx) => ({
          char: c,
          index: idx,
          highlight: idx === left || idx === right ? 'match' :
            (idx < left || idx > right ? 'found' : undefined),
        })),
      },
    });

    yield createEvent.mark([left, right], 'sorted');

    left++;
    right--;
  }

  yield createEvent.pointer([], []);
  yield createEvent.message(
    `Reverse complete! "${chars.join('')}" → "${result.join('')}"`,
    'info'
  );

  // Mark middle element if odd length
  if (n % 2 === 1) {
    yield createEvent.mark([Math.floor(n / 2)], 'sorted');
  }
}

function* runPalindromeCheck(arr: number[], chars: string[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const str = chars.join('');

  yield createEvent.message('Checking if string is a palindrome...', 'step');
  yield createEvent.highlight([11, 12, 13, 14]);

  let isPalindrome = true;
  const halfLen = Math.floor(n / 2);

  for (let i = 0; i < halfLen; i++) {
    const j = n - 1 - i;

    yield createEvent.pointer(
      [
        { index: i, label: 'i', color: 'var(--color-primary-500)' },
        { index: j, label: 'n-1-i', color: 'var(--color-secondary-500)' },
      ],
      [
        { name: 'i', value: i },
        { name: 'n-1-i', value: j },
        { name: 'str[i]', value: chars[i], highlight: true },
        { name: 'str[n-1-i]', value: chars[j], highlight: true },
      ],
      `'${chars[i]}' ${chars[i] === chars[j] ? '==' : '≠'} '${chars[j]}'`
    );

    yield createEvent.compare([i, j], chars[i] === chars[j] ? 'eq' : 'lt');

    if (chars[i] !== chars[j]) {
      isPalindrome = false;
      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: chars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i || idx === j ? 'mismatch' : undefined,
          })),
        },
      });
      yield createEvent.message(
        `Mismatch found: '${chars[i]}' ≠ '${chars[j]}' at positions ${i} and ${j}`,
        'explanation'
      );
      break;
    }

    yield createEvent.auxiliary({
      type: 'string-chars',
      stringChars: {
        text: chars.map((c, idx) => ({
          char: c,
          index: idx,
          highlight: idx === i || idx === j ? 'match' :
            (idx < i || idx > j ? 'found' : undefined),
        })),
      },
    });

    yield createEvent.message(
      `Match: '${chars[i]}' == '${chars[j]}'`,
      'explanation'
    );

    yield createEvent.mark([i, j], 'sorted');
  }

  // Mark middle element if palindrome and odd length
  if (isPalindrome && n % 2 === 1) {
    yield createEvent.mark([halfLen], 'sorted');
  }

  yield createEvent.pointer([], []);
  yield createEvent.highlight([14]);

  if (isPalindrome) {
    yield createEvent.message(
      `"${str}" IS a palindrome! ✓`,
      'info'
    );
  } else {
    yield createEvent.message(
      `"${str}" is NOT a palindrome. ✗`,
      'info'
    );
  }
}

function* runComparison(arr: number[], chars: string[], str2Input: string): Generator<AlgoEvent, void, unknown> {
  const str1 = chars.join('');
  const str2Chars = str2Input.split('');
  const str2 = str2Input;

  yield createEvent.message(
    `Comparing strings: "${str1}" vs "${str2}"`,
    'step'
  );

  yield createEvent.auxiliary({
    type: 'string-chars',
    stringChars: {
      text: chars.map((c, i) => ({ char: c, index: i })),
      pattern: str2Chars.map((c, i) => ({ char: c, index: i })),
    },
  });

  let result = 0; // 0 = equal, -1 = str1 < str2, 1 = str1 > str2
  let diffIndex = -1;

  const maxLen = Math.max(chars.length, str2Chars.length);
  for (let i = 0; i < maxLen; i++) {
    const c1 = i < chars.length ? chars[i] : '';
    const c2 = i < str2Chars.length ? str2Chars[i] : '';

    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'i', value: i },
        { name: 'str1[i]', value: c1 || 'EOF', highlight: true },
        { name: 'str2[i]', value: c2 || 'EOF', highlight: true },
      ],
      `'${c1}' vs '${c2}'`
    );

    if (c1 !== c2) {
      diffIndex = i;
      if (c1 < c2 || c1 === '') {
        result = -1;
      } else {
        result = 1;
      }

      yield createEvent.auxiliary({
        type: 'string-chars',
        stringChars: {
          text: chars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'mismatch' : undefined,
          })),
          pattern: str2Chars.map((c, idx) => ({
            char: c,
            index: idx,
            highlight: idx === i ? 'mismatch' : undefined,
          })),
        },
      });

      yield createEvent.message(
        `Difference found at index ${i}: '${c1}' ${result < 0 ? '<' : '>'} '${c2}'`,
        'explanation'
      );
      break;
    }

    yield createEvent.mark([i], 'sorted');
    yield createEvent.message(
      `Match at index ${i}: '${c1}' == '${c2}'`,
      'explanation'
    );
  }

  yield createEvent.pointer([], []);

  // Emit result event
  const areEqual = result === 0;
  yield createEvent.result(
    'boolean',
    areEqual,
    areEqual ? `Strings are EQUAL` : `Strings are NOT equal`
  );

  if (result === 0) {
    yield createEvent.message(
      `Strings are EQUAL: "${str1}" == "${str2}"`,
      'info'
    );
  } else if (result < 0) {
    yield createEvent.message(
      `"${str1}" < "${str2}" (difference at index ${diffIndex})`,
      'info'
    );
  } else {
    yield createEvent.message(
      `"${str1}" > "${str2}" (difference at index ${diffIndex})`,
      'info'
    );
  }
}
