import { applyMode } from '../../modes/apply.js';
import { modeConfigForm } from '../../modes/config.js';
import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export const name = 'dsh-ops-mode-standard';
export const Config = modeConfigForm('standard');
export function apply(ctx, config) {
    if (retiredLegacyRow(ctx, 'standard'))
        return;
    applyMode(ctx, config, 'standard');
}
