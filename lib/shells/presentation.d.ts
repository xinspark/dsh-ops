/** Pure, replayable shell cards through the host's public presentation contract. */
import type { ToolDefinition } from '../adapter/dsh/types.js';
export declare const presentBashCall: NonNullable<ToolDefinition['presentCall']>;
/** Only process facts are persisted here; output remains in the host's content record. */
export declare const bashPresentationMeta: NonNullable<ToolDefinition['output']['presentationMeta']>;
export declare const presentBashResult: NonNullable<ToolDefinition['presentResult']>;
