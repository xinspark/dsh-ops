import { applyMode } from '../../modes/apply.js';
import { modeConfigForm } from '../../modes/config.js';
import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export const name = 'dsh-ops-mode-ptc';
export const Config = modeConfigForm('ptc');
export function apply(ctx, config) {
    if (retiredLegacyRow(ctx, 'ptc'))
        return;
    applyMode(ctx, config, 'ptc');
}
