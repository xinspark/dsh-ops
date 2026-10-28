import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { RUNTIME_REMOTE } from '../settings/runtime-contract.js';
import { en, zh } from './locales.js';
import { RowSettings } from './row-settings.js';
import { DiagnosticsSection } from './detail.js';
import { ROW_ID } from './row-schema.js';
import { SETTINGS_CSS } from './styles.js';
export const name = 'dsh-ops-settings';
export const inject = ['slots', 'locale', 'remote'];
export async function apply(ctx) {
    ctx.effect(() => ctx.locale.register('dshOps', { en, zh }), 'dsh-ops: settings dictionaries');
    // Reach the remote through the service object, not through `ctx.remote.*`: the
    // dotted property is traced and only readable from a context that injects that
    // service, which a render callback is not.
    const remote = ctx.get('remote');
    // A missing remote must not blank the page: configuration still works, and the
    // status card reports the failure instead of pretending the runtime is fine.
    let mountError;
    try {
        await remote.$mount(RUNTIME_REMOTE);
    }
    catch (error) {
        mountError = error instanceof Error ? error.message : String(error);
    }
    // Resolve the namespace once, here: `remote.opsSettings` is traced, so it may
    // only be read from this context. A render callback is not this context, and a
    // lazy read there is exactly what used to crash the status card.
    // The client-side service key is `remote.<namespace>`; read it through the
    // registry (`ctx.get`) because the dotted *property* is traced and throws
    // outside this context. Package name is the documented alias.
    const lookup = () => ctx.get('remote.opsSettings')
        ?? ctx.get('remote.dsh-ops');
    let mounted;
    try {
        mounted = lookup();
    }
    catch {
        mounted = undefined;
    }
    // The components already treat a thrown call as a reported failure, so the
    // fallback throws rather than inventing a remote error envelope.
    const reason = mounted === undefined
        ? `dsh-ops: the opsSettings remote is unavailable${mountError === undefined ? '' : `: ${mountError}`}`
        : '';
    const miss = async () => { throw new Error(reason); };
    const api = mounted ?? { snapshot: miss, plan: miss, select: miss, execute: miss };
    // The host's own installer; a slot render may not read it, so resolve it here.
    const plugins = (ctx.get('remote.pluginManager') ?? undefined);
    let pwsh7Installed;
    try {
        const list = await plugins?.listPlugins();
        const rows = Array.isArray(list) ? list : list?.value;
        if (Array.isArray(rows))
            pwsh7Installed = rows.some(row => typeof row === 'object' && row !== null
                && ['entryId', 'moduleName', 'patchId'].some(key => typeof row[key] === 'string'
                    && (row[key]).includes('dsh-win-pwsh7')));
    }
    catch {
        pwsh7Installed = undefined;
    }
    ctx.effect(() => {
        const style = document.createElement('style');
        style.dataset.dshOpsSettings = 'true';
        style.textContent = SETTINGS_CSS;
        document.head.append(style);
        return () => style.remove();
    }, 'dsh-ops: settings styles');
    // One page for the one row the bundle inserts. The row carries the whole
    // configuration, so a saved row override still opens this page.
    ctx.slots.inject('plugins.row.config', function* () {
        yield ctx.slots.register({ name: 'plugins.row.config', key: `${ROW_ID}#${ROW_ID}`, locale: 'dshOps' }, (props) => props.view === 'summary'
            ? _jsx(_Fragment, { children: props.t('rowSummary') })
            : _jsx(RowSettings, { ...props, pwsh7Installed: pwsh7Installed, plugins: plugins }));
    });
    // The status card reports the Host runtime; a row without runtime facts renders
    // nothing, and a disabled bundle or row renders nothing either. Configuration
    // stays on the row's own page, which is the one native slot that hands a page a
    // writable form for this row; the bundle page only carries this card.
    ctx.slots.inject('plugins.detail.section', function* () {
        yield ctx.slots.register({ name: 'plugins.detail.section', id: 'dsh-ops.diagnostics', order: 50, locale: 'dshOps' }, (props) => _jsx(DiagnosticsSection, { ...props, api: api, plugins: plugins }));
    });
}
