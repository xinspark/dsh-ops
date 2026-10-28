/**
 * Deprecated `dsh-ops/background` row.
 *
 * The background component (FastCtx-backed `ops_run_background` / `ops_job_*`) was removed.
 * Existing profiles still carry this row, so it keeps loading: it accepts any config without
 * validating it, publishes nothing, and says once that the row can be deleted.
 */
import type { Context } from '../../adapter/dsh/types.js';
export declare const name = "dsh-ops-background";
export declare const REMOVED_MESSAGE = "dsh-ops: the dsh-ops/background component (FastCtx background jobs) was removed in this version; it publishes no tools. Delete this row from the profile configuration.";
export declare function apply(ctx: Context | null | undefined, _config?: unknown): void;
