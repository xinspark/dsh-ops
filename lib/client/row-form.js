import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * The configuration page of the single `dsh-ops` row.
 *
 * Two bundle switches, four per preset, and one card for the opt-in features.
 * Presets start on, so they also start collapsed: a card is one line until the
 * operator opens it, and the enable switch stays outside the disclosure so a click
 * never changes both at once.
 */
import { useMemo, useState } from 'react';
import { FormActions, Unavailable, useEditor } from './forms.js';
import { GROUPS, bundleGates, changedFields, flatKey, readRowValues } from './row-schema.js';
/** Configuration page of the row; `row-settings.tsx` binds the native Switch. */
export function RowForm(props) {
    const { form, t, Switch, pwsh7Installed } = props;
    // A stable reader: a fresh closure would re-run the editor's effect every render.
    const read = useMemo(() => (value) => readRowValues(value, { pwsh7Installed }), [pwsh7Installed]);
    const editor = useEditor(form, read, t);
    const [opened, setOpened] = useState({});
    if (!editor.ready)
        return _jsx(Unavailable, { ...props });
    const draft = editor.draft, gates = bundleGates(draft);
    // The companion linkage locks every host-PowerShell hide switch to off.
    const pwsh7Link = draft['other.pwsh7Link'] === true;
    // Detection would turn this on; an explicit off is worth naming so it is not read as a bug.
    const explicitOff = pwsh7Installed === true && draft['other.pwsh7Link'] === false;
    const set = (flat, value) => editor.edit({ ...draft, [flat]: value });
    return _jsxs("form", { className: "ops-settings", onSubmit: event => { event.preventDefault(); void editor.save(changedFields(draft, editor.baseline)); }, children: [GROUPS.map(group => {
                const enabled = group.toggle ? draft[`${group.id}.enabled`] !== false : true;
                // Disabling a preset greys its switches; it does not close the card.
                const expanded = opened[group.id] ?? !group.toggle;
                const showBody = group.fields.length > 0 && expanded;
                const head = _jsxs(_Fragment, { children: [_jsx("h4", { className: "ops-group-title", children: t(group.label) }), group.hint !== undefined && _jsx("p", { className: "ops-field-hint", children: t(group.hint) })] });
                return _jsxs("section", { className: "ops-group ops-card", children: [_jsxs("div", { className: "ops-group-head", children: [group.toggle ? _jsxs("button", { type: "button", className: "ops-disclosure", "aria-expanded": expanded, "aria-label": `${t(expanded ? 'collapseGroup' : 'expandGroup')} ${t(group.label)}`, onClick: () => setOpened({ ...opened, [group.id]: !expanded }), children: [_jsx(Chevron, { open: expanded }), _jsx("span", { className: "ops-field-text", children: head })] }) : _jsx("div", { className: "ops-field-text", children: head }), group.toggle && _jsx(Switch, { checked: enabled, label: t(group.label), disabled: editor.busy, onChange: (checked) => set(`${group.id}.enabled`, checked) })] }), group.id === 'other' && explicitOff && _jsx("p", { className: "ops-field-hint", children: t('pwsh7ExplicitOffHint') }), showBody && _jsx("div", { className: "ops-card-body", children: group.fields.map(spec => {
                                const locked = pwsh7Link && spec.path[1] === 'hidePwsh';
                                return _jsx(SwitchRow, { spec: spec, checked: locked ? false : draft[flatKey(spec.path)] !== false, gate: !locked && (spec.gatedBy === undefined || gates[spec.gatedBy]) && enabled, busy: editor.busy, t: t, Switch: Switch, onChange: checked => set(flatKey(spec.path), checked) }, flatKey(spec.path));
                            }) })] }, group.id);
            }), _jsx(FormActions, { busy: editor.busy, dirty: editor.dirty, valid: true, reset: editor.reset, message: editor.message, t: t })] });
}
function SwitchRow(props) {
    const { spec, checked, gate, busy, t, Switch, onChange } = props;
    return _jsx("div", { className: "ops-field", children: _jsxs("div", { className: "ops-switch-row", children: [_jsxs("div", { className: "ops-field-text", children: [_jsx("span", { className: "ops-field-label", children: t(spec.label) }), spec.hint !== undefined && _jsx("p", { className: "ops-field-hint", children: t(spec.hint) })] }), _jsx(Switch, { checked: checked, label: t(spec.label), disabled: busy || !gate, onChange: onChange })] }) });
}
/** The host's disclosure chevron, copied from the native group toggle (12px, 1px stroke). */
function Chevron({ open }) {
    return _jsx("svg", { className: "ops-chevron", width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", strokeWidth: "1", "aria-hidden": "true", style: { transform: open ? 'none' : 'rotate(-90deg)' }, children: _jsx("path", { d: "M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6", stroke: "currentColor" }) });
}
