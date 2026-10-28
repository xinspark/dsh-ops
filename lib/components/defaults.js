/** Package defaults only. Saved Loader overrides take precedence over this layer. */
export const COMPONENTS = ['mode-minimal', 'mode-standard', 'mode-ptc', 'mode-cordis', 'discovery', 'panel', 'tui'];
export function componentEnabled(component, _platform) {
    // Enhanced presets and progressive discovery start enabled; data capture and
    // the TUI integration are opt-in.
    return !['panel', 'tui'].includes(component);
}
export function componentEntry(component) { return `dsh-ops/${component}`; }
