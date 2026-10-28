type Row = Record<string, unknown>;
/** Canonical metadata remains unchanged; Native needs one revision and one clear continuation per file. */
export declare function compactRanges(input: Row, value: Row): string[] | undefined;
export {};
