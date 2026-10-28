/** Native worker bridge. Every execution uses DSH policy, confinement and process governance. */
import type { Context } from '../adapter/dsh/types.js';
import type { ToolRunContext } from '../adapter/dsh/types.js';
import type { EffectState } from '../kernel/outcome.js';
import type { WorkerInvokeConfig } from '../worker-boundary.js';
export { resolveWorker } from './runtime.js';
export declare function failure(code: string, message: string, effectState?: EffectState): {
    status: string;
    error: {
        code: string;
        phase: string;
        retryable: boolean;
        effectState: EffectState;
        nextAction: string;
        message: string;
    };
};
export declare function invoke(ctx: Context, file: string, tool: string, args: unknown, exec: ToolRunContext, signal?: AbortSignal, config?: WorkerInvokeConfig): Promise<unknown>;
