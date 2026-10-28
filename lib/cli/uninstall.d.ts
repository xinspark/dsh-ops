/**
 * `dsh-ops uninstall`: report and remove what this plugin (and older versions
 * of it) installed outside the profile, without touching the profile install
 * itself.
 *
 * Split out of `bin/dsh-ops.mjs`; the command's argv surface, output and exit
 * codes are unchanged.
 *
 * @module dsh-ops/cli/uninstall
 */
/**
 * Render a byte count for a human report.
 * @param {number} bytes - the size.
 * @returns {string} the size in the largest unit that keeps it readable.
 */
export declare function formatBytes(bytes: number): string;
/**
 * Measure a file or directory without following symbolic links out of the tree:
 * an unreadable entry reports zero rather than failing the report.
 * @param {string} entry - the path to measure.
 * @returns {number} the byte count.
 */
export declare function measure(entry: string): number;
/**
 * Describe the top-level entries of a directory, for reporting what a removal
 * would take with it.
 * @param {string} dir - the directory.
 * @returns {{name: string, bytes: number}[]} one row per entry, directories first.
 */
export declare function contentsOf(dir: string): {
    name: string;
    bytes: number;
}[];
/**
 * Report one directory and its contents under a section heading.
 * @param {string} label - the section heading.
 * @param {string} dir - the directory to describe.
 * @returns {{missing: boolean, rows: {name: string, bytes: number}[], bytes: number}} the report.
 */
export declare function reportDirectory(label: string, dir: string): {
    missing: boolean;
    rows: {
        name: string;
        bytes: number;
    }[];
    bytes: number;
};
/**
 * `uninstall`: remove what this plugin (and older versions of it) installed
 * outside the profile, and report the state it does not own.
 *
 * Removing the plugin itself is a profile operation — `dsh plugin --profile
 * <profile> remove dsh-ops`, or the `plugin_manager` `remove_bundle` tool — and
 * stays outside this command. What is inside: `<DSH_HOME>/dsh-ops` (provisioned
 * shells, and the FastCtx runtime older versions provisioned), and, only on
 * request, the leftover `~/.fastctx` state of the removed background component.
 *
 * Nothing is deleted without `--yes`, so a bare invocation is the report.
 *
 * @param {object} options - uninstall inputs.
 * @param {boolean} options.yes - perform the removals instead of reporting them.
 * @param {boolean} options.purgeFastctx - also remove FastCtx's own state directory.
 * @param {boolean} options.dryRun - report only, whatever `yes` says.
 * @returns {number} the exit code: 0 when the requested state is gone or absent, 1 when a removal failed.
 */
export declare function commandUninstall({ yes, purgeFastctx, dryRun }: {
    yes: boolean;
    purgeFastctx: boolean;
    dryRun: boolean;
}): 0 | 1;
