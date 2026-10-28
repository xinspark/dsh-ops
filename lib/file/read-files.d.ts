type Descriptor = Record<string, unknown> & {
    path: string;
};
type ResolvedReads = {
    files: Descriptor[];
} | {
    error: string;
};
/** Resolve every range against this invocation's cwd; retain unknown fields for kernel validation. */
export declare function resolveReadFiles(args: unknown, cwd: string): ResolvedReads;
export {};
