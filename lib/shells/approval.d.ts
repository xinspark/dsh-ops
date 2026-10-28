/** Per-call widening follows the pinned host approval vocabulary; grants are never cached. */
import type { ShellContext, ShellCall, ShellPolicy } from './types.js';
type EscalationArgs = Record<string, unknown> & {
    sandbox_permissions?: 'workspace-write' | 'danger-full-access';
    justification?: string;
};
export declare function validateBashEscalation(args: Record<string, unknown>, standing: ShellPolicy): asserts args is EscalationArgs;
export declare function approveBashPolicy(ctx: ShellContext, args: Record<string, unknown>, exec: ShellCall, standing: ShellPolicy): Promise<ShellPolicy>;
export {};
