/**
 * Result type for parsing
 */
export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

/**
 * Parser interface - converts raw input strings to canonical data structures
 * Strategy pattern - allows pluggable input formats
 */
export interface IParser<TOutput> {
  /** Unique identifier for the parser */
  id: string;

  /** Display label (e.g., "Comma-separated", "Edge list") */
  label: string;

  /** Placeholder text for input field */
  placeholder: string;

  /** Example input for help */
  example: string;

  /** Parse raw string input to typed output */
  parse(raw: string): ParseResult<TOutput>;

  /** Format typed data back to string (for editing) */
  stringify?(data: TOutput): string;
}

/**
 * Parser factory interface
 */
export interface IParserFactory<TOutput> {
  getParser(formatId: string): IParser<TOutput> | undefined;
  getAvailableParsers(): Array<{ id: string; label: string }>;
}
