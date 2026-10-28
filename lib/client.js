window.__ModuleLoader__.load({id:"dsh-ops",factory:(require)=>{
const modules={"settings/runtime-contract.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUNTIME_REMOTE = exports.RUNTIME_DESCRIPTORS = exports.parseSource = exports.parseAction = exports.RUNTIME_ACTIONS = void 0;
exports.RUNTIME_ACTIONS = ['install-bash', 'remove-bash', 'upgrade-pwsh'];
const codec = (name, parse) => ({
    mode: 'strict', typeSymbol: `dsh-ops#${name}`, create: () => ({ parse }),
});
function enumValue(value, choices) {
    if (typeof value !== 'string' || !choices.includes(value))
        throw new Error(`Expected one of: ${choices.join(', ')}`);
    return value;
}
const parseAction = (value) => enumValue(value, exports.RUNTIME_ACTIONS);
exports.parseAction = parseAction;
const parseSource = (value) => enumValue(value, ['managed', 'git']);
exports.parseSource = parseSource;
function planId(value) {
    if (typeof value !== 'string' || !/^[a-f0-9-]{36}$/.test(value))
        throw new Error('Expected a current runtime plan identifier');
    return value;
}
const jsonResult = codec('RuntimeResult', value => value);
function method(name, parameter, cancellable = false) {
    return { id: `dsh-ops#opsSettings/${name}`, service: 'opsSettings', namespace: 'opsSettings', method: name,
        invocation: { kind: 'direct' }, result: jsonResult,
        parameters: parameter ? [{ name: parameter.wire, wire: parameter.wire, source: 'json', codec: parameter.codec }] : [],
        ...(cancellable ? { cancellation: { parameter: 'signal' } } : {}),
    };
}
exports.RUNTIME_DESCRIPTORS = Object.freeze([
    method('snapshot'), method('plan', { wire: 'action', codec: codec('RuntimeAction', exports.parseAction) }),
    method('select', { wire: 'source', codec: codec('BashSource', exports.parseSource) }),
    method('execute', { wire: 'id', codec: codec('RuntimePlanId', planId) }, true),
]);
exports.RUNTIME_REMOTE = Object.freeze({ package: 'dsh-ops', descriptors: exports.RUNTIME_DESCRIPTORS });

}},
"client/locales.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_KEYS = exports.zh = exports.en = void 0;
exports.en = {
    rowSummary: 'Bundle switches plus four switches per preset.',
    groupGlobal: 'Bundle switches',
    groupGlobalHint: 'These four gate the same-named switch in every preset below.',
    globalBashHint: 'Master switch: with this off no preset publishes ops_bash.',
    globalHidePwshHint: 'Master switch: with this off no preset hides the host pwsh.',
    hideOfficialTools: 'Hide the official tools',
    hideOfficialToolsHint: 'When off, no preset hides the official file tools; OPS tools coexist with them.',
    dynamicTools: 'Dynamic tool discovery',
    dynamicToolsHint: 'When off, no preset offers the discovery entry.',
    featureEnabled: 'Enabled',
    expandGroup: 'Expand', collapseGroup: 'Collapse',
    featureMinimal: 'Optimize the built-in Minimal preset',
    featureMinimalHint: 'Start dynamic tool loading while keeping the Minimal preset’s terse prompt style (the dynamic tool loading option must be on as well). Replaces pwsh with bash on Windows.',
    featureStandard: 'Optimize the built-in Standard preset',
    featureStandardHint: 'Add useful OPS tools to the built-in Standard preset and replace some built-in tools. Replaces pwsh with bash on Windows.',
    featurePtc: 'Optimize the built-in PTC preset',
    featurePtcHint: 'Add useful OPS tools to the built-in PTC preset and replace some built-in tools. Replaces pwsh with bash on Windows.',
    featureCordis: 'Optimize the built-in Cordis preset',
    featureCordisHint: 'Add useful OPS tools to the built-in Cordis preset and replace some built-in tools. Replaces pwsh with bash on Windows.',
    featurePanel: 'Activity capture',
    featurePanelHint: 'Records OPS logs and reports for developer diagnosis; leaving it off does not affect normal use.',
    featureTui: 'TUI-OPS link',
    featurePwsh7Link: 'dsh-win-pwsh7 link',
    pwsh7ExplicitOffHint: 'Manually turned off: even with dsh-win-pwsh7 detected, the link will not switch itself back on.',
    featurePwsh7LinkHint: 'Keeps the host pwsh tool visible so dsh-win-pwsh7 can point it at pwsh 7; while on, every “Hide the host PowerShell” switch locks to off.',
    featureTuiHint: 'Plugin link: with both dsh-tui and dsh-ops installed, dsh-tui can show the OPS sidebar.',
    groupOther: 'Other', groupOtherHint: 'Activity capture and the TUI link.',
    swBash: 'Enable the Bash tool', swBashHint: 'Publishes ops_bash for this preset’s sessions.',
    swHidePwsh: 'Hide the host PowerShell', swHidePwshHint: 'Off keeps the host pwsh visible; with dsh-win-pwsh7 installed the pwsh tool points at pwsh7.',
    swHideOfficialToolsHint: 'Hides the official file tools this preset replaces. Applies only while the bundle switch is on.',
    swDynamicToolsHint: 'Offers the discovery entry to this preset. Applies only while the bundle switch is on.',
    unavailable: 'Enable this row with the built-in switch to edit its settings. A writable host profile is required.', loading: 'Loading host settings…',
    save: 'Save', reset: 'Reset', saved: 'Saved. The host reloaded this row.', rejected: 'The host refused this save. Reset to the latest saved values and review your changes.', saving: 'Saving…',
    runtime: 'Runtime', planInstallBash: 'Install the ops-managed Bash: the host pins the archive, verifies it, and writes it into the profile.', planRemoveBash: 'Remove the Bash ops installed; other installations stay untouched.', planUpgradePwsh: 'Install or upgrade PowerShell 7 through winget.', planDownload: 'Download {url}',
    planVersion: 'Version: {version}; bytes: {bytes}; SHA-256: {sha}',
    planInstallInto: 'Install into {directory}',
    planStopJobs: 'Stop running Bash jobs before removal. Only the receipt-owned directories are listed below and will be deleted.',
    planVerified: 'The pinned archive and executable are verified. No profile setting is changed. Reload the mode row after selecting the executor.',
    busySeconds: 'Working… {seconds}s elapsed; the host runs the phases.', resultApplied: 'The host applied the change.', resultFailed: 'The action did not complete: ',
    pwsh7PlanSource: 'Install dsh-win-pwsh7 from the npm registry into this profile.',
    pwsh7PlanVersion: 'Install dsh-win-pwsh7@{version} from the npm registry into this profile.',
    pwsh7PlanUnknown: 'The registry did not answer, so the version is unknown; the install can still be attempted.', pwsh7PlanRestart: 'Restart DSH afterwards; the pwsh tool switches to PowerShell 7 then.', installAction: 'Install', removeAction: 'Remove', runtimeTitle: 'Runtime status',
    summaryManaged: 'ops_bash runs on the managed Bash below — a Bash that ops installs and maintains itself.',
    summaryGit: 'ops_bash runs on the detected Git Bash. The managed Bash is a copy ops installs and maintains itself, used instead of the system Git Bash when present.',
    summaryNone: 'No usable Bash was detected. The managed Bash is a copy ops installs and maintains itself; install it below.', pwsh7Plugin: 'dsh-win-pwsh7', pwsh7Present: 'Available', pwsh7Absent: 'Not installed', installPwsh7: 'Install dsh-win-pwsh7', pwsh7Installing: 'Installing… {seconds}s elapsed; the host runs the phases.',
    pwsh7Installed: 'Installed. Restart DSH and check again; reopening the configuration page turns the link on by detection.', pwsh7Failed: 'The installation did not complete:',
    pwsh7Hint: 'PowerShell 7 was not detected. dsh-win-pwsh7 is a separate plugin that points the pwsh tool at PowerShell 7; install it from the plugin market first.',
    runtimeHelp: 'Installations do not change your saved executor choice. Stop Bash jobs before removing a managed installation.',
    preview: 'Review this action', execute: 'Run this action', cancel: 'Cancel running action', dismiss: 'Close preview', busy: 'Working…',
    unknownEffect: 'Changes may have occurred. Inspect the installation before trying again.', noRuntime: 'Runtime controls require the host runtime services.',
    exitCode: 'Exit code', managed: 'Use managed Bash', git: 'Use Git Bash',
    statusPlatform: 'Platform', statusManaged: 'Managed Bash', statusGit: 'Git Bash', statusPwsh: 'PowerShell 7', statusPwshReady: 'Available', statusNone: 'None detected',
    refreshedAt: 'Refreshed at', redetect: 'Check again', redetecting: 'Checking…',
};
exports.zh = {
    rowSummary: '两个总开关，加上每个预设的四个开关。',
    groupGlobal: '总开关',
    groupGlobalHint: '这四个开关控制下方每个预设里的同名选项是否生效。',
    globalBashHint: '总开关：关闭后所有预设都不再发布 ops_bash。',
    globalHidePwshHint: '总开关：关闭后所有预设都不再隐藏宿主 pwsh。',
    hideOfficialTools: '隐藏原版工具',
    hideOfficialToolsHint: '关闭后没有任何预设会隐藏原版文件工具，OPS 工具与原版并存。',
    dynamicTools: '动态工具加载',
    dynamicToolsHint: '关闭后没有任何预设提供发现入口。',
    featureEnabled: '启用',
    expandGroup: '展开', collapseGroup: '收起',
    featureMinimal: '优化原版极简模式',
    featureMinimalHint: '在保留极简模式极简提示词的风格下启动动态工具加载（需要启用动态工具加载选项同时开启）。且若当前环境为 Windows，将 pwsh 替换为 bash。',
    featureStandard: '优化原版标准模式',
    featureStandardHint: '为原版标准模式增加一些好用的 OPS 工具并替换部分原版工具。且若当前环境为 Windows，将 pwsh 替换为 bash。',
    featurePtc: '优化原版 PTC 模式',
    featurePtcHint: '为原版 PTC 模式增加一些好用的 OPS 工具并替换部分原版工具。且若当前环境为 Windows，将 pwsh 替换为 bash。',
    featureCordis: '优化原版创造模式',
    featureCordisHint: '为原版创造模式增加一些好用的 OPS 工具并替换部分原版工具。且若当前环境为 Windows，将 pwsh 替换为 bash。',
    featurePanel: '数据采集',
    featurePanelHint: '记录 OPS 的日志和报告以供开发者诊断。是否开启不影响日常使用。',
    featureTui: 'TUI-OPS 联动',
    featurePwsh7Link: 'dsh-win-pwsh7 联动',
    pwsh7ExplicitOffHint: '已手动关闭：即使检测到 dsh-win-pwsh7，联动也不会自动开启。',
    featurePwsh7LinkHint: '保持宿主 pwsh 工具可见，供 dsh-win-pwsh7 指向 pwsh 7；开启后所有「隐藏宿主 PowerShell」都锁死为关闭。',
    featureTuiHint: '插件联动项。同时安装 dsh-tui 与 dsh-ops 时，可以在 dsh-tui 显示 ops 侧栏。',
    groupOther: '其他', groupOtherHint: '数据采集与 TUI 联动。',
    swBash: '开启 Bash 工具', swBashHint: '为该预设的会话发布 ops_bash。',
    swHidePwsh: '隐藏宿主 PowerShell', swHidePwshHint: '关闭则保留宿主 pwsh 可见；已安装 dsh-win-pwsh7 时会把 pwsh 工具指向为 pwsh7。',
    swHideOfficialToolsHint: '隐藏该预设替换掉的原版文件工具。仅在总开关开启时生效。',
    swDynamicToolsHint: '为该预设提供发现入口。仅在总开关开启时生效。',
    unavailable: '请先用内置开关启用此行。编辑设置需要可写的宿主配置。', loading: '正在加载宿主设置…',
    save: '保存', reset: '重置', saved: '已保存，宿主已重新加载此行。', rejected: '宿主拒绝了此次保存。请恢复最新已保存值后重新检查更改。', saving: '正在保存…',
    runtime: '运行时', planInstallBash: '将安装 ops 管理的 Bash：宿主固定发布包、校验后写入 profile。', planRemoveBash: '将删除 ops 自己安装的 Bash，其它安装不受影响。', planUpgradePwsh: '将通过 winget 安装或升级 PowerShell 7。', planDownload: '下载 {url}',
    planVersion: '版本：{version}；大小：{bytes} 字节；SHA-256：{sha}',
    planInstallInto: '安装到 {directory}',
    planVerified: '固定发布包与可执行文件会先校验；不会改动任何 profile 设置。选定执行器后重新加载该模式行。',
    planStopJobs: '删除前请先停止正在运行的 Bash 作业；只会删除下面列出、且由安装回执登记的目录。',
    busySeconds: '正在处理…已等待 {seconds} 秒；具体阶段由宿主执行。', resultApplied: '宿主已应用变更。', resultFailed: '操作未完成：',
    pwsh7PlanSource: '从 npm 官方源把 dsh-win-pwsh7 安装到当前 profile。',
    pwsh7PlanVersion: '将从 npm 官方源安装 dsh-win-pwsh7@{version} 到当前 profile。',
    pwsh7PlanUnknown: '仓库没有应答，版本未知；仍可尝试安装。', pwsh7PlanRestart: '安装完成后需要重启 DSH，pwsh 工具才会切换到 PowerShell 7。', installAction: '安装', removeAction: '删除', runtimeTitle: '运行时状态',
    summaryManaged: 'ops_bash 由下方受管理的 Bash 提供执行。受管理的 Bash 是 ops 自行安装并维护的一份 Bash，不依赖系统 Git Bash。',
    summaryGit: 'ops_bash 由检测到的 Git Bash 提供执行。受管理的 Bash 是 ops 自行安装并维护的一份 Bash；未安装时使用系统 Git Bash。',
    summaryNone: '未检测到可用的 Bash。受管理的 Bash 是 ops 自行安装并维护的一份 Bash，可在下方安装。', pwsh7Plugin: 'dsh-win-pwsh7', pwsh7Present: '可用', pwsh7Absent: '未安装', installPwsh7: '安装 dsh-win-pwsh7', pwsh7Installing: '正在安装…已等待 {seconds} 秒；具体阶段由宿主执行。',
    pwsh7Installed: '已安装。重启 DSH 后重新检测；重新打开配置页后联动会按检测自动开启。', pwsh7Failed: '安装未完成：',
    pwsh7Hint: '未检测到 PowerShell 7。dsh-win-pwsh7 是一个独立插件，安装后会把 pwsh 工具指向 PowerShell 7，需要先在插件市场安装它。',
    runtimeHelp: '安装不会更改已保存的执行器选择。删除受管理的安装前，请先停止 Bash 作业。',
    preview: '检查本次操作', execute: '执行此操作', cancel: '取消正在执行的操作', dismiss: '关闭预览', busy: '正在处理…',
    unknownEffect: '可能已经发生更改。再次尝试前，请检查安装状态。', noRuntime: '运行时控制需要宿主运行时服务。',
    exitCode: '退出码', managed: '使用受管理的 Bash', git: '使用 Git Bash',
    statusPlatform: '平台', statusManaged: '受管理的 Bash', statusGit: 'Git Bash', statusPwsh: 'PowerShell 7', statusPwshReady: '可用', statusNone: '未检测到',
    refreshedAt: '刷新于', redetect: '重新检测', redetecting: '正在检测…',
};
/** Every runtime action's headline, as a dictionary key rather than inline copy. */
exports.PLAN_KEYS = Object.freeze({
    'install-bash': 'planInstallBash',
    'remove-bash': 'planRemoveBash',
    'upgrade-pwsh': 'planUpgradePwsh',
});

}},
"adapter/dsh/browser.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
/**
 * The adapter's browser facet: the only place the client half names a DSH module
 * that resolves to a value.
 *
 * `types.ts` stays type-only so importing the adapter never evaluates a DSH
 * package; the browser half needs the Host's native controls as values, so that
 * one seam lives here and nowhere else. `test/adapter-boundary.test.mjs` fails if
 * another source file imports `@deepseek-ai/*` directly, and checks that this
 * module exports nothing but the primitives module.
 */
var dsh_client_ui_primitives_1 = require("@deepseek-ai/dsh-client-ui-primitives");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return dsh_client_ui_primitives_1.Switch; } });

}},
"client/forms.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorText = void 0;
exports.useEditor = useEditor;
exports.Unavailable = Unavailable;
exports.FormActions = FormActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const errorText = (value) => value instanceof Error ? value.message : String(value);
exports.errorText = errorText;
/**
 * A whole-page editor over one row's saved values.
 *
 * `baseline` is the value the draft was read from, not the latest Host value: a
 * Host reload while the page is dirty (another surface saved, the row was
 * re-applied) must not turn an untouched field into a write. Without it, saving
 * one changed switch would also clear a field somebody else had just set.
 */
function useEditor(form, read, t) {
    const [draft, setDraft] = (0, react_1.useState)(() => read(form?.state.value ?? {}));
    const [baseline, setBaseline] = (0, react_1.useState)(() => form?.state.value ?? {});
    const [revision, setRevision] = (0, react_1.useState)(form?.state.revision);
    const [dirty, setDirty] = (0, react_1.useState)(false), [busy, setBusy] = (0, react_1.useState)(false), [message, setMessage] = (0, react_1.useState)('');
    // The host omits `mode` for a row page in this version; absence means "host",
    // and only an explicit non-host mode (or a read-only form) blocks editing.
    const ready = form?.state.status === 'ready' && form.state.writable !== false
        && (form.state.mode === undefined || form.state.mode === 'host');
    (0, react_1.useEffect)(() => {
        if (!dirty) {
            setDraft(read(form?.state.value ?? {}));
            setBaseline(form?.state.value ?? {});
            setRevision(form?.state.revision);
        }
    }, [form?.state.revision, form?.state.status, read, dirty]);
    const edit = (value) => { setDraft(value); setDirty(true); setMessage(''); };
    const reset = () => {
        setDraft(read(form?.state.value ?? {}));
        setBaseline(form?.state.value ?? {});
        setRevision(form?.state.revision);
        setDirty(false);
        setMessage('');
    };
    const save = async (operations) => {
        if (!form || !ready || busy || revision === undefined)
            return;
        setBusy(true);
        setMessage('');
        try {
            const accepted = await form.mutate(operations, revision);
            setMessage(t(accepted ? 'saved' : 'rejected'));
            if (accepted)
                setDirty(false);
        }
        catch (error) {
            setMessage((0, exports.errorText)(error));
        }
        finally {
            setBusy(false);
        }
    };
    return { draft, baseline, edit, dirty, busy, ready, message, reset, save };
}
function Unavailable({ form, t }) {
    return (0, jsx_runtime_1.jsx)("p", { role: "status", children: t(form?.state.status === 'loading' ? 'loading' : 'unavailable') });
}
function FormActions({ busy, dirty, valid = true, reset, message, t }) {
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "ops-settings-actions", children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", className: "ops-settings-primary", disabled: busy || !dirty || !valid, children: t(busy ? 'saving' : 'save') }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-reset", onClick: reset, disabled: busy, children: t('reset') })] }), message && (0, jsx_runtime_1.jsx)("p", { role: "status", className: "ops-note", children: message })] });
}

}},
"client/row-schema.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatKey = exports.GROUPS = exports.GLOBAL = exports.ROW_ID = void 0;
exports.readRowValues = readRowValues;
exports.bundleGates = bundleGates;
exports.changedFields = changedFields;
/** The row id the single bundle row declares. */
exports.ROW_ID = 'dsh-ops';
const at = (section, key) => [section, key];
const field = (path, label, hint, gatedBy) => ({ path, label, hint, ...(gatedBy === undefined ? {} : { gatedBy }) });
/** The two bundle switches. */
exports.GLOBAL = Object.freeze([
    field(at('global', 'bash'), 'swBash', 'globalBashHint'),
    field(at('global', 'hidePwsh'), 'swHidePwsh', 'globalHidePwshHint'),
    field(at('global', 'hideOfficialTools'), 'hideOfficialTools', 'hideOfficialToolsHint'),
    field(at('global', 'dynamicTools'), 'dynamicTools', 'dynamicToolsHint'),
]);
/** The four preset switches, identical in every mode. */
const MODE_FIELDS = (section) => Object.freeze([
    field(at(section, 'bash'), 'swBash', 'swBashHint', 'bash'),
    field(at(section, 'hidePwsh'), 'swHidePwsh', 'swHidePwshHint', 'hidePwsh'),
    field(at(section, 'hideOfficialTools'), 'hideOfficialTools', 'swHideOfficialToolsHint', 'hideOfficialTools'),
    field(at(section, 'dynamicTools'), 'dynamicTools', 'swDynamicToolsHint', 'dynamicTools'),
]);
const modeGroup = (id, label, hint) => ({ id, label, hint, toggle: true, fields: MODE_FIELDS(id) });
/** Every group, in page order. */
exports.GROUPS = Object.freeze([
    { id: 'global', label: 'groupGlobal', hint: 'groupGlobalHint', toggle: false, fields: exports.GLOBAL },
    modeGroup('minimal', 'featureMinimal', 'featureMinimalHint'),
    modeGroup('standard', 'featureStandard', 'featureStandardHint'),
    modeGroup('ptc', 'featurePtc', 'featurePtcHint'),
    modeGroup('cordis', 'featureCordis', 'featureCordisHint'),
    // The three opt-in features share one card: separate cards for one switch each
    // read as three empty shells next to the presets.
    { id: 'other', label: 'groupOther', hint: 'groupOtherHint', toggle: false, fields: Object.freeze([
            field(at('panel', 'enabled'), 'featurePanel', 'featurePanelHint'),
            field(at('tui', 'enabled'), 'featureTui', 'featureTuiHint'),
            field(at('other', 'pwsh7Link'), 'featurePwsh7Link', 'featurePwsh7LinkHint'),
        ]) },
]);
/** What a switch runs with when it is absent. */
const DEFAULTS = Object.freeze({
    'global.bash': true, 'global.hidePwsh': true, 'global.hideOfficialTools': true, 'global.dynamicTools': true,
    'minimal.enabled': true, 'minimal.bash': true, 'minimal.hidePwsh': true, 'minimal.hideOfficialTools': true, 'minimal.dynamicTools': true,
    'standard.enabled': true, 'standard.bash': true, 'standard.hidePwsh': true, 'standard.hideOfficialTools': true, 'standard.dynamicTools': true,
    'ptc.enabled': true, 'ptc.bash': true, 'ptc.hidePwsh': true, 'ptc.hideOfficialTools': true, 'ptc.dynamicTools': true,
    'cordis.enabled': true, 'cordis.bash': true, 'cordis.hidePwsh': true, 'cordis.hideOfficialTools': true, 'cordis.dynamicTools': true,
    'panel.enabled': false, 'tui.enabled': false, 'other.pwsh7Link': false,
});
/** The draft key of one switch. */
const flatKey = (path) => `${path[0]}.${path[1]}`;
exports.flatKey = flatKey;
/**
 * Read the page values out of the raw saved config.
 * @param raw - the host-provided saved values.
 * @returns one value per switch.
 */
function readRowValues(raw, options = {}) {
    const draft = {};
    const section = (id) => {
        const value = raw[id];
        return value !== null && typeof value === 'object' && !Array.isArray(value) ? value : {};
    };
    const read = (path) => {
        const value = section(path[0])[path[1]];
        if (typeof value === 'boolean')
            return value;
        // The link follows detection until the operator sets it explicitly.
        if (path[0] === 'other' && path[1] === 'pwsh7Link' && options.pwsh7Installed === true)
            return true;
        return DEFAULTS[`${path[0]}.${path[1]}`] ?? true;
    };
    for (const group of exports.GROUPS) {
        // A group's own switch lives in its section; a shared card's switches each
        // read their own section (panel/tui sit together in the "other" card).
        if (group.toggle)
            draft[`${group.id}.enabled`] = read([group.id, 'enabled']);
        for (const spec of group.fields)
            draft[(0, exports.flatKey)(spec.path)] = read(spec.path);
    }
    return draft;
}
/**
 * The bundle switches as the draft holds them.
 * @param draft - the current page values.
 * @returns the gate each preset's gated switches are checked against.
 */
function bundleGates(draft) {
    return {
        bash: draft['global.bash'] !== false,
        hidePwsh: draft['global.hidePwsh'] !== false,
        hideOfficialTools: draft['global.hideOfficialTools'] !== false,
        dynamicTools: draft['global.dynamicTools'] !== false,
    };
}
/**
 * The nested write operations that turn the saved values into the draft.
 * @param draft - the current page values.
 * @param raw - the saved values the draft was read from.
 * @returns path operations for `form.mutate`.
 */
function changedFields(draft, raw) {
    const baseline = readRowValues(raw);
    const operations = [];
    for (const group of exports.GROUPS) {
        const paths = group.toggle
            ? [at(group.id, 'enabled'), ...group.fields.map(spec => spec.path)]
            : group.fields.map(spec => spec.path);
        for (const path of paths) {
            const flat = (0, exports.flatKey)(path);
            if (draft[flat] === baseline[flat])
                continue;
            operations.push({ op: 'set', path: [path[0], path[1]], value: draft[flat] });
        }
    }
    return operations;
}

}},
"client/row-form.js":{imports:{"./forms.js":"client/forms.js","./row-schema.js":"client/row-schema.js"},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowForm = RowForm;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * The configuration page of the single `dsh-ops` row.
 *
 * Two bundle switches, four per preset, and one card for the opt-in features.
 * Presets start on, so they also start collapsed: a card is one line until the
 * operator opens it, and the enable switch stays outside the disclosure so a click
 * never changes both at once.
 */
const react_1 = require("react");
const forms_js_1 = require("./forms.js");
const row_schema_js_1 = require("./row-schema.js");
/** Configuration page of the row; `row-settings.tsx` binds the native Switch. */
function RowForm(props) {
    const { form, t, Switch, pwsh7Installed } = props;
    // A stable reader: a fresh closure would re-run the editor's effect every render.
    const read = (0, react_1.useMemo)(() => (value) => (0, row_schema_js_1.readRowValues)(value, { pwsh7Installed }), [pwsh7Installed]);
    const editor = (0, forms_js_1.useEditor)(form, read, t);
    const [opened, setOpened] = (0, react_1.useState)({});
    if (!editor.ready)
        return (0, jsx_runtime_1.jsx)(forms_js_1.Unavailable, { ...props });
    const draft = editor.draft, gates = (0, row_schema_js_1.bundleGates)(draft);
    // The companion linkage locks every host-PowerShell hide switch to off.
    const pwsh7Link = draft['other.pwsh7Link'] === true;
    // Detection would turn this on; an explicit off is worth naming so it is not read as a bug.
    const explicitOff = pwsh7Installed === true && draft['other.pwsh7Link'] === false;
    const set = (flat, value) => editor.edit({ ...draft, [flat]: value });
    return (0, jsx_runtime_1.jsxs)("form", { className: "ops-settings", onSubmit: event => { event.preventDefault(); void editor.save((0, row_schema_js_1.changedFields)(draft, editor.baseline)); }, children: [row_schema_js_1.GROUPS.map(group => {
                const enabled = group.toggle ? draft[`${group.id}.enabled`] !== false : true;
                // Disabling a preset greys its switches; it does not close the card.
                const expanded = opened[group.id] ?? !group.toggle;
                const showBody = group.fields.length > 0 && expanded;
                const head = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h4", { className: "ops-group-title", children: t(group.label) }), group.hint !== undefined && (0, jsx_runtime_1.jsx)("p", { className: "ops-field-hint", children: t(group.hint) })] });
                return (0, jsx_runtime_1.jsxs)("section", { className: "ops-group ops-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ops-group-head", children: [group.toggle ? (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "ops-disclosure", "aria-expanded": expanded, "aria-label": `${t(expanded ? 'collapseGroup' : 'expandGroup')} ${t(group.label)}`, onClick: () => setOpened({ ...opened, [group.id]: !expanded }), children: [(0, jsx_runtime_1.jsx)(Chevron, { open: expanded }), (0, jsx_runtime_1.jsx)("span", { className: "ops-field-text", children: head })] }) : (0, jsx_runtime_1.jsx)("div", { className: "ops-field-text", children: head }), group.toggle && (0, jsx_runtime_1.jsx)(Switch, { checked: enabled, label: t(group.label), disabled: editor.busy, onChange: (checked) => set(`${group.id}.enabled`, checked) })] }), group.id === 'other' && explicitOff && (0, jsx_runtime_1.jsx)("p", { className: "ops-field-hint", children: t('pwsh7ExplicitOffHint') }), showBody && (0, jsx_runtime_1.jsx)("div", { className: "ops-card-body", children: group.fields.map(spec => {
                                const locked = pwsh7Link && spec.path[1] === 'hidePwsh';
                                return (0, jsx_runtime_1.jsx)(SwitchRow, { spec: spec, checked: locked ? false : draft[(0, row_schema_js_1.flatKey)(spec.path)] !== false, gate: !locked && (spec.gatedBy === undefined || gates[spec.gatedBy]) && enabled, busy: editor.busy, t: t, Switch: Switch, onChange: checked => set((0, row_schema_js_1.flatKey)(spec.path), checked) }, (0, row_schema_js_1.flatKey)(spec.path));
                            }) })] }, group.id);
            }), (0, jsx_runtime_1.jsx)(forms_js_1.FormActions, { busy: editor.busy, dirty: editor.dirty, valid: true, reset: editor.reset, message: editor.message, t: t })] });
}
function SwitchRow(props) {
    const { spec, checked, gate, busy, t, Switch, onChange } = props;
    return (0, jsx_runtime_1.jsx)("div", { className: "ops-field", children: (0, jsx_runtime_1.jsxs)("div", { className: "ops-switch-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ops-field-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "ops-field-label", children: t(spec.label) }), spec.hint !== undefined && (0, jsx_runtime_1.jsx)("p", { className: "ops-field-hint", children: t(spec.hint) })] }), (0, jsx_runtime_1.jsx)(Switch, { checked: checked, label: t(spec.label), disabled: busy || !gate, onChange: onChange })] }) });
}
/** The host's disclosure chevron, copied from the native group toggle (12px, 1px stroke). */
function Chevron({ open }) {
    return (0, jsx_runtime_1.jsx)("svg", { className: "ops-chevron", width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", strokeWidth: "1", "aria-hidden": "true", style: { transform: open ? 'none' : 'rotate(-90deg)' }, children: (0, jsx_runtime_1.jsx)("path", { d: "M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6", stroke: "currentColor" }) });
}

}},
"client/row-settings.js":{imports:{"../adapter/dsh/browser.js":"adapter/dsh/browser.js","./row-form.js":"client/row-form.js"},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowSettings = RowSettings;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Binds the Host's native Switch to the row form.
 *
 * This is the only module in the bundle that names the primitives client module,
 * so the form logic stays importable (and drivable) without the Host's module
 * loader — see `row-form.tsx`.
 */
const react_1 = require("react");
const browser_js_1 = require("../adapter/dsh/browser.js");
const row_form_js_1 = require("./row-form.js");
function RowSettings(props) {
    const { plugins, pwsh7Installed, ...rest } = props;
    // Installed state changes while the host runs (the status card can install it), so the
    // page resolves it on open instead of trusting the value captured at boot.
    const [installed, setInstalled] = (0, react_1.useState)(pwsh7Installed);
    const [checked, setChecked] = (0, react_1.useState)(plugins === undefined);
    (0, react_1.useEffect)(() => {
        if (plugins === undefined)
            return;
        let current = true;
        void plugins.listPlugins().then(list => {
            if (!current)
                return;
            const rows = Array.isArray(list) ? list : list?.value;
            if (Array.isArray(rows))
                setInstalled(rows.some(row => typeof row === 'object' && row !== null
                    && ['entryId', 'moduleName', 'patchId'].some(key => typeof row[key] === 'string'
                        && (row[key]).includes('dsh-win-pwsh7'))));
            setChecked(true);
        }).catch(() => {
            if (current)
                setChecked(true);
        });
        return () => { current = false; };
    }, [plugins]);
    // The draft is read once when the form mounts; wait for the real answer so the
    // detection-driven default is not baked in as "absent".
    // A visible, honest state instead of an empty slot while the host answers.
    if (!checked)
        return (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: rest.t('loading') });
    return (0, jsx_runtime_1.jsx)(row_form_js_1.RowForm, { ...rest, pwsh7Installed: installed, Switch: browser_js_1.Switch });
}

}},
"client/runtime.js":{imports:{"./forms.js":"client/forms.js"},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRuntime = useRuntime;
/**
 * The Host runtime seam shared by a row's configuration page and the detail section.
 *
 * One hook owns the snapshot, the write actions and their honest result states, so
 * the status card and the configuration page cannot disagree about what the Host
 * reported. Every refresh carries the epoch it started in: a slow old response can
 * never overwrite a newer one.
 */
const react_1 = require("react");
const forms_js_1 = require("./forms.js");
/**
 * Mount the runtime remote for one page.
 * @param api - the typed remote the browser half mounted at apply time.
 * @returns the snapshot, the pending plan and the actions that operate on them.
 */
function useRuntime(api) {
    const [snapshot, setSnapshot] = (0, react_1.useState)(), [at, setAt] = (0, react_1.useState)();
    const [plan, setPlan] = (0, react_1.useState)(), [result, setResult] = (0, react_1.useState)();
    const [message, setMessage] = (0, react_1.useState)(''), [busy, setBusy] = (0, react_1.useState)(false);
    const cancellation = (0, react_1.useRef)(), mounted = (0, react_1.useRef)(true), epoch = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        mounted.current = true;
        void refresh();
        return () => { mounted.current = false; cancellation.current?.abort(); };
        // The remote identity is the mount boundary: a replaced service restarts the read.
    }, [api]);
    async function refresh(clearMessage = true) {
        const current = ++epoch.current;
        try {
            const response = await api.snapshot();
            if (!mounted.current || current !== epoch.current)
                return;
            if (response.ok) {
                setSnapshot(response.value);
                setAt(new Date().toLocaleTimeString());
                if (clearMessage)
                    setMessage('');
            }
            else {
                setSnapshot(undefined);
                setMessage(response.error.message);
            }
        }
        catch (error) {
            if (mounted.current && current === epoch.current)
                setMessage((0, forms_js_1.errorText)(error));
        }
    }
    async function preview(action) {
        setBusy(true);
        setMessage('');
        setResult(undefined);
        setPlan(undefined);
        try {
            const response = await api.plan(action);
            if (!mounted.current)
                return;
            if (response.ok)
                setPlan(response.value);
            else
                setMessage(response.error.message);
        }
        catch (error) {
            if (mounted.current)
                setMessage((0, forms_js_1.errorText)(error));
        }
        finally {
            if (mounted.current)
                setBusy(false);
        }
    }
    async function execute() {
        if (plan?.available !== true || busy)
            return;
        const controller = new AbortController();
        cancellation.current = controller;
        setBusy(true);
        setMessage('');
        try {
            const response = await api.execute(plan.id, controller.signal);
            if (!mounted.current)
                return;
            setResult(response.ok ? response.value : { status: controller.signal.aborted ? 'cancelled' : 'failed', effectState: 'unknown', message: response.error.message });
            setPlan(undefined);
            await refresh(false);
        }
        catch (error) {
            if (mounted.current)
                setResult({ status: controller.signal.aborted ? 'cancelled' : 'failed', effectState: 'unknown', message: (0, forms_js_1.errorText)(error) });
        }
        finally {
            cancellation.current = undefined;
            if (mounted.current) {
                setPlan(undefined);
                setBusy(false);
            }
        }
    }
    return {
        snapshot, at, busy, message, plan, result,
        refresh: () => refresh(), preview, execute,
        cancel: () => cancellation.current?.abort(),
        dismiss: () => setPlan(undefined),
    };
}

}},
"client/detail.js":{imports:{"./runtime.js":"client/runtime.js","./locales.js":"client/locales.js","./row-schema.js":"client/row-schema.js"},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusView = statusView;
exports.planLine = planLine;
exports.hasStatus = hasStatus;
exports.DiagnosticsSection = DiagnosticsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const runtime_js_1 = require("./runtime.js");
const locales_js_1 = require("./locales.js");
/** This plugin's package name; the detail slot is mounted for every plugin. */
const PACKAGE = 'dsh-ops';
/** The companion plugin this page can install; the only spec it is allowed to pass. */
const PWSH7 = 'dsh-win-pwsh7';
const row_schema_js_1 = require("./row-schema.js");
const none = (t) => t('statusNone');
/**
 * Map a runtime snapshot onto the facts an operator can verify.
 * @param snapshot - the Host answer, or undefined before the first one.
 * @param t - the row's locale.
 * @returns the fact list and the footnote.
 */
function statusView(snapshot, t) {
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
function planLine(line, t) {
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
function hasStatus(subject) {
    if (subject.kind === 'item')
        return false;
    // The section belongs to this plugin only: the slot is mounted for every detail
    // page, so matching on the subject kind alone painted the card on other plugins.
    if (subject.pkg.name !== PACKAGE)
        return false;
    if (subject.kind === 'bundle')
        return true;
    return subject.row.rowId === row_schema_js_1.ROW_ID;
}
/**
 * The `plugins.detail.section` contribution.
 * @param props - the page subject, its translator and the runtime remote.
 * @returns the section, or null on a page it has nothing for.
 */
function DiagnosticsSection(props) {
    const { subject, t, api, plugins } = props;
    if (!hasStatus(subject))
        return null;
    const enabled = subject.kind === 'bundle' ? subject.pkg.enabled : subject.kind === 'row' ? subject.row.enabled : false;
    if (!enabled)
        return null;
    return (0, jsx_runtime_1.jsx)(RuntimeStatus, { api: api, t: t, plugins: plugins });
}
function RuntimeStatus({ api, t, plugins }) {
    const runtime = (0, runtime_js_1.useRuntime)(api);
    const view = statusView(runtime.snapshot, t);
    const [install, setInstall] = (0, react_1.useState)('idle');
    const [pwshPlan, setPwshPlan] = (0, react_1.useState)({});
    const [elapsed, setElapsed] = (0, react_1.useState)(0);
    const [installError, setInstallError] = (0, react_1.useState)('');
    // installBundle blocks until the host applies it; a ticking line is the only honest
    // progress signal a page has, and it proves the action is not frozen.
    (0, react_1.useEffect)(() => {
        if (install !== 'running')
            return;
        setElapsed(0);
        const timer = setInterval(() => setElapsed(seconds => seconds + 1), 1000);
        return () => clearInterval(timer);
    }, [install]);
    const [workElapsed, setWorkElapsed] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
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
    const [companion, setCompanion] = (0, react_1.useState)({ state: 'unknown' });
    (0, react_1.useEffect)(() => {
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
        }).catch(() => {
            if (current)
                setCompanion({ state: 'unknown' });
        });
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
    return (0, jsx_runtime_1.jsx)("section", { className: "ops-detail", "aria-label": t('runtime'), children: (0, jsx_runtime_1.jsxs)("div", { className: "ops-status-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ops-detail-head", children: [(0, jsx_runtime_1.jsx)("h3", { className: "ops-detail-title", children: t('runtimeTitle') }), runtime.at !== undefined && (0, jsx_runtime_1.jsxs)("span", { className: "ops-detail-metric", children: [t('refreshedAt'), " ", runtime.at] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-small ops-detail-action", disabled: runtime.busy, onClick: () => void runtime.refresh(), children: runtime.busy ? t('redetecting') : t('redetect') })] }), runtime.snapshot === undefined
                    ? (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: runtime.message === '' ? t('noRuntime') : runtime.message })
                    : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "ops-status-body", children: [(0, jsx_runtime_1.jsx)("p", { className: "ops-status-lead", children: view.summary }), (0, jsx_runtime_1.jsxs)("dl", { className: "ops-facts", children: [view.facts.filter(fact => fact.label !== t('statusManaged')).map(fact => (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: fact.label }), (0, jsx_runtime_1.jsx)("dd", { children: fact.value })] }, fact.label)), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: t('statusManaged') }), (0, jsx_runtime_1.jsx)("dd", { children: runtime.snapshot.managed.length === 0
                                                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('statusNone'), win32 && (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-link ops-row-action", disabled: runtime.busy, onClick: () => void runtime.preview('install-bash'), children: t('installAction') })] })
                                                        : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [runtime.snapshot.managed.map(entry => entry.version).join(', '), owned && (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-link ops-row-action", disabled: runtime.busy, onClick: () => void runtime.preview('remove-bash'), children: t('removeAction') })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: t('pwsh7Plugin') }), (0, jsx_runtime_1.jsx)("dd", { children: companion.state === 'present'
                                                        ? `${t('pwsh7Present')}${(companion.version ?? runtime.snapshot?.companion) === undefined ? '' : `（${companion.version ?? runtime.snapshot?.companion}）`}`
                                                        : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('statusNone'), plugins !== undefined && (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-link ops-row-action", "aria-label": t('installPwsh7'), onClick: () => void openPwshPlan(), children: t('installAction') })] }) })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "ops-status-note", children: view.note })] }) }), install === 'planned' && (0, jsx_runtime_1.jsxs)("div", { className: "ops-preview", role: "region", "aria-label": t('preview'), children: [(0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: pwshPlan.version === undefined ? t('pwsh7PlanSource') : t('pwsh7PlanVersion', { version: pwshPlan.version }) }), (0, jsx_runtime_1.jsx)("li", { children: t('pwsh7PlanRestart') })] }), pwshPlan.reason !== undefined && (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: pwshPlan.reason }), (0, jsx_runtime_1.jsxs)("div", { className: "ops-actions", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-primary", disabled: runtime.busy, onClick: () => void installPwsh7(), children: t('execute') }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-text-button", onClick: () => setInstall('idle'), children: t('dismiss') })] })] }), install !== 'idle' && install !== 'planned' && (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: install === 'running' ? t('pwsh7Installing', { seconds: elapsed }) : install === 'done' ? t('pwsh7Installed') : `${t('pwsh7Failed')}${installError === '' ? '' : ` ${installError}`}` }), runtime.plan !== undefined && (0, jsx_runtime_1.jsxs)("div", { className: "ops-preview", role: "region", "aria-label": t('preview'), children: [(0, jsx_runtime_1.jsx)("p", { className: "ops-status-lead", children: t(locales_js_1.PLAN_KEYS[runtime.plan.action] ?? locales_js_1.PLAN_KEYS['install-bash']) }), (0, jsx_runtime_1.jsx)("ul", { children: runtime.plan.details.map((line, index) => (0, jsx_runtime_1.jsx)("li", { children: planLine(line, t) }, index)) }), runtime.plan.reason !== undefined && (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: runtime.plan.reason }), (0, jsx_runtime_1.jsxs)("div", { className: "ops-actions", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-primary", disabled: !runtime.plan.available || runtime.busy, onClick: () => void runtime.execute(), children: t('execute') }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-text-button", disabled: runtime.busy, onClick: () => runtime.dismiss(), children: t('dismiss') })] })] }), runtime.busy && (0, jsx_runtime_1.jsx)("p", { className: "ops-note", role: "status", children: t('busySeconds', { seconds: workElapsed }) }), runtime.busy && (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ops-text-button", onClick: () => runtime.cancel(), children: t('cancel') }), runtime.result !== undefined && (0, jsx_runtime_1.jsxs)("div", { className: "ops-result", role: "status", children: [(0, jsx_runtime_1.jsx)("p", { children: runtime.result.status === 'completed' ? t('resultApplied') : `${t('resultFailed')}${runtime.result.message}` }), runtime.result.exitCode !== undefined && (0, jsx_runtime_1.jsxs)("p", { children: [t('exitCode'), ": ", runtime.result.exitCode ?? '—'] }), runtime.result.effectState === 'unknown' && (0, jsx_runtime_1.jsx)("p", { children: t('unknownEffect') })] }), runtime.message !== '' && runtime.snapshot !== undefined && (0, jsx_runtime_1.jsx)("p", { className: "ops-field-error", role: "status", children: runtime.message })] }) });
}

}},
"client/styles.js":{imports:{},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS_CSS = void 0;
/**
 * The plugin pages' own chrome, drawn only with host theme tokens.
 *
 * No hex fallbacks on purpose: a token that disappears must fail loudly in review
 * instead of silently painting a colour that belongs to no theme. The page around
 * these elements is the Host's, so the 32px rhythm between detail sections and the
 * section title metrics come from it, not from here.
 */
exports.SETTINGS_CSS = `
.ops-settings { display:flex; flex-direction:column; gap:12px; min-width:0; color:var(--dsw-alias-label-primary); font:inherit; }
.ops-settings p { margin:0; line-height:1.55; overflow-wrap:anywhere; }
.ops-group { display:flex; flex-direction:column; min-width:0; }
/* One bordered card per group, the same chrome the PowerShell status card uses. */
/* The outline borrows the sunken block's colour, so a card reads as one surface
   rather than a box drawn on top of the page. */
/* Matches the settings cards in the native account page: a visible hairline. */
.ops-card { border:.5px solid var(--dsw-alias-border-l2); border-radius:var(--dsw-radius-lg); padding:14px; gap:10px; }
.ops-card .ops-group-head { align-items:flex-start; }
.ops-group-head > button[role=switch] { flex:none; margin-top:1px; }
/* The card head is a disclosure: title + description on the left, enable switch on
   the right; only the text side toggles the body, so the switch stays a switch. */
.ops-disclosure { flex:1 1 auto; min-width:0; display:flex; align-items:flex-start; gap:8px; margin:0; padding:0; border:0; background:none; color:inherit; font:inherit; text-align:left; cursor:pointer; }
.ops-disclosure:hover .ops-group-title { color:var(--dsw-alias-label-primary); }
.ops-chevron { flex:none; width:12px; height:12px; margin-top:4px; color:var(--dsw-alias-label-tertiary); transition:transform .12s ease; }
.ops-disclosure:focus-visible { outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary)); outline-offset:2px; border-radius:var(--dsw-radius-sm); }
.ops-card .ops-group-title { margin:0; }
/* The sub-switches sit on their own surface, like the status card's fact block:
   the card is the object, the body is what you can change inside it. */
.ops-card-body { display:flex; flex-direction:column; min-width:0; padding:12px; border-radius:var(--dsw-radius-md); background:var(--dsw-alias-interactive-bg-hover); }
.ops-card-body > .ops-field { padding:10px 0; }
.ops-card-body > .ops-field:first-child { padding-top:0; }
.ops-card-body > .ops-field:last-child { padding-bottom:0; }
.ops-card-body .ops-field + .ops-field { border-top:.5px solid var(--dsw-alias-border-l2); }
.ops-group-head { display:flex; align-items:flex-start; gap:16px; min-width:0; }
.ops-group-head .ops-field-text { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:2px; }

.ops-group-head > button:not(.ops-disclosure) { flex:none; }
.ops-group-title { margin:0 0 4px; font-size:13px; font-weight:600; line-height:20px; color:var(--dsw-alias-label-secondary); }
.ops-field { display:flex; flex-direction:column; gap:6px; padding:12px 0; min-width:0; }
.ops-field + .ops-field { border-top:.5px solid var(--dsw-alias-border-l2); }
.ops-field-label { font-size:13px; font-weight:500; line-height:1.5; color:var(--dsw-alias-label-primary); }
.ops-field-hint { margin:0; font-size:12px; line-height:1.5; color:var(--dsw-alias-label-tertiary); }
.ops-field-error { margin:0; font-size:12px; line-height:18px; color:var(--dsw-alias-state-error-primary); }
.ops-field-text { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:4px; }
.ops-switch-row { display:flex; align-items:flex-start; gap:16px; min-width:0; }
.ops-input { box-sizing:border-box; width:100%; height:34px; padding:0 12px; border:.5px solid var(--dsw-alias-border-l4); border-radius:var(--dsw-radius-md); background:var(--dsw-alias-bg-layer-3); color:var(--dsw-alias-label-primary); font:inherit; font-size:13px; line-height:1.5; }
.ops-input:focus-visible { outline:none; border-color:var(--dsw-alias-state-business-primary); }
.ops-input:disabled { color:var(--dsw-alias-label-tertiary); cursor:default; }
.ops-input[aria-invalid=true] { border-color:var(--dsw-alias-state-error-primary); }
.ops-list { border:0; margin:0; padding:12px 0; display:flex; flex-direction:column; gap:6px; min-width:0; }
.ops-choice { display:flex; align-items:center; gap:10px; min-height:28px; cursor:pointer; font-size:13px; }
.ops-choice input { width:16px; height:16px; accent-color:var(--dsw-alias-button-primary-fill); }
.ops-choice code { overflow-wrap:anywhere; font-size:12px; color:var(--dsw-alias-label-secondary); }
.ops-inline { display:flex; flex-wrap:wrap; align-items:center; gap:10px; }
.ops-text-button { appearance:none; border:0; background:none; padding:0; font:inherit; font-size:12px; line-height:1.5; color:var(--dsw-alias-label-secondary); cursor:pointer; text-align:left; }
.ops-text-button:hover:not(:disabled) { color:var(--dsw-alias-label-primary); }
.ops-text-button:disabled { color:var(--dsw-alias-label-tertiary); cursor:default; }
.ops-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:4px; }
.ops-primary, .ops-settings-primary { appearance:none; border:1px solid transparent; border-radius:var(--dsw-radius-md); padding:5px 14px; font:inherit; font-size:13px; line-height:1.5; cursor:pointer; background:var(--dsw-alias-label-primary); color:var(--dsw-alias-bg-layer-3); }
.ops-primary:disabled, .ops-settings-primary:disabled { opacity:.4; cursor:default; }
.ops-settings-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:4px; }
/* The reset is a text action, like the PowerShell plugin's: secondary colour, no chrome. */
.ops-small { box-sizing:border-box; height:28px; padding:0 10px; border:.5px solid var(--dsw-alias-border-l3); border-radius:var(--dsw-radius-sm); background:transparent; font:inherit; font-size:12px; line-height:18px; color:var(--dsw-alias-label-primary); cursor:pointer; }
.ops-small:disabled { opacity:.4; cursor:not-allowed; }
.ops-reset { border:none; background:none; padding:0; font:inherit; font-size:12px; line-height:1.5; color:var(--dsw-alias-label-secondary); cursor:pointer; }
.ops-reset:disabled { opacity:.4; cursor:default; }
.ops-status-lead { margin:0 0 12px; color:var(--dsw-alias-label-secondary); font-size:13px; line-height:1.6; }
.ops-status-note { margin:12px 0 0; color:var(--dsw-alias-label-tertiary); font-size:12px; line-height:1.6; }
.ops-row-action { margin-left:10px; }
.ops-link { border:none; background:none; padding:0; font:inherit; color:var(--dsw-alias-label-secondary); text-decoration:underline; text-underline-offset:2px; cursor:pointer; }
.ops-link:hover { color:var(--dsw-alias-label-primary); }
.ops-note { color:var(--dsw-alias-label-tertiary); font-size:12px; line-height:1.6; }
.ops-text-button:focus-visible, .ops-primary:focus-visible, .ops-settings-primary:focus-visible, .ops-small:focus-visible, .ops-reset:focus-visible, .ops-input:focus-visible, .ops-choice input:focus-visible { outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary)); outline-offset:1px; }
.ops-detail { display:flex; flex-direction:column; gap:12px; min-width:0; }
.ops-detail-head { display:flex; align-items:center; gap:10px; flex-wrap:wrap; min-width:0; }
.ops-detail-title { margin:0; flex:none; font-size:13px; font-weight:600; line-height:20px; color:var(--dsw-alias-label-primary); }
.ops-detail-metric { font-size:12px; line-height:18px; color:var(--dsw-alias-label-tertiary); }
.ops-detail-action { margin-left:auto; flex:none; }
.ops-status-card { display:flex; flex-direction:column; gap:10px; padding:14px; border:.5px solid var(--dsw-alias-border-l2); border-radius:var(--dsw-radius-lg); min-width:0; }
/* The facts sit on their own surface, the way the PowerShell plugin's card nests its
   estimate block: the card is the object, the shaded body is what it reports. */
.ops-status-body { padding:12px; border-radius:var(--dsw-radius-md); background:var(--dsw-alias-interactive-bg-hover); min-width:0; }
.ops-facts { display:grid; gap:6px; margin:0; }
/* Native description list: max-content label column, baseline alignment, 14px gap. */
.ops-facts > div { display:grid; grid-template-columns:max-content minmax(0,1fr); align-items:baseline; column-gap:14px; }
.ops-facts dt { color:var(--dsw-alias-label-tertiary); font-size:13px; }
.ops-facts dd { margin:0; overflow-wrap:anywhere; font-size:13px; }
.ops-note { margin:0; font-size:12px; line-height:1.6; color:var(--dsw-alias-label-tertiary); }
.ops-preview { display:flex; flex-direction:column; gap:10px; padding:12px; border-radius:var(--dsw-radius-md); background:var(--dsw-alias-interactive-bg-hover); font-size:13px; }
.ops-preview ul { margin:0; padding-left:20px; line-height:1.55; overflow-wrap:anywhere; }
.ops-result { display:flex; flex-direction:column; gap:4px; font-size:12px; line-height:1.5; color:var(--dsw-alias-label-secondary); }
.ops-result p { margin:0; }
@media(max-width:440px) { .ops-facts > div { grid-template-columns:1fr; gap:2px; } }
`;

}},
"client/index.js":{imports:{"../settings/runtime-contract.js":"settings/runtime-contract.js","./locales.js":"client/locales.js","./row-settings.js":"client/row-settings.js","./detail.js":"client/detail.js","./row-schema.js":"client/row-schema.js","./styles.js":"client/styles.js"},run(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.name = void 0;
exports.apply = apply;
const jsx_runtime_1 = require("react/jsx-runtime");
const runtime_contract_js_1 = require("../settings/runtime-contract.js");
const locales_js_1 = require("./locales.js");
const row_settings_js_1 = require("./row-settings.js");
const detail_js_1 = require("./detail.js");
const row_schema_js_1 = require("./row-schema.js");
const styles_js_1 = require("./styles.js");
exports.name = 'dsh-ops-settings';
exports.inject = ['slots', 'locale', 'remote'];
async function apply(ctx) {
    ctx.effect(() => ctx.locale.register('dshOps', { en: locales_js_1.en, zh: locales_js_1.zh }), 'dsh-ops: settings dictionaries');
    // Reach the remote through the service object, not through `ctx.remote.*`: the
    // dotted property is traced and only readable from a context that injects that
    // service, which a render callback is not.
    const remote = ctx.get('remote');
    // A missing remote must not blank the page: configuration still works, and the
    // status card reports the failure instead of pretending the runtime is fine.
    let mountError;
    try {
        await remote.$mount(runtime_contract_js_1.RUNTIME_REMOTE);
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
        style.textContent = styles_js_1.SETTINGS_CSS;
        document.head.append(style);
        return () => style.remove();
    }, 'dsh-ops: settings styles');
    // One page for the one row the bundle inserts. The row carries the whole
    // configuration, so a saved row override still opens this page.
    ctx.slots.inject('plugins.row.config', function* () {
        yield ctx.slots.register({ name: 'plugins.row.config', key: `${row_schema_js_1.ROW_ID}#${row_schema_js_1.ROW_ID}`, locale: 'dshOps' }, (props) => props.view === 'summary'
            ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.t('rowSummary') })
            : (0, jsx_runtime_1.jsx)(row_settings_js_1.RowSettings, { ...props, pwsh7Installed: pwsh7Installed, plugins: plugins }));
    });
    // The status card reports the Host runtime; a row without runtime facts renders
    // nothing, and a disabled bundle or row renders nothing either. Configuration
    // stays on the row's own page, which is the one native slot that hands a page a
    // writable form for this row; the bundle page only carries this card.
    ctx.slots.inject('plugins.detail.section', function* () {
        yield ctx.slots.register({ name: 'plugins.detail.section', id: 'dsh-ops.diagnostics', order: 50, locale: 'dshOps' }, (props) => (0, jsx_runtime_1.jsx)(detail_js_1.DiagnosticsSection, { ...props, api: api, plugins: plugins }));
    });
}

}}};
const cache=Object.create(null);
function load(id){if(cache[id])return cache[id].exports;const entry=modules[id];if(!entry)throw new Error("Unknown OPS browser module: "+id);const module={exports:{}};cache[id]=module;entry.run(module,module.exports,request=>Object.hasOwn(entry.imports,request)?load(entry.imports[request]):require(request));return module.exports;}
return load("client/index.js");
}});
