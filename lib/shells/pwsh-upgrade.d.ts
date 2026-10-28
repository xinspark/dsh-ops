export declare const HOST_PWSH_UPGRADE_GUIDANCE = "Installs or upgrades the standard PowerShell 7 installation on Windows through WinGet. Restart DSH afterwards. An explicit host pwshPath is preserved and must be reviewed in host settings if it points elsewhere. Existing Windows PowerShell 5.1 and OPS provisioned files are not removed.";
export interface PwshUpgradePlan {
    supported: boolean;
    file?: string;
    args: readonly string[];
    guidance: string;
    unavailable?: string;
}
export interface UpgradeProcessResult {
    started: boolean;
    exitCode: number | null;
    signal: string | null;
    error?: string;
}
export type UpgradeRunner = (plan: PwshUpgradePlan & {
    file: string;
}, signal?: AbortSignal) => Promise<UpgradeProcessResult>;
export interface PwshUpgradeResult {
    status: 'preview' | 'unavailable' | 'completed' | 'no-update' | 'failed' | 'cancelled';
    effectState: 'none' | 'applied' | 'unknown';
    plan: PwshUpgradePlan;
    exitCode?: number | null;
    signal?: string | null;
    error?: string;
}
/** Use an absolute executable, never a command shell or a relative PATH entry. */
export declare function hostPwshUpgradePlan({ platform, env }?: {
    platform?: NodeJS.Platform;
    env?: NodeJS.ProcessEnv;
}): PwshUpgradePlan;
export declare function hostPwshVersion(options?: {
    platform?: NodeJS.Platform;
    env?: NodeJS.ProcessEnv;
    now?: () => number;
}): string | undefined;
/** CLI runner. A host UI may supply its subprocess runner and expose the installer interaction there. */
export declare const runUpgradeProcess: UpgradeRunner;
/** Cancellation stops the runner; an already-started installer may have effects and is never called rolled back. */
export declare function upgradeHostPwsh({ execute, dryRun, signal, runner, platform, env }?: {
    execute?: boolean;
    dryRun?: boolean;
    signal?: AbortSignal;
    runner?: UpgradeRunner;
    platform?: NodeJS.Platform;
    env?: NodeJS.ProcessEnv;
}): Promise<PwshUpgradeResult>;
