/** Package defaults only. Saved Loader overrides take precedence over this layer. */
export declare const COMPONENTS: readonly ["mode-minimal", "mode-standard", "mode-ptc", "mode-cordis", "discovery", "panel", "tui"];
export type Component = typeof COMPONENTS[number];
export declare function componentEnabled(component: Component, _platform: string): boolean;
export declare function componentEntry(component: Component): string;
