import type { EffectState, FailureStatus, RetryPolicy } from './outcome.js';
export interface ErrorPolicy {
    readonly status: FailureStatus;
    readonly retry: RetryPolicy;
}
/** Stable native/host codes retain their spelling. This table does not change current wire errors. */
export declare const ERROR_POLICIES: Readonly<Record<string, ErrorPolicy>>;
/** Effects dominate retry advice: a failed receipt never licenses replaying a possible write. */
export declare function errorPolicy(code: string, effectState?: EffectState): ErrorPolicy;
