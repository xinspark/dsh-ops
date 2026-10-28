/** Read-only operator diagnostics for the current scope; no execution or selection side effects. */
import type { Context, Agent } from '../adapter/dsh/types.js';
import type { PublicationGate } from '../publication/types.js';
export interface Diagnostic {
    preset?: string;
    state: 'not-selected' | 'ready' | 'degraded';
    tools: string[];
    issues: {
        code: string;
        message: string;
    }[];
    external: {
        name: string;
        state: 'disabled' | 'unavailable' | 'active' | 'pending' | 'available';
    }[];
}
export declare function observeSelection(ctx: Context, agent: Agent, pending: ReadonlySet<string>): () => void;
export declare function diagnose(ctx: Context, agent: Agent): Promise<Diagnostic>;
/** A real Desktop-accessible tool, not an offline binary-presence probe. */
export declare function mountDiagnostics(root: Context, gate: PublicationGate): void;
