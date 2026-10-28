import type { AtomicApi, BootApi, Context } from './types.js';
export interface CarrierHost {
    boot: BootApi;
    yaml: typeof import('yaml');
    atomic: AtomicApi;
}
export declare function service<T>(ctx: Pick<Context, 'get'>, name: string): T | undefined;
/** Scope helpers are deliberately lazy: load-time plugin evaluation needs no DSH scope package. */
export declare function loadScopes(): Promise<typeof import('@deepseek-ai/dsh-scope')>;
export declare function loadCarrierHost(anchor: string): Promise<CarrierHost>;
