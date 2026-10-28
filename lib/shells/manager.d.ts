export interface BashRuntimeOptions {
    env?: NodeJS.ProcessEnv;
    platform?: NodeJS.Platform;
    arch?: string;
}
export interface ManagedBashVersion {
    directory: string;
    version: string;
    owned: boolean;
    sha256?: string;
}
export interface BashRemovalOptions {
    env?: NodeJS.ProcessEnv;
    yes?: boolean;
    dryRun?: boolean;
}
export declare function managedBashInventory({ env }?: BashRuntimeOptions): ManagedBashVersion[];
/** Reports first; deletes only receipt-marked version directories after explicit operator confirmation. */
export declare function removeManagedBash({ env, yes, dryRun }?: BashRemovalOptions): {
    action: 'removed' | 'preview';
    versions: ManagedBashVersion[];
    kept: ManagedBashVersion[];
};
/** Only actual Git install layouts; no PATH launcher, WSL, shim or implicit shell switch. */
export declare function gitBashCandidates({ env, platform }?: BashRuntimeOptions): string[];
/** The row config is a reviewable selection; the host config editor owns persisting and remounting it. */
export declare function selectBashRuntime(source: 'managed' | 'git', options?: BashRuntimeOptions): {
    source: "git" | "managed";
    file: string;
    config: {
        bashPath: string;
    };
    restricted: {
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
};
