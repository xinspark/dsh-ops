/** Independent PTC SDK: scoped publication through public host APIs only. */
import type { Context } from '../adapter/dsh/types.js';
import type { Agent } from '../adapter/dsh/types.js';
export { resolvePtcConfig } from '../config.js';
export declare const name = "dsh-ops-ptc";
/** A mode row's per-Agent permission to publish the PTC surface. */
export interface PtcGate {
    /** Optional public-consumer routing switch; execution remains independent. */
    guidance?: boolean;
    /** Whether advanced SDK selection is enabled. */
    dynamic?: boolean;
    /** Whether the row owns this Agent's mode. */
    allows(agent: Agent): boolean;
    /** Subscribe to gate changes; the callback runs a full reconcile. */
    watch?(notify: () => void): () => void;
}
export declare function apply(root: Context, rawConfig: unknown, gate?: PtcGate): void;
