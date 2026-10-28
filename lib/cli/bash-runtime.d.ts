interface BashRuntimeCommandOptions {
    force?: boolean;
    dryRun?: boolean;
    yes?: boolean;
    configFile?: string;
}
export declare function commandBashRuntime(action?: string, options?: BashRuntimeCommandOptions): number;
export {};
