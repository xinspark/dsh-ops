/** Explicit preset bindings, isolated by Cordis root and host scope ancestry. */
import type { Context, Agent } from '../adapter/dsh/types.js';
import type { IntegrationConfig } from './config.js';
export declare function integrationFor(ctx: Context, agent: Agent): IntegrationConfig | undefined;
export declare function onIntegrationsChange(ctx: Context, listener: () => void): () => void;
export declare function joinIntegration(ctx: Context, config: IntegrationConfig): Promise<{
    allows: (agent: Agent) => boolean;
    watch: (listener: () => void) => () => void;
    dispose: () => void;
}>;
