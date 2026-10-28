import { applyMode } from '../../modes/apply.js';
import { modeConfigForm } from '../../modes/config.js';
import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export const name = 'dsh-ops-mode-cordis';
export const Config = modeConfigForm('cordis');
export function apply(ctx, config) {
    if (retiredLegacyRow(ctx, 'cordis'))
        return;
    applyMode(ctx, config, 'cordis');
}
