import type { ShellContext, ShellCall, ShellPolicy, ExecutionOptions, ShellExecution } from './types.js';
export declare function startSessionBash({ ctx, bash, active }: {
    ctx: ShellContext;
    bash: {
        file: string;
        source: string;
    };
    active(): boolean;
}, args: Record<string, unknown>, exec: ShellCall, standing: ShellPolicy, policy: ShellPolicy, dshEnv: NodeJS.ProcessEnv, options: ExecutionOptions): ShellExecution;
