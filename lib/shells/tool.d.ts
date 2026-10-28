/**
 * The `ops_bash` tool definition, its rendered result shape, and the canonical
 * output contract it registers.
 *
 * The definition is a plain object — no `@deepseek-ai/*` value import, at load
 * time or later — and it is registered through the caller's own
 * `ctx.tools.register`, never by rewriting the shared registry. Its one host
 * dependency, the subprocess service, is read with `ctx.get('subprocess')`:
 * reaching a host service through `ctx.get` needs no import, and it buys the
 * harness's real credential scrub and process governance instead of a
 * hand-rolled spawn.
 *
 * @module dsh-ops/shells/tool
 */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ShellResult, SettledShellResult, ShellExecutorOptions, LegacyShellDefinition } from './types.js';
/**
 * Compose the model-facing text for one settled run.
 *
 * The shape matches the host's own bash tool
 * (`packages/shell/tool-bash/src/render.ts`): the body is stdout, then a marked
 * stderr section, then interruption markers, with `[exit code: N]` last so a
 * reader can anchor on it. A non-zero exit is reported rather than raised; only
 * an infrastructure failure (a spawn failure) rejects the call.
 * @param {object} value - the canonical result value.
 * @returns {string} the rendered text.
 */
export declare function renderBashResult(value: ShellResult): string;
/**
 * The canonical output contract of `ops_bash`, as plain JSON Schema.
 *
 * EVERY `type` here is a single type string: the harness's
 * `assertSupportedJsonSchema` rejects type arrays outright ("type arrays are
 * not supported", `packages/core/tools/src/json-schema.ts:302-307`), so
 * `['integer', 'null']` is a definition the real registry refuses to register.
 * "Nothing to report" is expressed by OMITTING the key, never by a `null`, which
 * is why `exitCode` and `signal` are optional rather than nullable.
 *
 * Exported beside the definition so a test can validate a wrapped value against
 * the very schema the host enforces on this tool (#235): a refusal folded into a
 * value that does not satisfy it is what the host reports as "returned invalid
 * output".
 */
/** @type {import('@deepseek-ai/dsh-tools').JsonSchemaNode} */
export declare const BASH_OUTPUT_SCHEMA: JsonSchemaNode;
/**
 * Stamp one settled result with its one-word outcome, so ops_bash shares the
 * `status` field the file tools use (#44). Only a clean zero exit is
 * `completed`; any error, restriction, signal, cancellation or timeout is `failed`.
 * @param {import('./types.js').ShellResult} value - the canonical result value, without `status`.
 * @returns {import('./types.js').SettledShellResult} the same value with `status` (re)computed.
 */
export declare function withBashStatus(value: ShellResult): SettledShellResult;
/**
 * The model-facing description of the bash rung.
 *
 * It states the rung's position in the ladder and the recovery step on failure,
 * so the model fixes the command instead of switching shells — the same contract
 * `lib/policy.js` renders into the prompt.
 * @returns {string} the description.
 */
export declare function bashToolDescription(): string;
/**
 * One `ops_bash` tool definition, bound to the resolved bash executable.
 *
 * The definition is a plain object — no `@deepseek-ai/*` value import, at load
 * time or later — and it is registered through the caller's own
 * `ctx.tools.register`, never by rewriting the shared registry. Its one host
 * dependency, the subprocess service, is read with `ctx.get('subprocess')`:
 * reaching a host service through `ctx.get` needs no import, and it buys the
 * harness's real credential scrub and process governance instead of a
 * hand-rolled spawn.
 * @param {import('./types.js').ShellExecutorOptions} options - the typed host executor inputs.
 * @returns {import('./types.js').LegacyShellDefinition} the legacy executor definition wrapped by the host projection.
 */
export declare function bashToolDefinition({ file, source, subprocess, prepareArgv, env, projectResult }: ShellExecutorOptions): LegacyShellDefinition;
