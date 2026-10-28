import type { ShellContext, ShellBase, ShellCall, CreateShellExecution, ShellJobs, HostShellDefinition } from './types.js';
export declare const HOST_MAX_BASH_TIMEOUT_MS = 600000;
export declare function hostBashDefinition(ctx: ShellContext, base: ShellBase, createExecution: CreateShellExecution, resolveWorkdir: (args: Record<string, unknown>, session: NonNullable<ShellCall['agent']>['session'] | undefined) => unknown, jobs?: ShellJobs): HostShellDefinition;
