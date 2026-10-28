/**
 * Operator reporting for the `dsh-ops` CLI: the managed directories the
 * commands share, the `--config` row reader, and the read-only `ladder`
 * report of what this deployment resolves and which rungs the prompt ladder
 * actually renders.
 *
 * Split out of `bin/dsh-ops.mjs`; the command's argv surface, output and exit
 * codes are unchanged.
 *
 * @module dsh-ops/cli/report
 */
import type { ResolvedConfig } from '../config.js';
import type { ShellResolution } from '../shells.js';
type WorkerReport = {
    resolved: true;
    executable: string;
    source: string;
    error: null;
} | {
    resolved: false;
    executable: null;
    source: null;
    error: string;
};
interface ShellReport {
    available: boolean;
    executable: string | null;
    source: string;
    detail: string;
    restricted?: {
        compatible: boolean;
        reason: string;
    } | null;
}
interface LadderReport {
    worker: WorkerReport;
    shells: Record<'bash' | 'pwsh', ShellReport>;
    policy: string;
}
/**
 * The unit `uninstall` removes: `<DSH_HOME>/dsh-ops`, holding what older
 * versions installed outside the profile (the former FastCtx runtime under
 * `bin/` with its `runtime.json`) and the shells `provision-shells` installed.
 * @returns {string} the absolute directory.
 */
export declare function managedDir(): string;
/**
 * The per-user state directory the removed FastCtx background backend used.
 *
 * FastCtx resolved this from the environment the host process received —
 * `~/.fastctx`, holding `config.toml` and the background-job registry under
 * `jobs/`. This version never creates or reads it; `uninstall` only reports it,
 * and removes it when the operator asks (`--purge-fastctx`), so leftovers from
 * an older version can be cleaned up. Another FastCtx install may still own it.
 * @returns {string} the absolute directory.
 */
export declare function fastctxDataDir(): string;
/**
 * Read the `dsh-ops` row config a report should describe.
 *
 * The commands here are run outside a profile, so there is no loader to ask:
 * `--config` names a JSON file holding the row's own `config` object, and the
 * keys are the ones the row accepts. Passing it through `resolveConfig` is what
 * keeps this report and the plugin's mount answering the same question — an
 * unknown key fails here exactly as it would fail activation.
 * @param {string|undefined} file - the `--config` path, when one was given.
 * @returns {unknown} the raw row config.
 * @throws {Error} when the file cannot be read, does not parse, or is not an object.
 */
export declare function readRowConfig(file: string | undefined): Record<string, unknown>;
/**
 * The native worker resolution as a report value — the same `resolveWorker` the
 * file component runs at mount, including the packaged runtime's provenance
 * check. Nothing is spawned; the resolver's own error text explains a miss.
 * @param {import('../config.js').ResolvedConfig} config - the plugin configuration.
 * @returns {{resolved: boolean, executable: string|null, source: string|null, error: string|null}} the report value.
 */
export declare function workerReport(config: ResolvedConfig): WorkerReport;
/**
 * One shell rung as a report value: `executable` is null exactly when the rung
 * is unavailable, and `detail` is the resolver's own reason either way.
 * @param {import('../shells.js').ShellResolution} resolution - the rung's resolution.
 * @returns {{available: boolean, executable: string|null, source: string, detail: string}} the report value.
 */
export declare function shellReport(resolution: ShellResolution): ShellReport;
/**
 * Whether read-only / workspace-write sessions can run the resolved bash: they
 * accept only the pinned MSYS the IPC proxies were verified against (#42).
 * @param {import('../shells.js').ShellResolution} resolution - the bash rung.
 * @returns {{compatible: boolean, reason: string}|null} null when there is no bash to check.
 */
export declare function restrictedReport(resolution: ShellResolution): {
    compatible: boolean;
    reason: string;
} | null;
/**
 * The rungs this deployment can reach, from the same derivation the plugin's
 * prompt uses.
 *
 * The plugin asks the live registry; this command has no registry, so it
 * answers from resolution instead: a resolved native worker stands in for the
 * published file tools, and a resolved bash stands in for the published
 * `ops_bash` tool (which also needs the host's `subprocess` service).
 * `ladderLevels` still decides, so the rungs and their numbering come from the
 * renderer that ships them rather than from a second copy here.
 * @param {object} options - the ladder input.
 * @param {{resolved: boolean}} options.worker - the native worker report value.
 * @param {{bash: {available: boolean}, pwsh: {available: boolean}}} options.shells - the shell resolutions.
 * @param {import('../config.js').ResolvedConfig} options.config - the plugin configuration.
 * @returns {import('../policy.js').LadderLevels} the rungs.
 */
export declare function ladderFor({ worker, shells, config }: {
    worker: {
        resolved: boolean;
    };
    shells: {
        bash: {
            available: boolean;
        };
        pwsh: {
            available: boolean;
        };
    };
    config: ResolvedConfig;
}): {
    files: boolean;
    bash: boolean;
    pwsh: boolean;
};
/**
 * The `## Rung …` headings of a rendered ladder, as numbered titles.
 * @param {string} text - the rendered tooling section.
 * @returns {{number: number, title: string}[]} one entry per rendered rung, in render order.
 */
export declare function renderedRungs(text: string): {
    number: number;
    title: string;
}[];
/**
 * Print one ladder report for a human.
 * @param {object} report - the report value `commandLadder` assembled.
 * @returns {void}
 */
export declare function printLadder(report: LadderReport): void;
/**
 * `ladder`: report what this deployment resolves and which rungs the model is
 * actually told it can reach — the three questions a missing bundled shell
 * would otherwise need a fresh session to answer.
 *
 * Nothing is spawned. Missing rungs are the report,
 * not a failure, so the exit code is 0 whenever a report was produced and 1 only
 * for a config this command cannot honour.
 * @param {object} options - ladder inputs.
 * @param {boolean} options.json - print the machine-readable report instead of the human one.
 * @param {string|undefined} options.configFile - the `--config` path, when one was given.
 * @returns {number} the exit code.
 */
export declare function commandLadder({ json, configFile }: {
    json: boolean;
    configFile?: string;
}): 0 | 1;
export {};
