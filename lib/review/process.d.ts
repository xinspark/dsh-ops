export interface CommandResult {
    code: number | null;
    stdout: string;
    stderr: string;
}
export interface CommandOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    signal?: AbortSignal;
}
export type Runner = (file: string, args: string[], options?: CommandOptions) => Promise<CommandResult>;
export declare const runCommand: Runner;
/** Drop inherited Git command/config overrides while retaining executable lookup. */
export declare function isolatedGitEnv(emptyConfig: string): NodeJS.ProcessEnv;
