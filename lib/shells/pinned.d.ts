interface PinnedBashOptions {
    file?: string;
    env?: NodeJS.ProcessEnv;
    bundleRoot?: string;
    required?: boolean;
}
export declare function pinnedBashExecutable(options: PinnedBashOptions & {
    required: false;
}): string | undefined;
export declare function pinnedBashExecutable(options?: PinnedBashOptions): string;
export {};
