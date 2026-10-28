export type ProfileOperation = 'install' | 'uninstall' | 'status';
export interface ProfileCommandOptions {
    profile?: string;
    dshCli?: string;
    dryRun?: boolean;
}
export declare function profileCommand(operation: ProfileOperation, { profile, dshCli, dryRun }: ProfileCommandOptions): number;
