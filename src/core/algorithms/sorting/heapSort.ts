import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HeapNode } from '../../events/events';

/**
 * Heap Sort Algorithm
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * 
 * Build a max-heap, then extract elements one by one.
 */
export const heapSort: IAlgorithm<ArrayInput> = {
  id: 'heap-sort',
  name: 'Heap Sort',
  category: 'sorting',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function heapSort(arr, n):',
    '  // Build max heap (rearrange array)',
    '  for i = n/2 - 1 down to 0:',
    '    heapify(arr, n, i)',
    '',
    '  // Extract elements from heap one by one',
    '  for i = n - 1 down to 1:',
    '    swap(arr[0], arr[i])  // Move max to end',
    '    heapify(arr, i, 0)    // Heapify reduced heap',
    '',
    'function heapify(arr, heapSize, rootIdx):',
    '  largest = rootIdx',
    '  left = 2 * rootIdx + 1',
    '  right = 2 * rootIdx + 2',
    '',
    '  // Compare with left child',
    '  if left < heapSize AND arr[left] > arr[largest]:',
    '    largest = left',
    '',
    '  // Compare with right child',
    '  if right < heapSize AND arr[right] > arr[largest]:',
    '    largest = right',
    '',
    '  // If largest is not root, swap and continue',
    '  if largest != rootIdx:',
    '    swap(arr[rootIdx], arr[largest])',
    '    heapify(arr, heapSize, largest)  // Recursively heapify',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(1)',

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of numbers' };
    }
    if (input.values.length === 0) {
      return { ok: false, error: 'Array cannot be empty' };
    }
    if (input.values.length > 50) {
      return { ok: false, error: 'Array size must be 50 or less for visualization' };
    }
    if (!input.values.every((v) => typeof v === 'number' && !isNaN(v))) {
      return { ok: false, error: 'All elements must be valid numbers' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    const arr = [...input.values];
    const n = arr.length;

    // Helper to create heap tree visualization
    const getHeapNodes = (
      heapSize: number,
      highlightIdx?: number,
      removingIdx?: number,
      swapWithValue?: number,
      reason?: string
    ): HeapNode[] => {
      return arr.map((value, index) => ({
        value,
        index,
        highlight: index === highlightIdx,
        isRemoving: index === removingIdx,
        swapWith: index === removingIdx ? swapWithValue : undefined,
        reason: index === removingIdx ? reason : undefined,
        left: 2 * index + 1 < heapSize ? 2 * index + 1 : undefined,
        right: 2 * index + 2 < heapSize ? 2 * index + 2 : undefined,
      }));
    };

    yield createEvent.message(`Starting Heap Sort with ${n} elements`);
    yield createEvent.highlight([0]);

    // Show initial heap structure
    yield createEvent.auxiliary({
      type: 'heap',
      phase: 'Initial Array',
      heap: { nodes: getHeapNodes(n), heapSize: n },
    });

    // Build max heap
    yield createEvent.message('Phase 1: Building max heap');
    yield createEvent.highlight([2, 3, 4]);

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      yield createEvent.auxiliary({
        type: 'heap',
        phase: 'Building Heap',
        heap: { nodes: getHeapNodes(n, i), heapSize: n },
      });
      yield* heapify(arr, n, i, getHeapNodes);
    }

    yield createEvent.message('✓ Max heap built! Phase 2: Extracting elements one by one');
    yield createEvent.highlight([5, 6, 7, 8]);

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
      const maxElement = arr[0];
      const swapWithElement = arr[i];

      // Step 1: Show node being removed (red pulsing animation) with swap context
      yield createEvent.message(`🔴 Removing max element: ${maxElement} from heap root`);
      yield createEvent.highlight([6, 7]);

      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Removing: ${maxElement}`,
        heap: {
          nodes: getHeapNodes(
            i + 1,
            undefined,
            0,
            swapWithElement,
            `Swapping with ${swapWithElement} (last unsorted element) to place ${maxElement} in final position ${i}`
          ),
          heapSize: i + 1
        },
      });

      yield createEvent.pointer(
        [
          { index: 0, label: '⬆ MAX', color: 'var(--color-accent-sorted)' },
        ],
        [
          { name: 'maxElement', value: maxElement, highlight: true },
          { name: 'heapSize', value: i + 1, highlight: false },
          { name: 'targetPos', value: i, highlight: true },
        ],
        `Max = ${maxElement} will move to index ${i}`
      );

      // Step 2: Show swap about to happen
      yield createEvent.pointer(
        [
          { index: 0, label: 'MAX', color: 'var(--color-accent-sorted)' },
          { index: i, label: 'END', color: 'var(--color-accent-swap)' },
        ],
        [
          { name: 'arr[0]', value: arr[0], highlight: true },
          { name: `arr[${i}]`, value: arr[i], highlight: true },
        ],
        `Swapping arr[0]=${arr[0]} ↔ arr[${i}]=${arr[i]}`
      );

      // Step 3: Perform the swap
      yield createEvent.swap([0, i]);
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      // Step 4: Show the element is now in sorted position
      yield createEvent.message(`✓ ${maxElement} placed at position ${i} (sorted)`);
      yield createEvent.mark([i], 'sorted');

      yield createEvent.pointer(
        [
          { index: i, label: '✓ SORTED', color: 'var(--color-accent-sorted)' },
        ],
        [
          { name: 'sorted', value: maxElement, highlight: true },
          { name: 'newHeapSize', value: i, highlight: false },
        ],
        `${maxElement} is now in its final sorted position!`
      );

      // Step 5: Show reduced heap (max element removed)
      yield createEvent.auxiliary({
        type: 'heap',
        phase: `Removed ${maxElement} - Heapifying`,
        heap: { nodes: getHeapNodes(i, 0), heapSize: i },
      });

      // Step 6: Heapify the reduced heap
      if (i > 1) {
        yield createEvent.message(`Re-heapifying to restore max-heap property (size=${i})`);
        yield* heapify(arr, i, 0, getHeapNodes);
      }
    }

    yield createEvent.mark([0], 'sorted');
    yield createEvent.auxiliary({
      type: 'heap',
      phase: 'Complete',
      heap: { nodes: getHeapNodes(0), heapSize: 0 },
    });
    yield createEvent.pointer([], [], '');
    yield createEvent.message('Array is now sorted!');
    yield createEvent.highlight([9]);
  },
};

function* heapify(
  arr: number[],
  n: number,
  i: number,
  getHeapNodes: (heapSize: number, highlightIdx?: number) => HeapNode[]
): Generator<AlgoEvent, void, unknown> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Highlight: largest = rootIdx, left = 2*rootIdx+1, right = 2*rootIdx+2
  yield createEvent.highlight([10, 11, 12]);

  yield createEvent.pointer(
    [{ index: i, label: 'root', color: 'var(--color-accent-current)' }],
    [
      { name: 'rootIdx', value: i, highlight: true },
      { name: 'left', value: left, highlight: false },
      { name: 'right', value: right, highlight: false },
      { name: 'largest', value: largest, highlight: true },
    ],
    `heapify(${i}): checking children at ${left}, ${right}`
  );

  if (left < n) {
    // Highlight: if left < heapSize AND arr[left] > arr[largest]
    yield createEvent.highlight([15, 16]);
    yield createEvent.compare([left, largest]);

    yield createEvent.pointer(
      [
        { index: i, label: 'root', color: 'var(--color-accent-current)' },
        { index: left, label: 'left', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'arr[left]', value: arr[left], highlight: true },
        { name: 'arr[largest]', value: arr[largest], highlight: true },
      ],
      `Compare left child: ${arr[left]} > ${arr[largest]} = ${arr[left] > arr[largest]}`
    );

    if (arr[left] > arr[largest]) {
      largest = left;
      yield createEvent.highlight([16]); // largest = left
    }
  }

  if (right < n) {
    // Highlight: if right < heapSize AND arr[right] > arr[largest]
    yield createEvent.highlight([19, 20]);
    yield createEvent.compare([right, largest]);

    yield createEvent.pointer(
      [
        { index: i, label: 'root', color: 'var(--color-accent-current)' },
        { index: right, label: 'right', color: 'var(--color-accent-compare)' },
      ],
      [
        { name: 'arr[right]', value: arr[right], highlight: true },
        { name: 'arr[largest]', value: arr[largest], highlight: true },
      ],
      `Compare right child: ${arr[right]} > ${arr[largest]} = ${arr[right] > arr[largest]}`
    );

    if (arr[right] > arr[largest]) {
      largest = right;
      yield createEvent.highlight([20]); // largest = right
    }
  }

  if (largest !== i) {
    // Highlight: if largest != rootIdx, swap, recurse
    yield createEvent.highlight([23, 24, 25]);

    yield createEvent.pointer(
      [
        { index: i, label: 'parent', color: 'var(--color-accent-compare)' },
        { index: largest, label: 'largest', color: 'var(--color-accent-swap)' },
      ],
      [
        { name: 'parent', value: arr[i], highlight: false },
        { name: 'largest', value: arr[largest], highlight: true },
      ],
      `Swapping ${arr[i]} with ${arr[largest]}`
    );

    yield createEvent.swap([i, largest]);
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    yield createEvent.auxiliary({
      type: 'heap',
      phase: 'Heapify',
      heap: { nodes: getHeapNodes(n, largest), heapSize: n },
    });

    // Highlight recursive call
    yield createEvent.highlight([25]);
    yield* heapify(arr, n, largest, getHeapNodes);
  }
}
