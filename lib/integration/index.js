import { resolveShells } from '../shells.js';
import { mountSessionBash } from '../session-shells.js';
import { mountWorkspacePreparation } from '../workspace-preparation.js';
import { mountNative } from '../publication/native.js';
import { mountReplacements } from '../publication/replacements.js';
import { apply as mountDiscovery } from '../discovery/index.js';
import { apply as mountPtc } from '../ptc/index.js';
import { NATIVE_RESIDENT_RAW, SHELL_OFFICIAL_NAMES } from '../modes/plan.js';
import { OFFICIAL_REPLACEMENTS } from '../official-tool-catalog.js';
import { BASH_TOOL, renderToolingPolicy, TOOLING_SECTION } from '../policy.js';
import { compatibilityOn } from '../modes/registry.js';
import { resolveIntegrationConfig } from './config.js';
import { mountDiagnostics } from './diagnostics.js';
import { joinIntegration } from './registry.js';
export { diagnose } from './diagnostics.js';
export { registerNativeCapability } from '../discovery/providers.js';
export { resolveIntegrationConfig } from './config.js';
export const name = 'dsh-ops-integration';
export async function apply(ctx, raw) {
    const config = resolveIntegrationConfig(raw);
    const binding = await joinIntegration(ctx, config);
    ctx.effect(() => binding.dispose, 'dsh-ops: preset integration binding');
    const bound = new Set();
    let active = true;
    ctx.effect(() => () => { active = false; for (const dispose of bound)
        dispose(); bound.clear(); }, 'dsh-ops: preset integration children');
    const watch = (listener) => { const dispose = binding.watch(listener); bound.add(dispose); return () => { dispose(); bound.delete(dispose); }; };
    const gate = { allows: (agent) => active && binding.allows(agent), watch };
    mountDiagnostics(ctx, gate);
    if (config.shell) {
        if (process.platform === 'win32')
            mountWorkspacePreparation(ctx);
        const shells = resolveShells(config.core);
        ctx.inject(['tools'], inner => mountSessionBash(inner, config.core, shells, gate));
        if (config.core.promptPolicy && !config.files)
            ctx.inject(['tools', 'systemPrompt'], inner => {
                inner.effect(() => inner.systemPrompt.section({ name: `${TOOLING_SECTION}:preset-shell-${config.preset}`, order: 3254, interpolate: false,
                    text: context => {
                        const agent = context.agent ?? context.scope;
                        return agent && gate.allows(agent) ? renderToolingPolicy({ published: inner.get('tools')?.get(BASH_TOOL, agent) ? [BASH_TOOL] : [], extraGuidance: config.core.extraGuidance }) : '';
                    } }), 'dsh-ops: scoped shell guidance');
            });
    }
    if (config.presentation === 'native') {
        if (config.files)
            mountNative(ctx, config.core, { id: config.preset, tools: NATIVE_RESIDENT_RAW,
                section: `preset-${config.preset}`, gate });
        if (config.native.enabled || config.native.alwaysLoaded.length || config.externalTools.length)
            mountDiscovery(ctx, config.native, { ...gate, guidance: config.core.promptPolicy, extraGuidance: config.core.extraGuidance,
                external: { allowed: config.externalTools, alwaysLoaded: config.externalAlwaysLoaded, disabled: config.externalDisabled } });
    }
    else if (config.files)
        mountPtc(ctx, config.ptc, { ...gate, guidance: config.core.promptPolicy, dynamic: config.discovery });
    const targets = new Map();
    if (config.replaceOfficial) {
        if (config.files && config.presentation === 'native')
            for (const [official, replacement] of Object.entries(OFFICIAL_REPLACEMENTS))
                targets.set(official, replacement);
        if (config.shell && process.platform === 'win32')
            for (const official of SHELL_OFFICIAL_NAMES)
                targets.set(official, BASH_TOOL);
    }
    mountReplacements(ctx, { id: config.preset, targets, gate, keepOfficial: () => compatibilityOn(ctx) });
}
/** Mount inside a preset composition or with an explicit preset id at the host root. */
export function integration(options) {
    // Validate synchronously, before Cordis creates a fiber or any registration.
    const captured = structuredClone(options);
    resolveIntegrationConfig(captured);
    return { name, apply(ctx) { return apply(ctx, structuredClone(captured)); } };
}
