import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Operation type for array operations
 */
type ArrayOperationType =
  | 'insert-beginning'
  | 'insert-middle'
  | 'insert-index'
  | 'insert-end'
  | 'delete-beginning'
  | 'delete-middle'
  | 'delete-index'
  | 'delete-end'
  | 'update-beginning'
  | 'update-middle'
  | 'update-index'
  | 'update-end'
  | 'traversal'
  | 'linear-search'
  | 'access-index'
  | 'find-min'
  | 'find-max'
  | 'reverse';

/**
 * Complexity info for each operation
 */
const complexityInfo: Record<ArrayOperationType, { time: string; space: string; description: string }> = {
  'insert-beginning': { time: 'O(n)', space: 'O(1)', description: 'Shift all elements right, then insert' },
  'insert-middle': { time: 'O(n)', space: 'O(1)', description: 'Shift elements from middle to end' },
  'insert-index': { time: 'O(n)', space: 'O(1)', description: 'Shift elements from index to end' },
  'insert-end': { time: 'O(1)*', space: 'O(1)', description: 'Amortized O(1) for dynamic arrays' },
  'delete-beginning': { time: 'O(n)', space: 'O(1)', description: 'Shift all elements left after deletion' },
  'delete-middle': { time: 'O(n)', space: 'O(1)', description: 'Shift elements from middle to end' },
  'delete-index': { time: 'O(n)', space: 'O(1)', description: 'Shift elements from index to end' },
  'delete-end': { time: 'O(1)', space: 'O(1)', description: 'No shifting required' },
  'update-beginning': { time: 'O(1)', space: 'O(1)', description: 'Direct access via index 0' },
  'update-middle': { time: 'O(1)', space: 'O(1)', description: 'Direct access via index' },
  'update-index': { time: 'O(1)', space: 'O(1)', description: 'Direct access via index' },
  'update-end': { time: 'O(1)', space: 'O(1)', description: 'Direct access via last index' },
  'traversal': { time: 'O(n)', space: 'O(1)', description: 'Visit each element once' },
  'linear-search': { time: 'O(n)', space: 'O(1)', description: 'Worst case: element at end or not found' },
  'access-index': { time: 'O(1)', space: 'O(1)', description: 'Direct memory access via index' },
  'find-min': { time: 'O(n)', space: 'O(1)', description: 'Must check all elements' },
  'find-max': { time: 'O(n)', space: 'O(1)', description: 'Must check all elements' },
  'reverse': { time: 'O(n)', space: 'O(1)', description: 'Swap elements from both ends to middle' },
};

/**
 * Pseudocode for each operation
 */
const pseudocodeMap: Record<ArrayOperationType, string[]> = {
  'insert-beginning': [
    'function insertAtBeginning(arr, element):',
    '  // Shift all elements to the right',
    '  for i = n - 1 down to 0:',
    '    arr[i + 1] = arr[i]',
    '  // Insert at index 0',
    '  arr[0] = element',
    '  n = n + 1',
  ],
  'insert-middle': [
    'function insertAtMiddle(arr, element):',
    '  mid = n / 2',
    '  // Shift elements from mid to end',
    '  for i = n - 1 down to mid:',
    '    arr[i + 1] = arr[i]',
    '  // Insert at middle',
    '  arr[mid] = element',
    '  n = n + 1',
  ],
  'insert-index': [
    'function insertAtIndex(arr, index, element):',
    '  // Shift elements from index to end',
    '  for i = n - 1 down to index:',
    '    arr[i + 1] = arr[i]',
    '  // Insert at index',
    '  arr[index] = element',
    '  n = n + 1',
  ],
  'insert-end': [
    'function insertAtEnd(arr, element):',
    '  // Insert at the end (O(1))',
    '  arr[n] = element',
    '  n = n + 1',
  ],
  'delete-beginning': [
    'function deleteFromBeginning(arr):',
    '  deleted = arr[0]',
    '  // Shift all elements to the left',
    '  for i = 1 to n - 1:',
    '    arr[i - 1] = arr[i]',
    '  n = n - 1',
    '  return deleted',
  ],
  'delete-middle': [
    'function deleteFromMiddle(arr):',
    '  mid = n / 2',
    '  deleted = arr[mid]',
    '  // Shift elements from mid+1 to end',
    '  for i = mid + 1 to n - 1:',
    '    arr[i - 1] = arr[i]',
    '  n = n - 1',
    '  return deleted',
  ],
  'delete-index': [
    'function deleteAtIndex(arr, index):',
    '  deleted = arr[index]',
    '  // Shift elements from index+1 to end',
    '  for i = index + 1 to n - 1:',
    '    arr[i - 1] = arr[i]',
    '  n = n - 1',
    '  return deleted',
  ],
  'delete-end': [
    'function deleteFromEnd(arr):',
    '  deleted = arr[n - 1]',
    '  // Simply reduce size (O(1))',
    '  n = n - 1',
    '  return deleted',
  ],
  'update-beginning': [
    'function updateAtBeginning(arr, newValue):',
    '  oldValue = arr[0]',
    '  arr[0] = newValue',
    '  return oldValue',
  ],
  'update-middle': [
    'function updateAtMiddle(arr, newValue):',
    '  mid = n / 2',
    '  oldValue = arr[mid]',
    '  arr[mid] = newValue',
    '  return oldValue',
  ],
  'update-index': [
    'function updateAtIndex(arr, index, newValue):',
    '  oldValue = arr[index]',
    '  arr[index] = newValue',
    '  return oldValue',
  ],
  'update-end': [
    'function updateAtEnd(arr, newValue):',
    '  oldValue = arr[n - 1]',
    '  arr[n - 1] = newValue',
    '  return oldValue',
  ],
  'traversal': [
    'function traverse(arr):',
    '  for i = 0 to n - 1:',
    '    visit(arr[i])',
    '    // Process element',
  ],
  'linear-search': [
    'function linearSearch(arr, target):',
    '  for i = 0 to n - 1:',
    '    if arr[i] == target:',
    '      return i  // Found!',
    '  return -1  // Not found',
  ],
  'access-index': [
    'function accessByIndex(arr, index):',
    '  // Direct O(1) access',
    '  return arr[index]',
  ],
  'find-min': [
    'function findMin(arr):',
    '  min = arr[0]',
    '  for i = 1 to n - 1:',
    '    if arr[i] < min:',
    '      min = arr[i]',
    '  return min',
  ],
  'find-max': [
    'function findMax(arr):',
    '  max = arr[0]',
    '  for i = 1 to n - 1:',
    '    if arr[i] > max:',
    '      max = arr[i]',
    '  return max',
  ],
  'reverse': [
    'function reverse(arr):',
    '  left = 0, right = n - 1',
    '  while left < right:',
    '    swap(arr[left], arr[right])',
    '    left++, right--',
  ],
};

/**
 * Array Operations Algorithm
 * Comprehensive visualization of all fundamental array operations
 */
export const arrayOperations: IAlgorithm<ArrayInput> = {
  id: 'array-operations',
  name: 'Array Operations',
  category: 'arrays',
  difficulty: 'beginner',

  pseudocodeLines: pseudocodeMap['traversal'], // Default, changes based on parameter

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
        { value: 'access-index', label: 'Access by Index' },
        { value: 'linear-search', label: 'Linear Search' },
        { value: 'find-min', label: 'Find Minimum' },
        { value: 'find-max', label: 'Find Maximum' },
        { value: 'insert-beginning', label: 'Insert at Beginning' },
        { value: 'insert-middle', label: 'Insert at Middle' },
        { value: 'insert-index', label: 'Insert at Index' },
        { value: 'insert-end', label: 'Insert at End' },
        { value: 'delete-beginning', label: 'Delete from Beginning' },
        { value: 'delete-middle', label: 'Delete from Middle' },
        { value: 'delete-index', label: 'Delete at Index' },
        { value: 'delete-end', label: 'Delete from End' },
        { value: 'update-beginning', label: 'Update at Beginning' },
        { value: 'update-middle', label: 'Update at Middle' },
        { value: 'update-index', label: 'Update at Index' },
        { value: 'update-end', label: 'Update at End' },
        { value: 'reverse', label: 'Reverse Array' },
      ],
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'targetIndex',
      label: 'Target Index',
      default: 2,
      min: 0,
      max: 10,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'newValue',
      label: 'New Value',
      default: 99,
      min: 1,
      max: 100,
    } as AlgorithmParameter,
    {
      type: 'number',
      id: 'searchValue',
      label: 'Search Value',
      default: 5,
      min: 1,
      max: 100,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
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

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const operation = (params?.operation || 'traversal') as ArrayOperationType;
    const targetIndex = (params?.targetIndex || 2) as number;
    const newValue = (params?.newValue || 99) as number;
    const searchValue = (params?.searchValue || 5) as number;

    const arr = [...input.values];
    const n = arr.length;
    const complexity = complexityInfo[operation];

    // Show operation info
    yield createEvent.message(
      `Operation: ${operation.replace(/-/g, ' ').toUpperCase()}`,
      'info',
      0
    );
    yield createEvent.message(
      `Time Complexity: ${complexity.time} | Space Complexity: ${complexity.space}`,
      'info'
    );
    yield createEvent.message(
      complexity.description,
      'explanation'
    );

    // Update pseudocode
    yield createEvent.highlight([0]);

    // Run the appropriate operation
    switch (operation) {
      case 'traversal':
        yield* runTraversal(arr);
        break;
      case 'access-index':
        yield* runAccessIndex(arr, Math.min(targetIndex, n - 1));
        break;
      case 'linear-search':
        yield* runLinearSearch(arr, searchValue);
        break;
      case 'find-min':
        yield* runFindMin(arr);
        break;
      case 'find-max':
        yield* runFindMax(arr);
        break;
      case 'insert-beginning':
        yield* runInsertBeginning(arr, newValue);
        break;
      case 'insert-middle':
        yield* runInsertMiddle(arr, newValue);
        break;
      case 'insert-index':
        yield* runInsertAtIndex(arr, Math.min(targetIndex, n), newValue);
        break;
      case 'insert-end':
        yield* runInsertEnd(arr, newValue);
        break;
      case 'delete-beginning':
        yield* runDeleteBeginning(arr);
        break;
      case 'delete-middle':
        yield* runDeleteMiddle(arr);
        break;
      case 'delete-index':
        yield* runDeleteAtIndex(arr, Math.min(targetIndex, n - 1));
        break;
      case 'delete-end':
        yield* runDeleteEnd(arr);
        break;
      case 'update-beginning':
        yield* runUpdateBeginning(arr, newValue);
        break;
      case 'update-middle':
        yield* runUpdateMiddle(arr, newValue);
        break;
      case 'update-index':
        yield* runUpdateAtIndex(arr, Math.min(targetIndex, n - 1), newValue);
        break;
      case 'update-end':
        yield* runUpdateEnd(arr, newValue);
        break;
      case 'reverse':
        yield* runReverse(arr);
        break;
    }

    yield createEvent.message('Operation complete!', 'info');
  },
};

// ============ Operation Generators ============

function* runTraversal(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message(`Traversing array of ${n} elements`, 'step', 1);

  for (let i = 0; i < n; i++) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-compare)' }],
      [
        { name: 'i', value: i },
        { name: 'arr[i]', value: arr[i], highlight: true },
      ],
      `Visiting index ${i}`
    );
    yield createEvent.message(`Visiting arr[${i}] = ${arr[i]}`, 'explanation', 2);
    yield createEvent.mark([i], 'current');

    // Unmark after visiting
    if (i > 0) {
      yield createEvent.unmark([i - 1]);
    }
  }

  // Mark all as visited
  for (let i = 0; i < n; i++) {
    yield createEvent.mark([i], 'sorted');
  }
}

function* runAccessIndex(arr: number[], index: number): Generator<AlgoEvent, void, unknown> {
  yield createEvent.message(`Accessing element at index ${index}`, 'step', 1);
  yield createEvent.highlight([1, 2]);

  yield createEvent.pointer(
    [{ index, label: 'index', color: 'var(--color-accent-compare)' }],
    [
      { name: 'index', value: index },
      { name: 'arr[index]', value: arr[index], highlight: true },
    ],
    `Direct access: arr[${index}] = ${arr[index]}`
  );

  yield createEvent.mark([index], 'selected');
  yield createEvent.message(`Value at index ${index} is ${arr[index]}`, 'explanation');
}

function* runLinearSearch(arr: number[], target: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message(`Searching for ${target} in array`, 'step', 1);

  for (let i = 0; i < n; i++) {
    yield createEvent.highlight([1, 2]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-compare)' }],
      [
        { name: 'i', value: i },
        { name: 'arr[i]', value: arr[i], highlight: true },
        { name: 'target', value: target },
      ],
      `arr[${i}] == ${target} ?`
    );

    yield createEvent.compare([i, i], arr[i] === target ? 'eq' : 'lt');

    if (arr[i] === target) {
      yield createEvent.highlight([2, 3]);
      yield createEvent.mark([i], 'sorted');
      yield createEvent.message(`Found ${target} at index ${i}!`, 'info');
      return;
    }

    yield createEvent.message(`arr[${i}] = ${arr[i]} ≠ ${target}`, 'explanation');
  }

  yield createEvent.highlight([4]);
  yield createEvent.message(`${target} not found in array`, 'info');
}

function* runFindMin(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  let min = arr[0];
  let minIdx = 0;

  yield createEvent.message(`Finding minimum element`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.mark([0], 'minimum');
  yield createEvent.pointer(
    [{ index: 0, label: 'min', color: 'var(--color-accent-sorted)' }],
    [{ name: 'min', value: min, highlight: true }]
  );

  for (let i = 1; i < n; i++) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.pointer(
      [
        { index: minIdx, label: 'min', color: 'var(--color-accent-sorted)' },
        { index: i, label: 'i', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'min', value: min },
        { name: 'arr[i]', value: arr[i], highlight: true },
      ],
      `${arr[i]} < ${min} ?`
    );

    yield createEvent.compare([i, minIdx], arr[i] < min ? 'lt' : 'gt');

    if (arr[i] < min) {
      yield createEvent.unmark([minIdx]);
      min = arr[i];
      minIdx = i;
      yield createEvent.highlight([4]);
      yield createEvent.mark([minIdx], 'minimum');
      yield createEvent.message(`New minimum: ${min} at index ${minIdx}`, 'explanation');
    }
  }

  yield createEvent.message(`Minimum element: ${min} at index ${minIdx}`, 'info');
}

function* runFindMax(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  let max = arr[0];
  let maxIdx = 0;

  yield createEvent.message(`Finding maximum element`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.mark([0], 'maximum');
  yield createEvent.pointer(
    [{ index: 0, label: 'max', color: 'var(--color-accent-sorted)' }],
    [{ name: 'max', value: max, highlight: true }]
  );

  for (let i = 1; i < n; i++) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.pointer(
      [
        { index: maxIdx, label: 'max', color: 'var(--color-accent-sorted)' },
        { index: i, label: 'i', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'max', value: max },
        { name: 'arr[i]', value: arr[i], highlight: true },
      ],
      `${arr[i]} > ${max} ?`
    );

    yield createEvent.compare([i, maxIdx], arr[i] > max ? 'gt' : 'lt');

    if (arr[i] > max) {
      yield createEvent.unmark([maxIdx]);
      max = arr[i];
      maxIdx = i;
      yield createEvent.highlight([4]);
      yield createEvent.mark([maxIdx], 'maximum');
      yield createEvent.message(`New maximum: ${max} at index ${maxIdx}`, 'explanation');
    }
  }

  yield createEvent.message(`Maximum element: ${max} at index ${maxIdx}`, 'info');
}

function* runInsertBeginning(arr: number[], value: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message(`Inserting ${value} at beginning`, 'step', 1);
  yield createEvent.message(`Need to shift all ${n} elements to the right`, 'explanation');

  // Shift all elements right
  for (let i = n - 1; i >= 0; i--) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-swap)' }],
      [
        { name: 'i', value: i },
        { name: 'arr[i]', value: arr[i], highlight: true },
      ],
      `Shifting arr[${i}] → arr[${i + 1}]`
    );
    yield createEvent.message(`Moving arr[${i}] = ${arr[i]} to index ${i + 1}`, 'explanation');
    yield createEvent.set(i + 1, arr[i], 0);
  }

  // Insert at beginning
  yield createEvent.highlight([4, 5]);
  yield createEvent.message(`Inserting ${value} at index 0`, 'step');
  yield createEvent.set(0, value);
  yield createEvent.mark([0], 'sorted');
}

function* runInsertMiddle(arr: number[], value: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const mid = Math.floor(n / 2);

  yield createEvent.message(`Inserting ${value} at middle (index ${mid})`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.pointer([], [{ name: 'mid', value: mid }]);

  // Shift elements from mid to end
  for (let i = n - 1; i >= mid; i--) {
    yield createEvent.highlight([3, 4]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-swap)' }],
      [{ name: 'i', value: i }],
      `Shifting arr[${i}] → arr[${i + 1}]`
    );
    yield createEvent.set(i + 1, arr[i], 0);
  }

  // Insert at middle
  yield createEvent.highlight([5, 6]);
  yield createEvent.message(`Inserting ${value} at index ${mid}`, 'step');
  yield createEvent.set(mid, value);
  yield createEvent.mark([mid], 'sorted');
}

function* runInsertAtIndex(arr: number[], index: number, value: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message(`Inserting ${value} at index ${index}`, 'step', 1);

  // Shift elements from index to end
  for (let i = n - 1; i >= index; i--) {
    yield createEvent.highlight([2, 3]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-swap)' }],
      [{ name: 'i', value: i }],
      `Shifting arr[${i}] → arr[${i + 1}]`
    );
    yield createEvent.set(i + 1, arr[i], 0);
  }

  // Insert at index
  yield createEvent.highlight([4, 5]);
  yield createEvent.message(`Inserting ${value} at index ${index}`, 'step');
  yield createEvent.set(index, value);
  yield createEvent.mark([index], 'sorted');
}

function* runInsertEnd(arr: number[], value: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;

  yield createEvent.message(`Inserting ${value} at end (index ${n})`, 'step', 1);
  yield createEvent.highlight([1, 2]);
  yield createEvent.message(`No shifting required - O(1) operation!`, 'explanation');

  yield createEvent.set(n, value);
  yield createEvent.mark([n], 'sorted');
}

function* runDeleteBeginning(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const deleted = arr[0];

  yield createEvent.message(`Deleting element at beginning: ${deleted}`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.mark([0], 'pivot');
  yield createEvent.pointer(
    [{ index: 0, label: 'delete', color: 'var(--color-accent-swap)' }],
    [{ name: 'deleted', value: deleted, highlight: true }]
  );

  // Shift all elements left
  for (let i = 1; i < n; i++) {
    yield createEvent.highlight([3, 4]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-compare)' }],
      [{ name: 'i', value: i }],
      `Shifting arr[${i}] → arr[${i - 1}]`
    );
    arr[i - 1] = arr[i];
    yield createEvent.set(i - 1, arr[i - 1]);
  }

  yield createEvent.highlight([5]);
  yield createEvent.message(`Deleted ${deleted} from beginning`, 'info');
}

function* runDeleteMiddle(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const mid = Math.floor(n / 2);
  const deleted = arr[mid];

  yield createEvent.message(`Deleting element at middle (index ${mid}): ${deleted}`, 'step', 1);
  yield createEvent.highlight([1, 2]);
  yield createEvent.mark([mid], 'pivot');
  yield createEvent.pointer(
    [{ index: mid, label: 'mid', color: 'var(--color-accent-swap)' }],
    [
      { name: 'mid', value: mid },
      { name: 'deleted', value: deleted, highlight: true },
    ]
  );

  // Shift elements from mid+1 to end
  for (let i = mid + 1; i < n; i++) {
    yield createEvent.highlight([4, 5]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-compare)' }],
      [{ name: 'i', value: i }],
      `Shifting arr[${i}] → arr[${i - 1}]`
    );
    arr[i - 1] = arr[i];
    yield createEvent.set(i - 1, arr[i - 1]);
  }

  yield createEvent.highlight([6]);
  yield createEvent.message(`Deleted ${deleted} from middle`, 'info');
}

function* runDeleteAtIndex(arr: number[], index: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const deleted = arr[index];

  yield createEvent.message(`Deleting element at index ${index}: ${deleted}`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.mark([index], 'pivot');
  yield createEvent.pointer(
    [{ index, label: 'index', color: 'var(--color-accent-swap)' }],
    [
      { name: 'index', value: index },
      { name: 'deleted', value: deleted, highlight: true },
    ]
  );

  // Shift elements from index+1 to end
  for (let i = index + 1; i < n; i++) {
    yield createEvent.highlight([3, 4]);
    yield createEvent.pointer(
      [{ index: i, label: 'i', color: 'var(--color-accent-compare)' }],
      [{ name: 'i', value: i }],
      `Shifting arr[${i}] → arr[${i - 1}]`
    );
    arr[i - 1] = arr[i];
    yield createEvent.set(i - 1, arr[i - 1]);
  }

  yield createEvent.highlight([5]);
  yield createEvent.message(`Deleted ${deleted} from index ${index}`, 'info');
}

function* runDeleteEnd(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const deleted = arr[n - 1];

  yield createEvent.message(`Deleting element at end: ${deleted}`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.mark([n - 1], 'pivot');
  yield createEvent.pointer(
    [{ index: n - 1, label: 'end', color: 'var(--color-accent-swap)' }],
    [{ name: 'deleted', value: deleted, highlight: true }]
  );

  yield createEvent.highlight([2, 3]);
  yield createEvent.message(`No shifting required - O(1) operation!`, 'explanation');
  yield createEvent.unmark([n - 1]);

  yield createEvent.message(`Deleted ${deleted} from end`, 'info');
}

function* runUpdateBeginning(arr: number[], newValue: number): Generator<AlgoEvent, void, unknown> {
  const oldValue = arr[0];

  yield createEvent.message(`Updating element at beginning`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.pointer(
    [{ index: 0, label: 'index', color: 'var(--color-accent-compare)' }],
    [
      { name: 'oldValue', value: oldValue },
      { name: 'newValue', value: newValue, highlight: true },
    ]
  );

  yield createEvent.highlight([2]);
  arr[0] = newValue;
  yield createEvent.set(0, newValue, oldValue);
  yield createEvent.mark([0], 'sorted');

  yield createEvent.message(`Updated arr[0]: ${oldValue} → ${newValue}`, 'info');
}

function* runUpdateMiddle(arr: number[], newValue: number): Generator<AlgoEvent, void, unknown> {
  const mid = Math.floor(arr.length / 2);
  const oldValue = arr[mid];

  yield createEvent.message(`Updating element at middle (index ${mid})`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.pointer(
    [{ index: mid, label: 'mid', color: 'var(--color-accent-compare)' }],
    [
      { name: 'mid', value: mid },
      { name: 'oldValue', value: oldValue },
      { name: 'newValue', value: newValue, highlight: true },
    ]
  );

  yield createEvent.highlight([2, 3]);
  arr[mid] = newValue;
  yield createEvent.set(mid, newValue, oldValue);
  yield createEvent.mark([mid], 'sorted');

  yield createEvent.message(`Updated arr[${mid}]: ${oldValue} → ${newValue}`, 'info');
}

function* runUpdateAtIndex(arr: number[], index: number, newValue: number): Generator<AlgoEvent, void, unknown> {
  const oldValue = arr[index];

  yield createEvent.message(`Updating element at index ${index}`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.pointer(
    [{ index, label: 'index', color: 'var(--color-accent-compare)' }],
    [
      { name: 'index', value: index },
      { name: 'oldValue', value: oldValue },
      { name: 'newValue', value: newValue, highlight: true },
    ]
  );

  yield createEvent.highlight([2]);
  arr[index] = newValue;
  yield createEvent.set(index, newValue, oldValue);
  yield createEvent.mark([index], 'sorted');

  yield createEvent.message(`Updated arr[${index}]: ${oldValue} → ${newValue}`, 'info');
}

function* runUpdateEnd(arr: number[], newValue: number): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  const oldValue = arr[n - 1];

  yield createEvent.message(`Updating element at end`, 'step', 1);
  yield createEvent.highlight([1]);
  yield createEvent.pointer(
    [{ index: n - 1, label: 'end', color: 'var(--color-accent-compare)' }],
    [
      { name: 'oldValue', value: oldValue },
      { name: 'newValue', value: newValue, highlight: true },
    ]
  );

  yield createEvent.highlight([2]);
  arr[n - 1] = newValue;
  yield createEvent.set(n - 1, newValue, oldValue);
  yield createEvent.mark([n - 1], 'sorted');

  yield createEvent.message(`Updated arr[${n - 1}]: ${oldValue} → ${newValue}`, 'info');
}

function* runReverse(arr: number[]): Generator<AlgoEvent, void, unknown> {
  const n = arr.length;
  let left = 0;
  let right = n - 1;

  yield createEvent.message(`Reversing array using two pointers`, 'step', 1);
  yield createEvent.highlight([1]);

  while (left < right) {
    yield createEvent.highlight([2]);
    yield createEvent.pointer(
      [
        { index: left, label: 'left', color: 'var(--color-accent-compare)' },
        { index: right, label: 'right', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'left', value: left },
        { name: 'right', value: right },
        { name: 'arr[left]', value: arr[left], highlight: true },
        { name: 'arr[right]', value: arr[right], highlight: true },
      ],
      `Swapping arr[${left}] ↔ arr[${right}]`
    );

    yield createEvent.highlight([3]);
    yield createEvent.message(`Swapping ${arr[left]} ↔ ${arr[right]}`, 'explanation');

    // Swap
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    yield createEvent.swap([left, right]);

    yield createEvent.mark([left], 'sorted');
    yield createEvent.mark([right], 'sorted');

    yield createEvent.highlight([4]);
    left++;
    right--;
  }

  // Mark middle if odd length
  if (left === right) {
    yield createEvent.mark([left], 'sorted');
  }

  yield createEvent.message(`Array reversed!`, 'info');
}
