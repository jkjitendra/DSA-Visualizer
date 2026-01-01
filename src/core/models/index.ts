/**
 * Core data models for DSA Visualizer
 * These are canonical representations used across parsers, generators, and algorithms
 */

// ============ Array Models ============

export interface ArrayInput {
  values: number[];
}

// ============ String Models ============

export interface StringInput {
  text: string;
  pattern?: string;  // For pattern matching algorithms
  text2?: string;    // For comparison algorithms (LCS, anagram)
}

// ============ Tree Models ============

export interface TreeNode {
  id: string;
  value: number | string;
  left?: TreeNode;
  right?: TreeNode;
}

export interface TreeInput {
  root: TreeNode | null;
}

/**
 * Level-order representation for tree parsing
 * null represents empty nodes
 */
export type LevelOrderTree = (number | null)[];

// ============ Graph Models ============

export interface GraphNode {
  id: string;
  label?: string;
  /** Position for visualization (optional, set by layout or user drag) */
  x?: number;
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
  label?: string;
}

export interface GraphInput {
  nodes: GraphNode[];
  edges: GraphEdge[];
  isDirected: boolean;
  isWeighted: boolean;
}

// ============ Stack/Queue Models ============

export interface StackInput {
  values: (number | string)[];
}

export interface QueueInput {
  values: (number | string)[];
}

// ============ Linked List Models ============

export interface ListNode {
  id: string;
  value: number | string;
  next?: string; // ID of next node
}

export interface LinkedListInput {
  nodes: ListNode[];
  head: string | null;
}

// ============ Heap Models ============

export interface HeapInput {
  values: number[];
  type: 'min' | 'max';
}

// ============ Utility Types ============

/**
 * Union of all input types
 */
export type AnyInput =
  | ArrayInput
  | StringInput
  | TreeInput
  | GraphInput
  | StackInput
  | QueueInput
  | LinkedListInput
  | HeapInput;

/**
 * Input type guard helpers
 */
export const isArrayInput = (input: AnyInput): input is ArrayInput =>
  'values' in input && Array.isArray((input as ArrayInput).values);

export const isTreeInput = (input: AnyInput): input is TreeInput =>
  'root' in input;

export const isGraphInput = (input: AnyInput): input is GraphInput =>
  'nodes' in input && 'edges' in input;

export const isStringInput = (input: AnyInput): input is StringInput =>
  'text' in input && typeof (input as StringInput).text === 'string';
