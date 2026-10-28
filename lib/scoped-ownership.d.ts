import type { Context, Agent } from './adapter/dsh/types.js';
/** The nearest plugin row owns the SDK; overlapping rows never double-register one layer. */
export declare function ownScopes(ctx: Context, family: string, changed: () => void, allows?: (agent: Agent) => boolean): Promise<{
    owns: (agent: Agent) => boolean;
    sectionName: (base: string) => string;
    refresh: () => void;
    publishing: () => boolean;
    begin: () => void;
    end: () => void;
    changedBelow: () => void;
    agents: () => Agent[];
    track: (agent: Agent) => void;
    forget: (agent: Agent) => void;
    dispose: () => void;
}>;
