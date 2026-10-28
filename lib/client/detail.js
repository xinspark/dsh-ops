import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useRuntime } from './runtime.js';
import { PLAN_KEYS } from './locales.js';
/** This plugin's package name; the detail slot is mounted for every plugin. */
const PACKAGE = 'dsh-ops';
/** The companion plugin this page can install; the only spec it is allowed to pass. */
const PWSH7 = 'dsh-win-pwsh7';
import { ROW_ID } from './row-schema.js';
const none = (t) => t('statusNone');
/**
 * Map a runtime snapshot onto the facts an operator can verify.
 * @param snapshot - the Host answer, or undefined before the first one.
 * @param t - the row's locale.
 * @returns the fact list and the footnote.
 */
export function statusView(snapshot, t) {
    const note = t('runtimeHelp');
    if (snapshot === undefined)
        return { summary: t('summaryNone'), facts: [], note };
    const managed = [...new Set(snapshot.managed.map(entry => entry.version))].join(', ');
    const facts = [
        { label: t('statusPlatform'), value: snapshot.platform },
        { label: t('statusManaged'), value: managed === '' ? none(t) : managed },
        { label: t('statusGit'), value: snapshot.git.length === 0 ? none(t) : snapshot.git.join(', ') },
        { label: t('statusPwsh'), value: snapshot.powerShell.supported
                ? `${t('statusPwshReady')}${snapshot.powerShell.version === undefined ? '' : `（${snapshot.powerShell.version}）`}`
                : (snapshot.powerShell.unavailable ?? none(t)) },
    ];
    const summary = snapshot.managed.length > 0 ? t('summaryManaged') : snapshot.git.length > 0 ? t('summaryGit') : t('summaryNone');
    return { summary, facts, note };
}
/** Translate the host's invariant plan lines, keeping any line this page cannot parse. */
export function planLine(line, t) {
    const download = /^Download (\S+)$/.exec(line);
    if (download !== null)
        return t('planDownload', { url: download[1] });
    const version = /^Version: ([\w.]+); bytes: (\d+); SHA-256: ([0-9a-f]+)$/i.exec(line);
    if (version !== null)
        return t('planVersion', { version: version[1], bytes: version[2], sha: version[3] });
    const directory = /^Install into (.+)$/.exec(line);
    if (directory !== null)
        return t('planInstallInto', { directory: directory[1] });
    if (line.startsWith('The pinned archive and executable are verified'))
        return t('planVerified');
    if (line.startsWith('Stop running Bash jobs before removal'))
        return t('planStopJobs');
    return line;
}
/** Whether this subject has a status section at all. */
export function hasStatus(subject) {
    if (subject.kind === 'item')
        return false;
    // The section belongs to this plugin only: the slot is mounted for every detail
    // page, so matching on the subject kind alone painted the card on other plugins.
    if (subject.pkg.name !== PACKAGE)
        return false;
    if (subject.kind === 'bundle')
        return true;
    return subject.row.rowId === ROW_ID;
}
/**
 * The `plugins.detail.section` contribution.
 * @param props - the page subject, its translator and the runtime remote.
 * @returns the section, or null on a page it has nothing for.
 */
export function DiagnosticsSection(props) {
    const { subject, t, api, plugins } = props;
    if (!hasStatus(subject))
        return null;
    const enabled = subject.kind === 'bundle' ? subject.pkg.enabled : subject.kind === 'row' ? subject.row.enabled : false;
    if (!enabled)
        return null;
    return _jsx(RuntimeStatus, { api: api, t: t, plugins: plugins });
}
function RuntimeStatus({ api, t, plugins }) {
    const runtime = useRuntime(api);
    const view = statusView(runtime.snapshot, t);
    const [install, setInstall] = useState('idle');
    const [pwshPlan, setPwshPlan] = useState({});
    const [elapsed, setElapsed] = useState(0);
    const [installError, setInstallError] = useState('');
    // installBundle blocks until the host applies it; a ticking line is the only honest
    // progress signal a page has, and it proves the action is not frozen.
    useEffect(() => {
        if (install !== 'running')
            return;
        setElapsed(0);
        const timer = setInterval(() => setElapsed(seconds => seconds + 1), 1000);
        return () => clearInterval(timer);
    }, [install]);
    const [workElapsed, setWorkElapsed] = useState(0);
    useEffect(() => {
        if (!runtime.busy)
            return;
        setWorkElapsed(0);
        const timer = setInterval(() => setWorkElapsed(seconds => seconds + 1), 1000);
        return () => clearInterval(timer);
    }, [runtime.busy]);
    const openPwshPlan = async () => {
        setInstall('planned');
        setPwshPlan({});
        if (plugins?.inspect === undefined)
            return;
        try {
            const answer = await plugins.inspect(PWSH7);
            setPwshPlan({ ...(typeof answer?.version === 'string' ? { version: answer.version } : {}),
                ...(answer?.status === 'accepted' || answer?.status === undefined ? {} : { reason: answer.reason ?? answer.status }) });
        }
        catch {
            setPwshPlan({ reason: t('pwsh7PlanUnknown') });
        }
    };
    // The companion plugin's own state: the host's plugin list is the only source.
    const [companion, setCompanion] = useState({ state: 'unknown' });
    useEffect(() => {
        if (plugins === undefined)
            return;
        let current = true;
        void plugins.listPlugins().then(result => {
            if (!current)
                return;
            const list = Array.isArray(result) ? result
                : Array.isArray(result?.value) ? result.value : undefined;
            // A plugin row carries entryId/moduleName/patchId, not a package `name`.
            const entry = list?.find(row => typeof row === 'object' && row !== null
                && ['entryId', 'moduleName', 'patchId'].some(key => typeof row[key] === 'string'
                    && (row[key]).includes(PWSH7)));
            setCompanion(list === undefined ? { state: 'unknown' } : entry === undefined ? { state: 'absent' } : { state: 'present', version: entry.version });
        }).catch(() => { if (current)
            setCompanion({ state: 'unknown' }); });
        return () => { current = false; };
    }, [plugins]);
    const installPwsh7 = async () => {
        if (plugins === undefined)
            return;
        setInstall('running');
        try {
            const result = await plugins.installBundle(PWSH7, {});
            if (result?.application === 'failed' || result?.application === 'cancelled') {
                // Keep the host's own words: a generic refusal hides the only actionable detail.
                setInstallError(result.reason ?? result.error?.message ?? result.message ?? '');
                setInstall('failed');
                return;
            }
            setCompanion({ state: 'present' });
            setInstall('done');
        }
        catch (error) {
            setInstallError(error instanceof Error ? error.message : String(error));
            setInstall('failed');
        }
    };
    const owned = runtime.snapshot?.managed.some(entry => entry.owned) === true;
    const win32 = runtime.snapshot?.platform === 'win32';
    return _jsx("section", { className: "ops-detail", "aria-label": t('runtime'), children: _jsxs("div", { className: "ops-status-card", children: [_jsxs("div", { className: "ops-detail-head", children: [_jsx("h3", { className: "ops-detail-title", children: t('runtimeTitle') }), runtime.at !== undefined && _jsxs("span", { className: "ops-detail-metric", children: [t('refreshedAt'), " ", runtime.at] }), _jsx("button", { type: "button", className: "ops-small ops-detail-action", disabled: runtime.busy, onClick: () => void runtime.refresh(), children: runtime.busy ? t('redetecting') : t('redetect') })] }), runtime.snapshot === undefined
                    ? _jsx("p", { className: "ops-note", role: "status", children: runtime.message === '' ? t('noRuntime') : runtime.message })
                    : _jsx(_Fragment, { children: _jsxs("div", { className: "ops-status-body", children: [_jsx("p", { className: "ops-status-lead", children: view.summary }), _jsxs("dl", { className: "ops-facts", children: [view.facts.filter(fact => fact.label !== t('statusManaged')).map(fact => _jsxs("div", { children: [_jsx("dt", { children: fact.label }), _jsx("dd", { children: fact.value })] }, fact.label)), _jsxs("div", { children: [_jsx("dt", { children: t('statusManaged') }), _jsx("dd", { children: runtime.snapshot.managed.length === 0
                                                        ? _jsxs(_Fragment, { children: [t('statusNone'), win32 && _jsx("button", { type: "button", className: "ops-link ops-row-action", disabled: runtime.busy, onClick: () => void runtime.preview('install-bash'), children: t('installAction') })] })
                                                        : _jsxs(_Fragment, { children: [runtime.snapshot.managed.map(entry => entry.version).join(', '), owned && _jsx("button", { type: "button", className: "ops-link ops-row-action", disabled: runtime.busy, onClick: () => void runtime.preview('remove-bash'), children: t('removeAction') })] }) })] }), _jsxs("div", { children: [_jsx("dt", { children: t('pwsh7Plugin') }), _jsx("dd", { children: companion.state === 'present'
                                                        ? `${t('pwsh7Present')}${(companion.version ?? runtime.snapshot?.companion) === undefined ? '' : `（${companion.version ?? runtime.snapshot?.companion}）`}`
                                                        : _jsxs(_Fragment, { children: [t('statusNone'), plugins !== undefined && _jsx("button", { type: "button", className: "ops-link ops-row-action", "aria-label": t('installPwsh7'), onClick: () => void openPwshPlan(), children: t('installAction') })] }) })] })] }), _jsx("p", { className: "ops-status-note", children: view.note })] }) }), install === 'planned' && _jsxs("div", { className: "ops-preview", role: "region", "aria-label": t('preview'), children: [_jsxs("ul", { children: [_jsx("li", { children: pwshPlan.version === undefined ? t('pwsh7PlanSource') : t('pwsh7PlanVersion', { version: pwshPlan.version }) }), _jsx("li", { children: t('pwsh7PlanRestart') })] }), pwshPlan.reason !== undefined && _jsx("p", { className: "ops-note", role: "status", children: pwshPlan.reason }), _jsxs("div", { className: "ops-actions", children: [_jsx("button", { type: "button", className: "ops-primary", disabled: runtime.busy, onClick: () => void installPwsh7(), children: t('execute') }), _jsx("button", { type: "button", className: "ops-text-button", onClick: () => setInstall('idle'), children: t('dismiss') })] })] }), install !== 'idle' && install !== 'planned' && _jsx("p", { className: "ops-note", role: "status", children: install === 'running' ? t('pwsh7Installing', { seconds: elapsed }) : install === 'done' ? t('pwsh7Installed') : `${t('pwsh7Failed')}${installError === '' ? '' : ` ${installError}`}` }), runtime.plan !== undefined && _jsxs("div", { className: "ops-preview", role: "region", "aria-label": t('preview'), children: [_jsx("p", { className: "ops-status-lead", children: t(PLAN_KEYS[runtime.plan.action] ?? PLAN_KEYS['install-bash']) }), _jsx("ul", { children: runtime.plan.details.map((line, index) => _jsx("li", { children: planLine(line, t) }, index)) }), runtime.plan.reason !== undefined && _jsx("p", { className: "ops-note", role: "status", children: runtime.plan.reason }), _jsxs("div", { className: "ops-actions", children: [_jsx("button", { type: "button", className: "ops-primary", disabled: !runtime.plan.available || runtime.busy, onClick: () => void runtime.execute(), children: t('execute') }), _jsx("button", { type: "button", className: "ops-text-button", disabled: runtime.busy, onClick: () => runtime.dismiss(), children: t('dismiss') })] })] }), runtime.busy && _jsx("p", { className: "ops-note", role: "status", children: t('busySeconds', { seconds: workElapsed }) }), runtime.busy && _jsx("button", { type: "button", className: "ops-text-button", onClick: () => runtime.cancel(), children: t('cancel') }), runtime.result !== undefined && _jsxs("div", { className: "ops-result", role: "status", children: [_jsx("p", { children: runtime.result.status === 'completed' ? t('resultApplied') : `${t('resultFailed')}${runtime.result.message}` }), runtime.result.exitCode !== undefined && _jsxs("p", { children: [t('exitCode'), ": ", runtime.result.exitCode ?? '—'] }), runtime.result.effectState === 'unknown' && _jsx("p", { children: t('unknownEffect') })] }), runtime.message !== '' && runtime.snapshot !== undefined && _jsx("p", { className: "ops-field-error", role: "status", children: runtime.message })] }) });
}
