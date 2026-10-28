export interface WorkerSelection {
    binaryPath?: string;
}
export interface RuntimeOptions {
    packageRoot?: string;
    env?: NodeJS.ProcessEnv;
    platform?: string;
    arch?: string;
}
export type WorkerResolution = {
    ok: true;
    file: string;
} | {
    ok: false;
    reason: string;
};
export declare const PACKAGE_ROOT: string;
export declare const PLATFORMS: readonly string[];
export declare function workerName(platform?: string): "dsh-ops-worker.exe" | "dsh-ops-worker";
/**
 * Resolve the worker without throwing, for a caller that has to *report* an
 * unresolvable host rather than fail on it — a test suite, whose convention for
 * "this host cannot answer" is `skipSuite` (exit 77) and never a crash while the
 * module is still loading.
 *
 * The support matrix is checked first, so an unsupported host gets the matrix's
 * own sentence and every other failure keeps the exact reason `resolveWorker`
 * would have thrown. `reason` is a complete clause a caller can put straight into
 * a skip message.
 *
 * @param {object} [config] - same as {@link resolveWorker}.
 * @param {object} [options] - same as {@link resolveWorker}.
 * @returns {{ok: true, file: string}|{ok: false, reason: string}} the attempt.
 */
export declare function tryResolveWorker(config?: WorkerSelection, options?: RuntimeOptions): WorkerResolution;
export declare function resolveWorker(config?: WorkerSelection, { packageRoot, env, platform, arch }?: RuntimeOptions): string;
