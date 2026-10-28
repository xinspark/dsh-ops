/** Public preset configuration. Normalization never mounts services or publishes tools. */
import { type ResolvedConfig } from '../config.js';
import { type DiscoveryConfig } from '../discovery/config.js';
import { type PtcConfig } from '../ptc/config.js';
export type IntegrationProfile = 'native' | 'ptc' | 'discovery' | 'shell';
export interface IntegrationOptions {
    preset: string;
    profile?: IntegrationProfile;
    files?: boolean;
    shell?: boolean;
    presentation?: 'native' | 'ptc';
    discovery?: boolean;
    allowedTools?: string[];
    alwaysLoaded?: string[];
    replaceOfficial?: boolean;
    promptPolicy?: boolean;
    extraGuidance?: string;
    binaryPath?: string;
    required?: boolean;
    denyCredentialReads?: boolean;
    bashPath?: string;
    allowSystemShellFallback?: boolean;
    externalTools?: string[];
    externalAlwaysLoaded?: string[];
    externalDisabled?: string[];
}
export interface IntegrationConfig {
    preset: string;
    files: boolean;
    shell: boolean;
    presentation: 'native' | 'ptc';
    discovery: boolean;
    replaceOfficial: boolean;
    core: ResolvedConfig;
    native: DiscoveryConfig;
    externalTools: string[];
    externalAlwaysLoaded: string[];
    externalDisabled: string[];
    ptc: PtcConfig;
}
export declare function resolveIntegrationConfig(raw: unknown): IntegrationConfig;
