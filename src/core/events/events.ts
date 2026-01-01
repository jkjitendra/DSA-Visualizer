/**
 * Event types emitted by algorithms during execution.
 * These events are consumed by the player and visualizers.
 */

export type AlgoEventType =
  | 'compare'
  | 'swap'
  | 'set'
  | 'visit'
  | 'mark'
  | 'unmark'
  | 'message'
  | 'highlight'
  | 'metric'
  | 'push'
  | 'pop'
  | 'enqueue'
  | 'dequeue'
  | 'pointer'
  | 'auxiliary'
  | 'result';

/**
 * Auxiliary state for algorithm-specific visualizations
 */
export interface BucketData {
  id: number;
  label: string;
  values: number[];
  highlight?: boolean;
}

export interface HeapNode {
  value: number;
  index: number;
  highlight?: boolean;
  isRemoving?: boolean;
  swapWith?: number;  // Value being swapped with
  reason?: string;    // Why swap is happening
  left?: number;
  right?: number;
}

export interface CountArrayItem {
  index: number;
  count: number;
  highlight?: boolean;
}

export interface MergeData {
  leftArr: number[];
  rightArr: number[];
  leftIdx: number;
  rightIdx: number;
  leftStart: number;
  rightStart: number;
}

export interface GapData {
  gap: number;
  gaps: number[];  // Sequence so far
  currentIdx: number;
  comparingIdx: number;
}

export interface PartitionData {
  low: number;
  high: number;
  pivotIdx: number;
  pivotValue: number;
  i: number;  // Boundary of elements less than pivot
}

export interface RunData {
  runs: { start: number; end: number }[];
  currentRun?: number;
  phase: 'detecting' | 'sorting' | 'merging';
}

export interface ModeData {
  mode: 'quicksort' | 'heapsort' | 'insertion';
  depth: number;
  maxDepth: number;
  range: { lo: number; hi: number };
}

export interface VotingData {
  candidate: number | null;
  count: number;
  phase: 'finding' | 'verifying' | 'result';
  verifyCount?: number;
  threshold?: number;
  isMajority?: boolean;
}

// ============ String Visualization Data ============

export interface StringCharacterData {
  char: string;
  index: number;
  highlight?: 'match' | 'mismatch' | 'current' | 'pattern' | 'found';
  isPattern?: boolean;
}

export interface StringCharsState {
  text: StringCharacterData[];
  pattern?: StringCharacterData[];
  patternOffset?: number;  // Where pattern is aligned in text
  matchPositions?: number[];  // Found match positions
}

export interface FrequencyData {
  char: string;
  count: number;
  highlight?: boolean;
}

export interface FrequencyState {
  frequencies: FrequencyData[];
  frequencies2?: FrequencyData[];  // For comparison (anagram)
  isMatch?: boolean;
}

export interface LPSData {
  index: number;
  value: number;
  highlight?: boolean;
  prefixEnd?: number;  // For showing prefix-suffix relationship
  suffixStart?: number;
}

export interface LPSState {
  array: LPSData[];
  arrayType: 'lps' | 'z';  // LPS for KMP, Z for Z-algorithm
  currentBuildIndex?: number;
}

export interface HashState {
  textHash: number;
  patternHash: number;
  windowStart: number;
  windowEnd: number;
  base?: number;
  modulo?: number;
  isMatch?: boolean;
}

export interface DPCell {
  row: number;
  col: number;
  value: number;
  highlight?: 'current' | 'path' | 'max';
}

export interface DPTableState {
  rows: string[];  // Row labels (chars of string 1)
  cols: string[];  // Col labels (chars of string 2)
  cells: DPCell[];
  maxValue?: number;
  maxCell?: { row: number; col: number };
}

export interface AuxiliaryState {
  type: 'buckets' | 'heap' | 'count' | 'merge' | 'insertion' | 'gap' | 'partition' | 'runs' | 'mode' | 'voting' | 'string-chars' | 'frequency' | 'lps' | 'hash' | 'dp-table';
  phase?: string;
  buckets?: BucketData[];
  heap?: { nodes: HeapNode[]; heapSize: number };
  countArray?: CountArrayItem[];
  outputArray?: number[];
  sortedPortion?: number;
  currentDigit?: number;
  maxDigit?: number;
  mergeData?: MergeData;
  gapData?: GapData;
  partitionData?: PartitionData;
  runData?: RunData;
  modeData?: ModeData;
  votingData?: VotingData;
  // String visualization states
  stringChars?: StringCharsState;
  frequencyState?: FrequencyState;
  lpsState?: LPSState;
  hashState?: HashState;
  dpTableState?: DPTableState;
}

export interface BaseEvent {
  type: AlgoEventType;
  timestamp?: number;
}

export interface CompareEvent extends BaseEvent {
  type: 'compare';
  indices: [number, number];
  result?: 'lt' | 'gt' | 'eq';
}

export interface SwapEvent extends BaseEvent {
  type: 'swap';
  indices: [number, number];
}

export interface SetEvent extends BaseEvent {
  type: 'set';
  index: number;
  value: number | string;
  previousValue?: number | string;
}

export interface VisitEvent extends BaseEvent {
  type: 'visit';
  nodeId: string | number;
  from?: string | number;
}

export interface MarkEvent extends BaseEvent {
  type: 'mark';
  indices: number[];
  markType: 'sorted' | 'pivot' | 'current' | 'minimum' | 'maximum' | 'selected' | 'window';
}

export interface UnmarkEvent extends BaseEvent {
  type: 'unmark';
  indices: number[];
}

export interface MessageEvent extends BaseEvent {
  type: 'message';
  text: string;
  level?: 'info' | 'step' | 'explanation';
  highlightLine?: number;
}

export interface HighlightEvent extends BaseEvent {
  type: 'highlight';
  lineNumbers: number[];
}

export interface MetricEvent extends BaseEvent {
  type: 'metric';
  name: 'comparisons' | 'swaps' | 'visits' | 'operations';
  value: number;
  delta?: number;
}

export interface PushEvent extends BaseEvent {
  type: 'push';
  value: number | string;
  structure: 'stack' | 'queue';
}

export interface PopEvent extends BaseEvent {
  type: 'pop';
  value: number | string;
  structure: 'stack' | 'queue';
}

export interface EnqueueEvent extends BaseEvent {
  type: 'enqueue';
  value: number | string;
}

export interface DequeueEvent extends BaseEvent {
  type: 'dequeue';
  value: number | string;
}

export interface PointerEvent extends BaseEvent {
  type: 'pointer';
  pointers: { index: number; label: string; color?: string }[];
  variables: { name: string; value: string | number; highlight?: boolean }[];
  expression?: string;
}

export interface AuxiliaryEvent extends BaseEvent {
  type: 'auxiliary';
  state: AuxiliaryState;
}

export interface ResultEvent extends BaseEvent {
  type: 'result';
  resultType: 'string' | 'indices' | 'boolean' | 'frequency';
  value: string | number[] | boolean;
  label?: string;
}

export type AlgoEvent =
  | CompareEvent
  | SwapEvent
  | SetEvent
  | VisitEvent
  | MarkEvent
  | UnmarkEvent
  | MessageEvent
  | HighlightEvent
  | MetricEvent
  | PushEvent
  | PopEvent
  | EnqueueEvent
  | DequeueEvent
  | PointerEvent
  | AuxiliaryEvent
  | ResultEvent;

/**
 * Helper functions to create events
 */
export const createEvent = {
  compare: (indices: [number, number], result?: 'lt' | 'gt' | 'eq'): CompareEvent => ({
    type: 'compare',
    indices,
    result,
  }),

  swap: (indices: [number, number]): SwapEvent => ({
    type: 'swap',
    indices,
  }),

  set: (index: number, value: number | string, previousValue?: number | string): SetEvent => ({
    type: 'set',
    index,
    value,
    previousValue,
  }),

  visit: (nodeId: string | number, from?: string | number): VisitEvent => ({
    type: 'visit',
    nodeId,
    from,
  }),

  mark: (indices: number[], markType: MarkEvent['markType']): MarkEvent => ({
    type: 'mark',
    indices,
    markType,
  }),

  unmark: (indices: number[]): UnmarkEvent => ({
    type: 'unmark',
    indices,
  }),

  message: (text: string, level?: MessageEvent['level'], highlightLine?: number): MessageEvent => ({
    type: 'message',
    text,
    level,
    highlightLine,
  }),

  highlight: (lineNumbers: number[]): HighlightEvent => ({
    type: 'highlight',
    lineNumbers,
  }),

  metric: (name: MetricEvent['name'], value: number, delta?: number): MetricEvent => ({
    type: 'metric',
    name,
    value,
    delta,
  }),

  push: (value: number | string, structure: 'stack' | 'queue'): PushEvent => ({
    type: 'push',
    value,
    structure,
  }),

  pop: (value: number | string, structure: 'stack' | 'queue'): PopEvent => ({
    type: 'pop',
    value,
    structure,
  }),

  pointer: (
    pointers: { index: number; label: string; color?: string }[],
    variables: { name: string; value: string | number; highlight?: boolean }[],
    expression?: string
  ): PointerEvent => ({
    type: 'pointer',
    pointers,
    variables,
    expression,
  }),

  auxiliary: (state: AuxiliaryState): AuxiliaryEvent => ({
    type: 'auxiliary',
    state,
  }),

  result: (
    resultType: 'string' | 'indices' | 'boolean' | 'frequency',
    value: string | number[] | boolean,
    label?: string
  ): ResultEvent => ({
    type: 'result',
    resultType,
    value,
    label,
  }),
};
