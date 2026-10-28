import type { Context } from '../adapter/dsh/types.js';
import type { Agent } from '../adapter/dsh/types.js';
export interface DiscoveryGate {
    allows(agent: Agent): boolean;
    watch?(notify: () => void): () => void;
    guidance?: boolean;
    extraGuidance?: string;
    external?: {
        allowed: readonly string[];
        alwaysLoaded: readonly string[];
        disabled: readonly string[];
    };
}
export declare const name = "dsh-ops-discovery";
export declare function apply(root: Context, raw: unknown, gate?: DiscoveryGate): void;
