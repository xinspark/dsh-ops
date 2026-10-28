/**
 * Publishing the tools that run on the plugin's own shells, and the remedies a
 * spawn failure deserves.
 *
 * Legacy helper for direct callers; component mounts use mountSessionBash and
 * its scoped host-compatible definition instead. It returns the disposer for registrations
 * (today: the `ops_bash` tool backed by the plugin's own bash). Returning a
 * no-op disposer is valid.
 *
 * Why L2 publishes a tool instead of configuring an executor: `bash-local` has
 * no executable field (`packages/shell/bash-local/src/index.ts` — its `Config`
 * is `cwd`/`timeoutMs`/`maxTimeoutMs`/`maxOutputBytes`/`maxSpillBytes`/
 * `graceMs` only), so the only zero-internal-dependency way to run the plugin's
 * own bash is to publish `ops_bash` ourselves and execute through
 * `ctx.subprocess`. PowerShell stays owned by the host; OPS neither supplies an
 * executable nor rewrites the host executor configuration.
 *
 * A rung that is unavailable publishes nothing and reports why through the
 * context logger; it never throws, because a deployment without bash must still
 * load this plugin.
 *
 * @module dsh-ops/shells/publish
 */
import type { Context } from '../adapter/dsh/types.js';
import type { ResolvedConfig } from '../config.js';
import type { ShellResolution } from './paths.js';
/**
 * Publish the tools that run on the plugin's own shells.
 *
 * Today that is exactly one tool — `ops_bash`, bound to the resolved bash — and
 * nothing else: the host owns PowerShell and its executable selection. A rung
 * that is unavailable publishes nothing and reports why through the context
 * logger; it never throws, because a deployment without bash must still load
 * this plugin.
 * @param {object} ctx - a Cordis context carrying the tool registry.
 * @param {import('../config.js').ResolvedConfig} config - the plugin configuration.
 * @param {{bash: import('./paths.js').ShellResolution, pwsh: import('./paths.js').ShellResolution}} shells - the resolution to publish for.
 * @returns {() => void} the disposer for every registration made here.
 */
export declare function publishShellTools(ctx: Context, config: Pick<ResolvedConfig, 'publishBashTool'>, shells: {
    bash: ShellResolution;
    pwsh: ShellResolution;
}): () => void;
