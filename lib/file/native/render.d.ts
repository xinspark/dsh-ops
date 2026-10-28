export declare const NATIVE_OUTPUT_BYTES: number;
/** Bound the final escaped content blocks, not the unescaped source text. */
export declare function capNativeText(text: string, maxBytes?: number, recovery?: string): string;
/** Native presentation is independent of the canonical execution value returned to PTC. */
export declare function renderNative(tool: string, args: unknown, result: unknown): string;
