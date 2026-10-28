import { applyComponent } from '../../index.js';
import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export { Config } from '../../settings/file-config.js';
export const name = 'dsh-ops-file';
export function apply(ctx, config) {
    if (retiredLegacyRow(ctx, 'file'))
        return;
    applyComponent(ctx, config, 'file');
}
