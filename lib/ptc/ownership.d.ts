import type { Context, Agent } from '../adapter/dsh/types.js';
export declare const ownPtcScopes: (ctx: Context, changed: () => void, allows?: (agent: Agent) => boolean) => Promise<{
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
