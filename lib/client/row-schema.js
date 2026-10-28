/** The row id the single bundle row declares. */
export const ROW_ID = 'dsh-ops';
const at = (section, key) => [section, key];
const field = (path, label, hint, gatedBy) => ({ path, label, hint, ...(gatedBy === undefined ? {} : { gatedBy }) });
/** The two bundle switches. */
export const GLOBAL = Object.freeze([
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
export const GROUPS = Object.freeze([
    { id: 'global', label: 'groupGlobal', hint: 'groupGlobalHint', toggle: false, fields: GLOBAL },
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
export const flatKey = (path) => `${path[0]}.${path[1]}`;
/**
 * Read the page values out of the raw saved config.
 * @param raw - the host-provided saved values.
 * @returns one value per switch.
 */
export function readRowValues(raw, options = {}) {
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
    for (const group of GROUPS) {
        // A group's own switch lives in its section; a shared card's switches each
        // read their own section (panel/tui sit together in the "other" card).
        if (group.toggle)
            draft[`${group.id}.enabled`] = read([group.id, 'enabled']);
        for (const spec of group.fields)
            draft[flatKey(spec.path)] = read(spec.path);
    }
    return draft;
}
/**
 * The bundle switches as the draft holds them.
 * @param draft - the current page values.
 * @returns the gate each preset's gated switches are checked against.
 */
export function bundleGates(draft) {
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
export function changedFields(draft, raw) {
    const baseline = readRowValues(raw);
    const operations = [];
    for (const group of GROUPS) {
        const paths = group.toggle
            ? [at(group.id, 'enabled'), ...group.fields.map(spec => spec.path)]
            : group.fields.map(spec => spec.path);
        for (const path of paths) {
            const flat = flatKey(path);
            if (draft[flat] === baseline[flat])
                continue;
            operations.push({ op: 'set', path: [path[0], path[1]], value: draft[flat] });
        }
    }
    return operations;
}
