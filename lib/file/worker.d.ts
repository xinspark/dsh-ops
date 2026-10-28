/** Native file worker bridge. The host owns path resolution and DSH authority. */
import type { Context } from '../adapter/dsh/types.js';
import type { ToolRunContext } from '../adapter/dsh/types.js';
import type { EffectState } from '../kernel/outcome.js';
import type { WorkerInvokeConfig } from '../worker-boundary.js';
import { resolveWorker } from '../ptc/runtime.js';
export { resolveWorker };
export declare function failure(code: string, message: string, phase?: string, effectState?: EffectState): {
    status: string;
    phase: string;
    changed: number;
    matched: number;
    skipped: number;
    failed: number;
    complete: boolean;
    omitted: number;
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
