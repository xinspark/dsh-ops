import type { ConfigPageForm, PluginConfigViewProps } from '../adapter/dsh/types.js';
import type { SettingsPathOpView } from '../adapter/dsh/types.js';
import type { Translator } from './locales.js';
export type SettingsProps = PluginConfigViewProps & {
    t: Translator;
};
export declare const errorText: (value: unknown) => string;
/**
 * A whole-page editor over one row's saved values.
 *
 * `baseline` is the value the draft was read from, not the latest Host value: a
 * Host reload while the page is dirty (another surface saved, the row was
 * re-applied) must not turn an untouched field into a write. Without it, saving
 * one changed switch would also clear a field somebody else had just set.
 */
export declare function useEditor<T>(form: ConfigPageForm | undefined, read: (value: Record<string, unknown>) => T, t: Translator): {
    draft: T;
    baseline: Record<string, unknown>;
    edit: (value: T) => void;
    dirty: boolean;
    busy: boolean;
    ready: boolean;
    message: string;
    reset: () => void;
    save: (operations: readonly SettingsPathOpView[]) => Promise<void>;
};
export declare function Unavailable({ form, t }: SettingsProps): import("react/jsx-runtime").JSX.Element;
export declare function FormActions({ busy, dirty, valid, reset, message, t }: {
    busy: boolean;
    dirty: boolean;
    valid?: boolean;
    reset(): void;
    message: string;
    t: Translator;
}): import("react/jsx-runtime").JSX.Element;
