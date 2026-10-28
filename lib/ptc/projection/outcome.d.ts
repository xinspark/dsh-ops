import type { Outcome } from '../../kernel/outcome.js';
export type JsonValue = null | boolean | number | string | JsonValue[] | {
    [key: string]: JsonValue;
};
export type CanonicalData = {
    [key: string]: JsonValue;
};
export declare function record(value: unknown): CanonicalData | undefined;
export declare const count: (value: unknown) => number;
/** Incomplete observations without a safe cursor are errors with retained data, never fabricated pages. */
export declare function toOutcome(tool: string, args: unknown, value: unknown): Outcome<CanonicalData>;
