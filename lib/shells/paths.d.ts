/**
 * Where each shell rung can come from, and in what order.
 *
 * This module is pure and read-only: it probes configured paths, the
 * provisioned copies `dsh-ops provision-shells` installed under
 * `<DSH_HOME>/dsh-ops/shells`, the copies a plugin package carries, and the
 * conventional install locations, and it NEVER mutates ambient state (no PATH
 * writes, no profile writes, no `process.chdir`).
 *
 * Legacy PowerShell probes remain available for compatibility and explicit
 * provisioning reports. Runtime mounting never activates those copies or
 * rewrites the host PowerShell configuration.
 *
 * The probes below are exported for their sibling modules under `lib/shells/`;
 * the barrel `lib/shells.js` re-exports only the public names.
 *
 * @module dsh-ops/shells/paths
 */
import type { ShellKind } from './pins.js';
export type ShellResolution = {
    available: true;
    file: string;
    source: string;
    detail: string;
} | {
    available: false;
    file?: undefined;
    source: string;
    detail: string;
};
export type BundledCause = 'no-manifest' | 'not-declared' | 'not-installed' | 'incomplete-tree';
interface BundleProbe {
    kind: ShellKind;
    bundleRoot: string;
    platform: string;
    arch: string;
}
/**
 * Historical PowerShell layout order, retained for compatibility probes only.
 * @type {readonly ['provisioned', 'package', 'vendor']}
 */
export declare const PWSH_LAYOUT_ORDER: readonly string[];
/**
 * One shell rung's resolution.
 * @typedef {object} ShellResolution
 * @property {boolean} available - whether this rung can run right now.
 * @property {string|undefined} file - the resolved executable, when available.
 * @property {string} source - where the answer came from, for reports and tests.
 *   One of `disabled`, `config`, `provisioned`, `bundled`, `path`, `well-known`,
 *   `missing`, `host`.
 * @property {string} detail - a one-line English explanation, for reports.
 */
/**
 * Whether a candidate names something this process can spawn.
 *
 * `lstat` is used deliberately: a symlink (the Node shape of a Windows Store
 * app-execution alias) is a valid executable even when its target is not
 * statable, a real directory never is, and any unexpected error answers `false`
 * rather than throwing out of a load-time probe.
 * @param {string|undefined} file - the candidate path.
 * @returns {boolean} whether the candidate exists and is not a directory.
 */
export declare function isSpawnableFile(file: unknown): file is string;
/**
 * The two layouts the plugin's own shell can arrive in, in the order they are
 * preferred. Phase C publishes `@dsh-ops/<kind>-<platform>-<arch>` (the shell
 * at `bin/<exe>`); a checkout that vendors its own copy uses
 * `vendor/<kind>/<platform>-<arch>/<exe>`.
 *
 * The ORDER is part of the contract, not an implementation detail: the L3
 * `!!js` override in `cordis.patch.yml` probes the same two places in the same
 * order (it cannot import this module — a bundle patch is plain YAML), so the
 * ladder's `available`/`file` and the host row's executable must agree for
 * every layout a deployment can present. `test/shells-resolution.test.mjs`
 * asserts that agreement against both layouts.
 * @type {readonly ['package', 'vendor']}
 */
export declare const BUNDLED_LAYOUT_ORDER: readonly string[];
/**
 * The vendored bundled shell inside the package, whether or not it exists.
 * @param {object} options - resolution inputs.
 * @param {'bash'|'pwsh'} options.kind - which rung.
 * @param {string} options.bundleRoot - the plugin package root.
 * @param {string} options.platform - `process.platform`.
 * @param {string} options.arch - `process.arch`.
 * @returns {string} the path the bundled copy would occupy.
 */
export declare function bundledShellPath({ kind, bundleRoot, platform, arch }: BundleProbe): string;
/**
 * Pick the bundled shell from the layout candidates, first existing wins.
 *
 * This is the ONE preference rule both the probe and the patch expression
 * implement; see {@link BUNDLED_LAYOUT_ORDER}.
 * @param {(string|undefined)[]} candidates - candidate paths, most preferred first.
 * @returns {string|undefined} the first existing candidate.
 */
export declare function preferredBundledFile(candidates: readonly (string | undefined)[]): string | undefined;
/**
 * The plugin's own copy of one shell, from whichever layout carries it: the
 * installed platform package first, then the vendored subdirectory.
 *
 * `cause` is carried alongside `detail` so a caller that has to act on the
 * miss — `resolveBash` in `lib/shells/resolve.js` chooses which remedy to
 * print — reads a fact
 * instead of parsing the sentence. It is additive: callers that only read
 * `file`/`detail` are unaffected.
 * @param {object} options - resolution inputs.
 * @param {'bash'|'pwsh'} options.kind - which rung.
 * @param {string} options.bundleRoot - the plugin package root.
 * @param {string} options.platform - `process.platform`.
 * @param {string} options.arch - `process.arch`.
 * @returns {{file: string|undefined, detail: string|undefined, cause: BundledCause|undefined}}
 *   the executable and, when there is none, why the plugin's own copy is
 *   unusable — as text for a report, and as the cause behind it.
 */
export declare function bundledShell({ kind, bundleRoot, platform, arch }: BundleProbe): {
    file: undefined;
    detail: string | undefined;
    cause: BundledCause | undefined;
} | {
    file: string;
    detail: undefined;
    cause: undefined;
};
/**
 * The provisioned copy of one shell, out of the plugin-managed store.
 *
 * Layout: `<DSH_HOME>/dsh-ops/shells/<kind>/<version>/<executableRelativePath>`
 * — the directory `dsh-ops provision-shells` installs the pinned upstream
 * release into. Every version directory that actually holds the executable is a
 * candidate, and the greatest version name wins.
 *
 * That comparison IS the whole rule, deliberately: `cordis.patch.yml`'s L3
 * expression implements the identical one, because a bundle patch is plain YAML
 * and cannot import this module, and the ladder's PowerShell rung and the host's
 * `pwsh-sandbox` row must keep pointing at the same file. The store holds one
 * version per shell in normal use; a leftover version directory is what the
 * comparison is there for.
 *
 * A copy installed here was digest-checked against {@link SHELL_UPSTREAM_PINS}
 * when it arrived, which is why it outranks anything already on the machine
 * while still sitting below `config.<kind>Path` and below a system fallback's
 * own off switch.
 * @param {object} options - resolution inputs.
 * @param {'bash'|'pwsh'} options.kind - which rung.
 * @param {NodeJS.ProcessEnv} options.env - the environment to read `DSH_HOME` from.
 * @param {string} [options.platform] - `process.platform`.
 * @param {string} [options.arch] - `process.arch`.
 * @returns {{file: string, version: string}|undefined} the executable and the
 *   version directory it came from, or undefined when the store has none.
 */
export declare function provisionedShell({ kind, env, platform, arch }: {
    kind: ShellKind;
    env: NodeJS.ProcessEnv;
    platform?: string;
    arch?: string;
}): {
    file: string;
    version: string;
} | undefined;
/**
 * One executable found by walking a PATH-shaped string.
 *
 * This is a read-only walk of the value it was handed: it never writes PATH and
 * never consults anything but the string it is given.
 * @param {object} options - search inputs.
 * @param {string[]} options.names - executable names to accept, in order.
 * @param {string|undefined} options.pathValue - the PATH value to walk.
 * @returns {string|undefined} the first existing entry, or undefined.
 */
export declare function fromPath({ names, pathValue, reject }: {
    names: readonly string[];
    pathValue?: string;
    reject?: (file: string) => boolean;
}): string | undefined;
/**
 * Windows ships `%SystemRoot%\\System32\\bash.exe` as the WSL distribution
 * launcher, not as a POSIX shell. Treating it as a normal PATH bash silently
 * moves commands into a Linux distribution, so it must never be selected by
 * the system fallback. `path.win32` is intentional: tests can exercise the
 * Windows resolver while running on another host platform.
 * @param {string} file - candidate executable.
 * @param {NodeJS.ProcessEnv} env - environment containing SystemRoot.
 * @param {string} platform - target platform.
 * @returns {boolean} whether the candidate is the WSL launcher.
 */
export declare function isWslBashLauncher(file: string, env: NodeJS.ProcessEnv, platform: string): boolean;
/**
 * The well-known install locations to probe for one rung.
 *
 * The bash list deliberately omits `%SystemRoot%\System32\bash.exe`: that is the
 * WSL distribution launcher, not a POSIX shell over the caller's filesystem, so
 * spawning it would silently run the command on a different machine. The pwsh
 * list keeps Windows PowerShell 5.1 last, matching upstream's own resolution
 * order (`packages/shell/pwsh-local/src/resolve.ts:21-37`).
 * @param {object} options - probe inputs.
 * @param {'bash'|'pwsh'} options.kind - which rung.
 * @param {NodeJS.ProcessEnv} options.env - the environment to read.
 * @param {string} options.platform - `process.platform`.
 * @returns {string[]} the candidate paths, in order.
 */
export declare function wellKnownCandidates({ kind, env, platform }: {
    kind: ShellKind;
    env: NodeJS.ProcessEnv;
    platform: string;
}): string[];
/**
 * The executable names one rung answers to.
 * @param {'bash'|'pwsh'} kind - which rung.
 * @param {string} platform - `process.platform`.
 * @returns {string[]} the names, in probe order.
 */
export declare function executableNames(kind: ShellKind, platform: string): string[];
/**
 * The remedy for a bash this deployment cannot place at all: the one action
 * that is right whatever the cause was, and therefore the one both the load
 * time detail and the spawn time failure fall back to. It is written once
 * because it is one decision — the spawn wording only adds the sentence's
 * closing period.
 */
export declare const GENERIC_BASH_REMEDY = "run `dsh-ops provision-shells --bash` to install the pinned upstream copy";
/**
 * The remedy for a POSIX host that has no bash at all.
 *
 * `dsh-ops provision-shells` provisions the *pinned Windows* payload and is
 * Windows-only, so pointing a Linux operator at it would be wrong: the one
 * action that helps is naming the executable explicitly.
 */
export declare const POSIX_BASH_REMEDY = "install bash with the distribution package manager, or set config.bashPath to the executable";
/**
 * Where a POSIX host keeps its own bash, in probe order.
 *
 * The same three locations cover Linux and the other non-Windows targets, so the
 * list is one fact rather than a per-distribution table: a distribution that put
 * bash elsewhere either has it on `PATH` (the rung above this one) or is served
 * by `config.bashPath`.
 *
 * `path.posix` is intentional for the same reason `path.win32` is used below:
 * this branch is selected by the TARGET platform, and the suite exercises it
 * while running on another host, so the candidates must not acquire a drive
 * letter or a backslash from the host's own `path` module.
 * @type {readonly string[]}
 */
export declare const POSIX_BASH_WELL_KNOWN: readonly string[];
/**
 * What to do about a bundled bash that is not there, chosen by cause.
 *
 * The two named causes are NOT interchangeable, and the difference is the whole
 * point of this mapping:
 *
 * - `not-installed` is the mirror shape. The manifest asked for the platform
 *   package, the registry the profile installed from did not carry it, and the
 *   package manager skipped it in silence (exit code 0, no warning). Nothing on
 *   this machine can repair a package that was never published there, so this
 *   line names that possibility and points at `dsh-ops provision-shells`, which
 *   bypasses the registry entirely. It deliberately does not say `repair`: that
 *   is the word issue #20 kept following into a dead end.
 * - `incomplete-tree` is the opposite: the package IS here and only its
 *   executable is missing, which reinstalling the profile's dependencies really
 *   does fix. That advice stays, with the registry-free copy offered beside it.
 *
 * Everything else — a package the manifest never declared, an unreadable
 * manifest, and any cause a future version adds without mapping it — falls
 * through to the provisioner alone. That is the explicit default branch (D8):
 * the resolution contract is "never throw", so an unmapped cause still gets a
 * line that is correct rather than silence.
 * @param {BundledCause|undefined} cause - why the plugin's own copy is unusable.
 * @returns {string} the remedy, as a clause that ends a detail line.
 */
export declare function bashRemedy(cause: BundledCause | undefined): string;
export {};
