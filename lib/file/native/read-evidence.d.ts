import type { Agent } from '../../adapter/dsh/types.js';
import type { GenerateOptions } from '../../adapter/dsh/types.js';
import type { Session } from '../../adapter/dsh/types.js';
import type { ToolExecution } from '../../adapter/dsh/types.js';
import type { ReadObservation } from './read-observation.js';
export interface ReadRecord extends ReadObservation {
    readonly callId: string;
    readonly name: string;
    readonly args: string;
    messageId?: string;
}
export interface EvidenceState {
    readonly agent: Agent;
    readonly session: Session;
    readonly generation: number;
    epoch: number;
    records: ReadRecord[];
    proof: Map<ReadRecord, string>;
}
export declare function generation(session: Session): number | undefined;
export declare function readRecord(observation: ReadObservation, exec: Readonly<ToolExecution>): ReadRecord;
/** Positive evidence is the exact role, source, durable identity and body in this provider request. */
export declare function requestProof(options: GenerateOptions, state: EvidenceState): Map<ReadRecord, string>;
