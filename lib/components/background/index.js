import { retired as retiredLegacyRow } from '../../settings/legacy.js';
export const name = "dsh-ops-background";
export const REMOVED_MESSAGE = "dsh-ops: the dsh-ops/background component (FastCtx background jobs) was removed in this version; it publishes no tools. Delete this row from the profile configuration.";
export function apply(ctx, _config) {
    if (retiredLegacyRow(ctx, 'background'))
        return;
    const logger = ctx?.logger;
    if (typeof logger?.warn === "function")
        logger.warn(REMOVED_MESSAGE);
    else
        console.warn(REMOVED_MESSAGE);
}
