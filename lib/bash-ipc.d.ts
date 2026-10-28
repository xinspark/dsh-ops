interface Runtime {
    file: string;
    env?: NodeJS.ProcessEnv;
    runtime?: string;
}
/** The one actionable explanation for a bash that restricted modes cannot run (#42). */
export declare function restrictedRemedy(file: string, source: string | undefined, why: string): string;
/** Whether restricted modes can run this bash, without copying or building anything. */
export declare function restrictedCompatibility(file: string, { platform }?: {
    platform?: NodeJS.Platform;
}): {
    compatible: boolean;
    reason: string;
    msysSha256?: undefined;
    expectedSha256?: undefined;
} | {
    compatible: boolean;
    msysSha256: string;
    expectedSha256: unknown;
    reason: string;
};
/** Per-call PATH for the verified private MSYS tree. */
export declare function privateRuntimePath(target: string, inheritedPath?: string): string;
/** How long a directory rename keeps being retried, and how long to wait between attempts.
 *  Cumulative budget is 2.5 s, deliberately above the window measured in #352: on Windows 11 26100
 *  the same rename that raises `EPERM` at +2 ms was observed to succeed only at +1639 ms,
 *  including from another process, with real-time antivirus off. A first 1.5 s budget covered the
 *  typical ~1.5 s recovery but sat just below that worst sample; the extra 1 s step covers it
 *  without waiting forever. Only sharing/ownership errors are retried — a permission that will
 *  never change still surfaces after the last delay. */
export declare const RENAME_RETRY_DELAYS_MS: readonly number[];
/** Rename a directory, tolerating the brief window in which Windows still holds the freshly written
 *  tree. Without this, a recovering cache fails on the first `EPERM` and reports "could not be
 *  quarantined" for a condition that is gone a moment later (#352).
 *
 *  `rename` and `wait` are injectable so a test can make the failure deterministic and assert the
 *  bound instead of sleeping on a real 2.5 s window. */
export declare function renameWithRetry(from: string, to: string, { rename, delays, wait, }?: {
    rename?: (from: string, to: string) => void;
    delays?: readonly number[];
    wait?: (ms: number) => void;
}): void;
/** Move one unverifiable generation aside, keeping the two most recent quarantines.
 *
 *  Renaming keeps a generation that may still belong to a running process intact, and gives the next
 *  attempt somewhere to stage into. The rename is retried by {@link renameWithRetry}; `rename` is
 *  injectable so the retry can be asserted with a deterministic transient failure rather than by
 *  waiting on a real Windows sharing window (#352). */
export declare function quarantineGeneration(target: string, { rename }?: {
    rename?: (from: string, to: string) => void;
}): string;
/** @param {string} file
 * @param {{home?: string, platform?: NodeJS.Platform, source?: string}} options */
export declare function confinedBash(file: string, { home, platform, source }?: {
    home?: string;
    platform?: NodeJS.Platform;
    source?: string;
}): Runtime;
export {};
