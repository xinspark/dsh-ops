import type { ReactElement } from 'react';
import type { SettingsProps } from './forms.js';
/** The subset of the native Switch this page binds. */
export interface SwitchBinding {
    (props: {
        checked: boolean;
        label: string;
        disabled?: boolean;
        onChange(checked: boolean): void;
    }): ReactElement;
}
/** Configuration page of the row; `row-settings.tsx` binds the native Switch. */
export declare function RowForm(props: SettingsProps & {
    Switch: SwitchBinding;
    pwsh7Installed?: boolean;
}): import("react/jsx-runtime").JSX.Element;
