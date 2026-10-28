/** Shared DSH permission vocabulary. Model inputs never select an authority mode. */
import type { SandboxExecutionPolicy, SandboxMode } from './adapter/dsh/types.js';
export type AuthorityPolicy = Pick<SandboxExecutionPolicy, 'mode' | 'workspaceRoot'>;
export declare const MODES: readonly SandboxMode[];
export declare function permissionError(policy: AuthorityPolicy, operation: string, required?: SandboxMode, message?: string, nextAction?: string): {
    code: "POLICY_DENIED";
    phase: "preflight";
    retryable: false;
    effectState: "none";
    permission: {
        current: SandboxMode;
        required: SandboxMode;
        operation: string;
        workspaceRoot: string;
    };
    message: string;
    nextAction: string;
};
export declare function denied(policy: AuthorityPolicy, operation: string, required?: SandboxMode, message?: string, nextAction?: string): {
    status: "rejected";
    error: {
        code: "POLICY_DENIED";
        phase: "preflight";
        retryable: false;
        effectState: "none";
        permission: {
            current: SandboxMode;
            required: SandboxMode;
            operation: string;
            workspaceRoot: string;
        };
        message: string;
        nextAction: string;
    };
    sandbox: {
        mode: SandboxMode;
    };
};
/** A changed snapshot is not proof that the current authorization is insufficient. */
export declare function authorityChanged(policy: Pick<AuthorityPolicy, 'mode'> | undefined, operation: string): {
    status: "error";
    error: {
        code: "AUTHORITY_CHANGED";
        phase: "preflight";
        retryable: false;
        effectState: "none";
        message: string;
        nextAction: string;
    };
    sandbox: {
        mode: SandboxMode | undefined;
    };
};
export declare function executionRestriction(operation: string): {
    code: "EXECUTION_RESTRICTED";
    phase: "execute";
    retryable: false;
    effectState: "unknown";
    message: string;
    nextAction: string;
};
type NormalizedDenial<T> = Omit<T, 'status' | 'error'> & {
    status: 'rejected';
    error: Omit<ReturnType<typeof permissionError>, 'phase' | 'effectState'> & Record<string, unknown> & {
        phase: unknown;
        effectState: unknown;
    };
};
/** Only additive, recognized native reasons prove a selector denial; legacy codes alone do not. */
export declare function normalizeNativeDenial<T extends Record<string, unknown>>(value: T, policy: AuthorityPolicy, operation: string, required?: SandboxMode): T | NormalizedDenial<T>;
export declare function normalizeNativeDenial(value: unknown, policy: AuthorityPolicy, operation: string, required?: SandboxMode): unknown;
export declare function credentialDenied(message: string): {
    status: "rejected";
    error: {
        code: "CREDENTIAL_DENIED";
        phase: "preflight";
        retryable: false;
        effectState: "none";
        message: string;
        nextAction: string;
    };
};
export {};
