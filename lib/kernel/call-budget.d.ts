/** Bound this plugin's workers without changing host admission or tool registries. */
export declare const MAX_ACTIVE_CALLS = 2;
export declare const MAX_WAITING_CALLS = 8;
export declare class CallBudgetError extends Error {
    readonly code: 'CALL_LIMIT' | 'CANCELLED';
    constructor(code: 'CALL_LIMIT' | 'CANCELLED', message: string);
}
export declare function withCallBudget<T>(owner: object, sessionId: string, signal: AbortSignal | undefined, run: () => Promise<T>): Promise<T>;
