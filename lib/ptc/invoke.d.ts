import type { Context } from '../adapter/dsh/types.js';
import type { ToolRunContext } from '../adapter/dsh/types.js';
import type { ApiName, PtcConfig } from './config.js';
/** File APIs retain the same authority bridge; only batch participates in host jobs. */
export declare function monitoredInvoke(ctx: Context, file: string, tool: ApiName, args: unknown, exec: ToolRunContext, controller: AbortController, config: PtcConfig): Promise<unknown>;
