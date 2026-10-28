/** Reviewed replacement choices, shared with the browser without importing host code. */
export declare const RAW_OFFICIAL_REPLACEMENTS: Readonly<{
    readonly read: "inspect_local_file";
    readonly glob: "glob";
    readonly grep: "grep";
}>;
export type OfficialReplacement = keyof typeof RAW_OFFICIAL_REPLACEMENTS;
export declare const OFFICIAL_REPLACEMENT_NAMES: readonly ("glob" | "grep" | "read")[];
