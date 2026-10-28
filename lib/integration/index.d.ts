/** Stable opt-in preset entry. Importing this module never mounts OPS. */
import type { Context } from '../adapter/dsh/types.js';
import { type IntegrationOptions } from './config.js';
export { diagnose } from './diagnostics.js';
export type { Diagnostic } from './diagnostics.js';
export { registerNativeCapability } from '../discovery/providers.js';
export type { NativeCapability } from '../discovery/providers.js';
export { resolveIntegrationConfig } from './config.js';
export type { IntegrationOptions, IntegrationProfile } from './config.js';
export declare const name = "dsh-ops-integration";
export declare function apply(ctx: Context, raw: unknown): Promise<void>;
/** Mount inside a preset composition or with an explicit preset id at the host root. */
export declare function integration(options: IntegrationOptions): {
    name: string;
    apply(ctx: Context): Promise<void>;
};
