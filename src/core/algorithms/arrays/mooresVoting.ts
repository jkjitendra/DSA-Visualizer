import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Moore's Voting Algorithm (Majority Element)
 * 
 * Find the element that appears more than n/2 times.
 * Two-phase approach: find candidate, then verify.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const mooresVoting: IAlgorithm<ArrayInput> = {
  id: 'moores-voting',
  name: "Moore's Voting",
  category: 'arrays',
  difficulty: 'intermediate',

  pseudocodeLines: [
    '// Phase 1: Find candidate',
    'function findCandidate(arr):',
    '  candidate = arr[0]',
    '  count = 1',
    '',
    '  for i = 1 to n - 1:',
    '    if count == 0:',
    '      candidate = arr[i]',
    '      count = 1',
    '    else if arr[i] == candidate:',
    '      count++',
    '    else:',
    '      count--',
    '',
    '// Phase 2: Verify candidate',
    '  actualCount = count occurrences',
    '  if actualCount > n/2:',
    '    return candidate  // Majority found!',
    '  return null  // No majority',
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
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    yield createEvent.message(
      `Moore's Voting: Find majority element (>n/2 occurrences)`,
      'info',
      0
    );
    yield createEvent.message(
      `Time: O(n) | Space: O(1)`,
      'info'
    );

    // Phase 1: Find candidate
    yield createEvent.highlight([0, 1, 2, 3]);
    yield createEvent.message(
      `Phase 1: Find candidate`,
      'step'
    );

    let candidate = arr[0];
    let count = 1;

    yield createEvent.pointer(
      [{ index: 0, label: 'i', color: 'var(--color-primary-500)' }],
      [
        { name: 'candidate', value: candidate, highlight: true },
        { name: 'count', value: count },
      ]
    );
    yield createEvent.mark([0], 'selected');
    yield createEvent.message(
      `Initialize: candidate = ${candidate}, count = 1`,
      'explanation'
    );

    // Show voting visualization
    yield createEvent.auxiliary({
      type: 'voting',
      votingData: {
        candidate,
        count,
        phase: 'finding',
      },
    });

    for (let i = 1; i < n; i++) {
      yield createEvent.highlight([5]);

      // Clear previous marks
      for (let j = 0; j < n; j++) {
        yield createEvent.unmark([j]);
      }
      yield createEvent.mark([i], 'current');

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'i', value: i },
          { name: 'arr[i]', value: arr[i], highlight: true },
          { name: 'candidate', value: candidate },
          { name: 'count', value: count },
        ]
      );

      if (count === 0) {
        yield createEvent.highlight([6, 7, 8]);
        candidate = arr[i];
        count = 1;
        yield createEvent.message(
          `count = 0 → New candidate: ${candidate}`,
          'step'
        );
        yield createEvent.mark([i], 'selected');
      } else if (arr[i] === candidate) {
        yield createEvent.highlight([9, 10]);
        count++;
        yield createEvent.message(
          `arr[${i}] = ${arr[i]} = candidate → count++ = ${count}`,
          'explanation'
        );
      } else {
        yield createEvent.highlight([11, 12]);
        count--;
        yield createEvent.message(
          `arr[${i}] = ${arr[i]} ≠ candidate ${candidate} → count-- = ${count}`,
          'explanation'
        );
      }

      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'candidate', value: candidate, highlight: count > 0 },
          { name: 'count', value: count, highlight: true },
        ],
        count === 0 ? 'Reset!' : `count = ${count}`
      );

      // Update voting visualization
      yield createEvent.auxiliary({
        type: 'voting',
        votingData: {
          candidate,
          count,
          phase: 'finding',
        },
      });
    }

    // Phase 2: Verify candidate
    yield createEvent.highlight([14, 15]);
    yield createEvent.message(
      `Phase 2: Verify that ${candidate} appears > ${Math.floor(n / 2)} times`,
      'step'
    );

    // Clear marks
    for (let j = 0; j < n; j++) {
      yield createEvent.unmark([j]);
    }

    // Count actual occurrences
    let actualCount = 0;
    for (let i = 0; i < n; i++) {
      yield createEvent.pointer(
        [{ index: i, label: 'i', color: 'var(--color-primary-500)' }],
        [
          { name: 'candidate', value: candidate },
          { name: 'actualCount', value: actualCount, highlight: true },
          { name: 'threshold', value: Math.floor(n / 2) + 1 },
        ]
      );

      if (arr[i] === candidate) {
        actualCount++;
        yield createEvent.mark([i], 'sorted');
        yield createEvent.message(
          `arr[${i}] = ${arr[i]} = candidate → count = ${actualCount}`,
          'explanation'
        );

        // Update voting visualization for verify phase
        yield createEvent.auxiliary({
          type: 'voting',
          votingData: {
            candidate,
            count: 0,
            phase: 'verifying',
            verifyCount: actualCount,
            threshold: Math.floor(n / 2),
          },
        });
      }
    }

    yield createEvent.highlight([16, 17, 18]);
    yield createEvent.pointer([], []);

    const threshold = Math.floor(n / 2);
    const isMajority = actualCount > threshold;

    // Final voting visualization
    yield createEvent.auxiliary({
      type: 'voting',
      votingData: {
        candidate,
        count: 0,
        phase: 'result',
        verifyCount: actualCount,
        threshold,
        isMajority,
      },
    });

    if (isMajority) {
      yield createEvent.message(
        `Majority element found: ${candidate} (appears ${actualCount} times, > ${threshold})`,
        'info'
      );
    } else {
      // Clear marks since no majority
      for (let j = 0; j < n; j++) {
        yield createEvent.unmark([j]);
      }
      yield createEvent.message(
        `No majority element! ${candidate} appears ${actualCount} times, need > ${threshold}`,
        'info'
      );
    }
  },
};
