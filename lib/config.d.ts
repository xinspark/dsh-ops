/**
 * Plugin configuration: one plain object read from the `dsh-ops` row in
 * `cordis.yml`, validated here.
 *
 * Validation uses plain data and Standard Schema without host value imports. This host half must
 * resolve with no `@deepseek-ai/*` value import of its own (the profile loader
 * supplies those names, and every extra one is another way for the plugin to
 * fail to load). Validation is therefore explicit and fails loud, naming the
 * offending key, which is what the loader's own schema would have done.
 *
 * @module dsh-ops/config
 */
/**
 * Keys only the removed FastCtx surface read. Existing rows still carry them
 * (the bundle patch wrote `enableShellTools` and `toolCallTimeoutMs` into every
 * file row), so they stay accepted and type-checked, are never returned, and
 * config update 2 removes them from saved rows (`lib/config-updates.js`).
 */
export declare const LEGACY_FASTCTX_KEYS: readonly string[];
export declare const CORE_CONFIG_KEYS: readonly string[];
/** How the plugin treats the host's own shell tools. */
export declare const SHELL_POLICIES: string[];
/** Host tool names the `deny-host-shell` policy refuses by default. */
export declare const DEFAULT_DENIED_HOST_TOOLS: string[];
export { ConfigError } from './config-error.js';
/** The resolved configuration, with every default applied. */
export interface ResolvedConfig {
    configUpdateVersion: number;
    binaryPath: string | undefined;
    required: boolean;
    denyCredentialReads: boolean;
    shellPolicy: 'advise' | 'deny-host-shell';
    deniedHostTools: string[];
    promptPolicy: boolean;
    extraGuidance: string;
    bashPath: string | undefined;
    publishBashTool: boolean;
    allowSystemShellFallback: boolean;
}
/**
 * Validate one plugin row's config.
 * @param {unknown} rawConfig - the `config` value from the loader row.
 * @returns {ResolvedConfig} the resolved configuration.
 */
export declare function resolveConfig(rawConfig?: unknown): ResolvedConfig;
export { resolveHidingConfig } from './official-tool-config.js';
/** Independent PTC row configuration uses the same central validation entry point. */
export { parsePtcConfig as resolvePtcConfig } from './ptc/config.js';
export { resolveDiscoveryConfig } from './discovery/config.js';
