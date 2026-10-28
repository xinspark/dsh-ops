import { loadScopes } from '../adapter/dsh/host.js';
const roots = new WeakMap();
export function providers(ctx, agent) {
    const state = roots.get(ctx.root ?? ctx);
    if (!state)
        return [];
    const result = new Map();
    for (const scope of [...state.chain(agent), undefined])
        for (const row of state.providers) {
            if (row.active && row.scope === scope && !result.has(row.capability.definition.name))
                result.set(row.capability.definition.name, row);
        }
    return [...result.values()];
}
export function onProvidersChange(ctx, listener) {
    const state = roots.get(ctx.root ?? ctx);
    if (!state)
        return () => { };
    state.listeners.add(listener);
    return () => { state.listeners.delete(listener); };
}
export async function prepareProviders(ctx) {
    const key = ctx.root ?? ctx;
    if (roots.has(key))
        return;
    const { scopeChainOf } = await loadScopes();
    if (!roots.has(key))
        roots.set(key, { providers: [], listeners: new Set(), sequence: 0, chain: scopeChainOf });
}
/** Use the returned disposer (also bound to ctx) for capability updates, unload and reload. */
export async function registerNativeCapability(ctx, capability) {
    const { definition } = capability;
    if (!definition || !/^[A-Za-z][A-Za-z0-9_.-]{0,127}$/u.test(definition.name) || definition.name.startsWith('ops_') || definition.name === 'run_code')
        throw new Error('External Native capability needs its own non-reserved tool name');
    if (!definition.description?.trim() || !definition.parameters || !definition.output?.schema || typeof definition.output.render !== 'function'
        || typeof definition.execute !== 'function' || typeof capability.authorize !== 'function' || typeof capability.search !== 'string' || !capability.search.trim())
        throw new Error('Native capability requires description, parameters, result contract, search, execute and authorize');
    if (capability.disclosure !== undefined && !['resident', 'on-demand'].includes(capability.disclosure))
        throw new Error('disclosure must be resident or on-demand');
    await prepareProviders(ctx);
    const { scopeOf } = await loadScopes(), state = roots.get(ctx.root ?? ctx), scope = scopeOf(ctx);
    if (state.providers.some(row => row.active && row.scope === scope && row.capability.definition.name === definition.name))
        throw new Error(`Native capability ${definition.name} already has a provider in this scope`);
    // Capture a registration's descriptors; changing a provider requires a new lifetime/token.
    const captured = { ...capability, definition: { ...definition,
            parameters: structuredClone(definition.parameters), output: { ...definition.output, schema: structuredClone(definition.output.schema) } } };
    const row = { token: `external:${++state.sequence}`, scope, capability: captured, active: true, calls: new Set() };
    state.providers.push(row);
    const notify = () => { for (const listener of [...state.listeners])
        listener(); };
    const dispose = () => {
        if (!row.active)
            return;
        row.active = false;
        state.providers.splice(state.providers.indexOf(row), 1);
        for (const controller of row.calls)
            controller.abort(new Error('Native provider unloaded'));
        notify();
    };
    ctx.effect(() => dispose, `dsh-ops: external capability ${definition.name}`);
    notify();
    return dispose;
}
