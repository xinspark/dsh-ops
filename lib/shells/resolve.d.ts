/**
 * Resolution of the plugin's Bash runtime; PowerShell stays owned by the host.
 *
 * Together with the probes in `lib/shells/paths.js`, this module is the ONLY
 * place that answers "can this deployment run the plugin's bash / pwsh right
 * now, and where is the executable". A rung that
 * cannot be resolved reports `available: false` with the reason; it never
 * throws, so a missing shell degrades the prompt ladder instead of failing the
 * plugin.
 *
 * Contract: {@link resolveShells} is called synchronously during mount and its
 * result feeds the prompt ladder (`lib/policy.js` renders only the available
 * rungs). The other half of the contract — `publishShellTools`, called inside
 * one `ctx.effect` during mount — lives in `lib/shells/publish.js`.
 *
 * The bash rung's order is explicit config, the provisioned copy, the plugin's
 * own copy, then — only while the deployment allows a system shell — `PATH`
 * and the well-known install locations. On POSIX the machine's own bash IS the
 * rung (see `lib/shells/pins.js` for why there is no pinned POSIX payload), so
 * that gate is skipped there.
 *
 * @module dsh-ops/shells/resolve
 */
import type { ResolvedConfig } from '../config.js';
import type { ShellResolution } from './paths.js';
export interface ShellResolutionOptions {
    bundleRoot?: string;
    env?: NodeJS.ProcessEnv;
    platform?: string;
    arch?: string;
}
type ShellConfig = Partial<Pick<ResolvedConfig, 'bashPath' | 'publishBashTool' | 'allowSystemShellFallback'>>;
/**
 * Resolve both shell rungs for this configuration.
 *
 * Synchronous, side-effect free, and total: every failure mode becomes a
 * resolution with `available: false`, never a throw, because this runs during
 * mount where an exception would take the whole plugin down.
 * @param {import('../config.js').ResolvedConfig} config - the plugin configuration.
 * @param {object} [options] - resolution overrides, for tests and for a host
 *   resolving against a different root. Production callers pass none.
 * @param {string} [options.bundleRoot] - the plugin package root.
 * @param {NodeJS.ProcessEnv} [options.env] - the environment to probe.
 * @param {string} [options.platform] - `process.platform`.
 * @param {string} [options.arch] - `process.arch`.
 * @returns {{bash: import('./paths.js').ShellResolution, pwsh: import('./paths.js').ShellResolution}} one resolution per rung.
 */
export declare function resolveShells(config: ShellConfig | undefined, options?: ShellResolutionOptions): {
    bash: ShellResolution;
    pwsh: ShellResolution;
};
export {};
