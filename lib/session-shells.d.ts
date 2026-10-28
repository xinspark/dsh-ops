import type { Context } from './adapter/dsh/types.js';
import type { Agent } from './adapter/dsh/types.js';
import type { ResolvedConfig } from './config.js';
import type { ShellResolution } from './shells/paths.js';
import type { ShellResult } from './shells/types.js';
/**
 * The workdir one session bash call runs in. Adapter placeholders for an unset
 * optional string are "" or whitespace, not a directory to run in: they fall
 * back to the session directory like an omitted value instead of failing the
 * spawn (the executor rejects paths that do not exist).
 *
 * A relative workdir is anchored at `session.header.cwd`, never at the helper
 * process's own cwd: that process belongs to the plugin host, and a caller's `.`
 * means the calling session's workspace (#180, #204 P3). Absolute paths are
 * returned unchanged, and a non-string still reaches the executor's own
 * validation rather than being coerced to the default. On Windows a
 * drive-relative path (`C:child`) is anchored at the session's drive when the
 * drives match and refused when they do not, because resolving it would consult
 * that drive's process-wide current directory — state a session does not own.
 *
 * A POSIX-style absolute workdir on a Windows session (#318) follows bash's own
 * spelling, which writes `/d/…` for `D:\…`: the drive-letter form is mapped
 * onto the Windows form and then anchored and validated like any other
 * absolute path, while a drive-less POSIX absolute (`/`, `/tmp/x`) is refused
 * outright — Windows would read it against the helper process's current drive,
 * the exact ambient base the anchoring here exists to remove, and where a decoy
 * directory made the command run in the wrong tree with exit 0.
 * @param {object} args - the tool call arguments.
 * @param {object} session - the authoritative DSH session.
 * @returns {string|undefined} the absolute workdir, or the session directory.
 * @throws {BashArgumentError} when a relative path has no absolute session workspace to anchor at,
 *   names a drive other than the session's, or is a drive-less POSIX absolute path on Windows.
 */
export declare function sessionWorkdir(args: {
    workdir?: unknown;
} | null | undefined, session: {
    header?: {
        cwd?: string;
    };
} | undefined): {} | undefined;
/**
 * The canonical value one refusing bash layer settles on.
 *
 * It is a complete `BASH_OUTPUT_SCHEMA` value rather than a bare `{ error }`.
 * The host validates every returned value against the schema this tool registers
 * (`ToolRuntime.createSuccessResult` → `validateJsonSchemaValue`) and throws
 * `ToolOutputError` — "returned invalid output" — for a value missing
 * `timedOut`/`timeoutMs`/`stdout`/`stderr`, which is exactly how a real failure's
 * cause was lost (#235).
 * @param {unknown} error - the failure the executor raised.
 * @returns {object} the settled value, still to be stamped with `status`.
 */
export declare function bashRefusalValue(error: unknown): ShellResult;
/** A row's per-Agent permission to publish its bash layer. */
export interface BashGate {
    /** Whether the row owns this Agent's mode. */
    allows(agent: Agent): boolean;
    /** Subscribe to gate changes; the callback runs a full reconcile. */
    watch?(notify: () => void): () => void;
}
export declare function mountSessionBash(ctx: Context, config: Pick<ResolvedConfig, 'publishBashTool'>, shells: {
    bash: ShellResolution;
}, gate?: BashGate): void;
