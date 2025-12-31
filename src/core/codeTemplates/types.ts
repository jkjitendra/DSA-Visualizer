/**
 * Code Templates and Execution Types
 */

// Supported programming languages
export type SupportedLanguage = 'javascript' | 'java' | 'python' | 'cpp' | 'go';

// Language metadata
export interface LanguageInfo {
  id: SupportedLanguage;
  name: string;
  extension: string;
  monacoLanguage: string;
  executable: boolean;
  comingSoon?: boolean;
}

// All supported languages with metadata
export const LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    extension: '.js',
    monacoLanguage: 'javascript',
    executable: true,
  },
  java: {
    id: 'java',
    name: 'Java',
    extension: '.java',
    monacoLanguage: 'java',
    executable: false,
    comingSoon: true,
  },
  python: {
    id: 'python',
    name: 'Python',
    extension: '.py',
    monacoLanguage: 'python',
    executable: false,
    comingSoon: true,
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    monacoLanguage: 'cpp',
    executable: false,
    comingSoon: true,
  },
  go: {
    id: 'go',
    name: 'Go',
    extension: '.go',
    monacoLanguage: 'go',
    executable: false,
    comingSoon: true,
  },
};

// Algorithm categories
export type AlgorithmCategory = 'sorting' | 'searching' | 'graphs' | 'trees' | 'stacks-queues' | 'linked-lists';

// Category metadata
export interface CategoryInfo {
  id: AlgorithmCategory;
  name: string;
  icon: string;
  description: string;
}

// All algorithm categories
export const CATEGORIES: Record<AlgorithmCategory, CategoryInfo> = {
  sorting: {
    id: 'sorting',
    name: 'Sorting',
    icon: '📊',
    description: 'Algorithms that arrange elements in order',
  },
  searching: {
    id: 'searching',
    name: 'Searching',
    icon: '🔍',
    description: 'Algorithms that find elements in data structures',
  },
  graphs: {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    description: 'Graph traversal and pathfinding algorithms',
  },
  trees: {
    id: 'trees',
    name: 'Trees',
    icon: '🌳',
    description: 'Tree traversal and manipulation algorithms',
  },
  'stacks-queues': {
    id: 'stacks-queues',
    name: 'Stacks & Queues',
    icon: '📚',
    description: 'Stack and queue operations',
  },
  'linked-lists': {
    id: 'linked-lists',
    name: 'Linked Lists',
    icon: '🔗',
    description: 'Linked list operations and algorithms',
  },
};

// Code template for an algorithm in all languages
export interface AlgorithmCodeTemplates {
  algorithmId: string;
  algorithmName: string;
  category: AlgorithmCategory;
  templates: Record<SupportedLanguage, string>;
}

// Visualization event types (emitted by user code)
export type VisEventType =
  | 'compare'
  | 'swap'
  | 'set'
  | 'mark'
  | 'visit'
  | 'highlight'
  | 'message'
  | 'log';

// Visualization event from user code
export interface VisEvent {
  type: VisEventType;
  indices?: number[];
  value?: number;
  message?: string;
  markType?: string;
  timestamp: number;
}

// Execution result
export interface ExecutionResult {
  success: boolean;
  events: VisEvent[];
  logs: string[];
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  executionTime: number;
  finalArray: number[];
}

// Execution context passed to user code
export interface ExecutionContext {
  inputArray: number[];
  events: VisEvent[];
  logs: string[];
}
