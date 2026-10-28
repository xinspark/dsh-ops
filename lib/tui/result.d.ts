export declare const BUSINESS_OUTCOMES: readonly ["completed", "planned", "rejected", "error", "partial", "unknown", "unconfirmed"];
export type BusinessOutcome = typeof BUSINESS_OUTCOMES[number];
interface ResultSummary {
    done?: number;
    total?: number;
    failed?: number;
    unknown?: number;
    omitted?: number;
    nextOffset?: number;
    complete?: boolean;
    dryRun?: boolean;
    errorCode?: string;
}
export type ResultDetails = Readonly<ResultSummary & {
    outcome: BusinessOutcome;
}>;
/** Event payloads are observed defensively, never retained as activity metadata. */
export declare function record(value: unknown): value is Record<string, unknown>;
export declare function resultDetails(tool: string, data: unknown, nested: boolean): ResultDetails;
export {};
