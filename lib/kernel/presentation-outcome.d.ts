/** Bounded outcome facts persisted as host presentation metadata: replayable for UIs, never model-facing. */
export declare const OUTCOME_META = "opsOutcome";
type Json = string | number | boolean | null | Json[] | {
    [key: string]: Json;
};
/** Copy only status, the error code/effect and safe counters; paths, messages and payloads never leave the value. */
export declare function outcomeFacts(value: unknown): {
    [key: string]: Json;
};
/** dsh-tools `output.presentationMeta` for Native tools whose model text is not a JSON envelope. */
export declare function presentationMeta(_args: unknown, value: unknown): Json;
export {};
