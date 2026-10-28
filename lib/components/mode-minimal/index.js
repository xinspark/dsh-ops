import { applyMode } from '../../modes/apply.js';
import { modeConfigForm } from '../../modes/config.js';
import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export const name = 'dsh-ops-mode-minimal';
export const Config = modeConfigForm('minimal');
export function apply(ctx, config) {
    if (retiredLegacyRow(ctx, 'minimal'))
        return;
    applyMode(ctx, config, 'minimal');
}
