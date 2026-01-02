import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, MatrixSearchState } from '../../events/events';

/**
 * Matrix Binary Search Algorithm
 * 
 * Searches for a target in a row-wise and column-wise sorted matrix.
 * The input array is treated as a flattened matrix.
 * 
 * Two approaches:
 * 1. Treat as 1D array and use binary search (for fully sorted matrix)
 * 2. Start from top-right corner (for row/column sorted matrix)
 * 
 * Time Complexity: O(log(m*n)) or O(m + n)
 * Space Complexity: O(1)
 */
export const matrixBinarySearch: IAlgorithm<ArrayInput> = {
  id: 'matrix-binary-search',
  name: 'Matrix Binary Search',
  category: 'searching',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function searchMatrix(matrix, target):',
    '  // Start from top-right corner',
    '  row = 0, col = cols - 1',
    '',
    '  while row < rows and col >= 0:',
    '    if matrix[row][col] == target:',
    '      return (row, col)  // Found!',
    '    else if matrix[row][col] > target:',
    '      col--  // Eliminate column',
    '    else:',
    '      row++  // Eliminate row',
    '',
    '  return (-1, -1)  // Not found',
  ],

  timeComplexity: {
    best: 'O(1)',
    average: 'O(m + n)',
    worst: 'O(m + n)',
  },

  spaceComplexity: 'O(1)',

  parameters: [
    {
      type: 'number',
      id: 'target',
      label: 'Target Value',
      default: 15,
      min: 0,
      max: 100,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'cols',
      label: 'Columns',
      default: 4,
      min: 2,
      max: 6,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length < 4) {
      return { ok: false, error: 'Array must have at least 4 elements for a 2x2 matrix' };
    }
    if (input.values.length > 24) {
      return { ok: false, error: 'Array size must be 24 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const target = (params?.target ?? 15) as number;
    const cols = (params?.cols ?? 4) as number;

    // Convert flat array to matrix (sorted)
    const sortedArr = [...input.values].sort((a, b) => a - b);
    const rows = Math.ceil(sortedArr.length / cols);

    // Create matrix from sorted array
    const matrix: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const idx = i * cols + j;
        if (idx < sortedArr.length) {
          row.push(sortedArr[idx]);
        }
      }
      matrix.push(row);
    }

    yield createEvent.message(
      `Matrix Binary Search: Find ${target} in ${rows}×${cols} matrix`,
      'info',
      0
    );
    yield createEvent.highlight([0]);

    // Update array display
    for (let i = 0; i < sortedArr.length; i++) {
      yield createEvent.set(i, sortedArr[i], input.values[i]);
    }

    // Create matrix state for visualization
    const createMatrixState = (
      currentrow?: number,
      currentcol?: number,
      foundCell?: { row: number; col: number },
      eliminatedCells?: { row: number; col: number }[]
    ): MatrixSearchState => ({
      matrix,
      rows,
      cols,
      currentRow: currentrow,
      currentCol: currentcol,
      foundCell,
      eliminatedCells,
    });

    yield createEvent.auxiliary({
      type: 'matrix',
      matrixSearchState: createMatrixState(),
      phase: 'initial',
    });

    yield createEvent.message(
      `Matrix (row and column sorted):`,
      'explanation'
    );

    for (let i = 0; i < rows; i++) {
      yield createEvent.message(
        `  Row ${i}: [${matrix[i].join(', ')}]`,
        'explanation'
      );
    }

    yield createEvent.message(
      `Strategy: Start from top-right corner. Move left if value > target, move down if value < target.`,
      'step'
    );
    yield createEvent.highlight([1, 2]);

    let row = 0;
    let col = cols - 1;
    let comparisons = 0;
    const eliminatedCells: { row: number; col: number }[] = [];

    yield createEvent.auxiliary({
      type: 'matrix',
      matrixSearchState: createMatrixState(row, col, undefined, eliminatedCells),
      phase: 'searching',
    });

    yield createEvent.pointer(
      [],
      [
        { name: 'row', value: row },
        { name: 'col', value: col },
        { name: 'target', value: target },
      ]
    );

    while (row < rows && col >= 0 && matrix[row] && matrix[row][col] !== undefined) {
      yield createEvent.highlight([4]);
      const currentVal = matrix[row][col];
      const flatIdx = row * cols + col;

      yield createEvent.auxiliary({
        type: 'matrix',
        matrixSearchState: createMatrixState(row, col, undefined, eliminatedCells),
        phase: 'searching',
      });

      yield createEvent.pointer(
        [{ index: flatIdx, label: `(${row},${col})`, color: 'var(--color-accent-current)' }],
        [
          { name: 'row', value: row },
          { name: 'col', value: col },
          { name: 'matrix[row][col]', value: currentVal, highlight: true },
          { name: 'target', value: target },
        ],
        `Checking matrix[${row}][${col}] = ${currentVal}`
      );

      yield createEvent.mark([flatIdx], 'current');
      comparisons++;

      if (currentVal === target) {
        yield createEvent.highlight([5, 6]);
        yield createEvent.compare([flatIdx, flatIdx], 'eq');
        yield createEvent.mark([flatIdx], 'sorted');
        yield createEvent.auxiliary({
          type: 'matrix',
          matrixSearchState: createMatrixState(row, col, { row, col }, eliminatedCells),
          phase: 'found',
        });
        yield createEvent.pointer(
          [{ index: flatIdx, label: 'FOUND!', color: 'var(--color-accent-sorted)' }],
          [
            { name: 'row', value: row },
            { name: 'col', value: col },
            { name: 'value', value: currentVal, highlight: true },
          ],
          `Found ${target} at (${row}, ${col})!`
        );
        yield createEvent.message(
          `Found ${target} at position (${row}, ${col})!`,
          'info'
        );
        yield createEvent.message(
          `Total comparisons: ${comparisons}`,
          'explanation'
        );
        yield createEvent.result('search', flatIdx, `Element Found at (${row}, ${col})`);
        return;
      } else if (currentVal > target) {
        yield createEvent.highlight([7, 8]);
        yield createEvent.compare([flatIdx, flatIdx], 'gt');
        yield createEvent.message(
          `${currentVal} > ${target}, eliminate column ${col} (move left)`,
          'explanation'
        );

        // Mark entire column as eliminated
        for (let r = row; r < rows && matrix[r]; r++) {
          if (matrix[r][col] !== undefined) {
            eliminatedCells.push({ row: r, col });
          }
        }

        yield createEvent.unmark([flatIdx]);
        col--;
      } else {
        yield createEvent.highlight([9, 10]);
        yield createEvent.compare([flatIdx, flatIdx], 'lt');
        yield createEvent.message(
          `${currentVal} < ${target}, eliminate row ${row} (move down)`,
          'explanation'
        );

        // Mark entire row (remaining part) as eliminated
        for (let c = 0; c <= col && matrix[row]; c++) {
          if (matrix[row][c] !== undefined) {
            eliminatedCells.push({ row, col: c });
          }
        }

        yield createEvent.unmark([flatIdx]);
        row++;
      }
    }

    yield createEvent.highlight([12]);
    yield createEvent.auxiliary({
      type: 'matrix',
      matrixSearchState: createMatrixState(undefined, undefined, undefined, eliminatedCells),
      phase: 'not-found',
    });
    yield createEvent.pointer([], []);
    yield createEvent.message(
      `${target} not found in the matrix`,
      'info'
    );
    yield createEvent.message(
      `Total comparisons: ${comparisons}`,
      'explanation'
    );
    yield createEvent.result('search', -1, 'Element Not Present');
  },
};
