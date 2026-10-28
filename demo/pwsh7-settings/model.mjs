/**
 * Pure state model behind the PowerShell / tool-exposure settings demo.
 *
 * The demo page and the reference React component share these functions, so a
 * visual state and the code that ships cannot disagree about what "effective"
 * means. No host imports, no DOM.
 */

/** Mode-row keys this surface owns, in render order. */
export const OPTION_KEYS = Object.freeze([
  'publishBashTool',
  'hidePwsh',
  'hideOfficialTools',
  'discoveryEnabled',
])

/**
 * The bundle-level master that gates a mode-row option.
 * `undefined` means the option has no master and is always effective.
 */
export const MASTER_OF = Object.freeze({
  hideOfficialTools: 'hideOfficialTools',
  discoveryEnabled: 'dynamicTools',
})

/** Defaults the maintainer specified: everything on. */
export const DEFAULT_VALUE = Object.freeze({
  publishBashTool: true,
  hidePwsh: true,
  hideOfficialTools: true,
  discoveryEnabled: true,
})

/**
 * The state of one option.
 *
 * A child keeps the user's saved value when its master is off; it only stops
 * taking effect. `checked` is what is saved, `enabled` is the master gate alone,
 * and `applies` is what the host actually runs (`checked && enabled`). Keeping
 * all three lets the UI render a disabled but still-checked switch without
 * losing the user's intent.
 *
 * @param {string} key - one of OPTION_KEYS.
 * @param {Record<string, unknown>} value - the mode row's saved config.
 * @param {Record<string, unknown>} masters - bundle-level master switches.
 * @returns {{ key: string, checked: boolean, enabled: boolean, applies: boolean, gatedBy: string|null }}
 */
export function resolveOption(key, value, masters) {
  const master = MASTER_OF[key]
  const checked = value?.[key] !== false
  const enabled = master === undefined ? true : masters?.[master] !== false
  return { key, checked, enabled, applies: checked && enabled, gatedBy: master ?? null }
}

/**
 * All four options in render order.
 * @param {Record<string, unknown>} value - the mode row's saved config.
 * @param {Record<string, unknown>} masters - bundle-level master switches.
 * @returns {ReturnType<typeof resolveOption>[]}
 */
export function resolveOptions(value, masters) {
  return OPTION_KEYS.map((key) => resolveOption(key, value, masters))
}

/**
 * Which PowerShell entry the model sees, and how it got there.
 *
 * Four states, matching the issue comment:
 * - hidden + no linked plugin  -> nothing visible;
 * - hidden + linked plugin     -> the linked plugin adds `pwsh7`;
 * - visible + no linked plugin -> the host's own Windows PowerShell 5.1;
 * - visible + linked plugin    -> the host's `pwsh` entry, executor overridden
 *   to pwsh7. No second entry is added in the override case.
 *
 * @param {{ hidePwsh?: boolean, linkedInstalled?: boolean }} input
 * @returns {{ mode: 'hidden'|'added'|'official'|'override', visible: string|null, version: string|null }}
 */
export function resolvePwshSurface({ hidePwsh = true, linkedInstalled = false } = {}) {
  if (hidePwsh && linkedInstalled) return { mode: 'added', visible: 'pwsh7', version: '7' }
  if (hidePwsh) return { mode: 'hidden', visible: null, version: null }
  if (linkedInstalled) return { mode: 'override', visible: 'pwsh', version: '7' }
  return { mode: 'official', visible: 'pwsh', version: '5.1' }
}

/**
 * The compact "model will see" summary rendered under the four rows.
 * @param {Record<string, unknown>} value
 * @param {Record<string, unknown>} masters
 * @param {{ linkedInstalled?: boolean }} linked
 * @returns {string[]}
 */
export function visibleTools(value, masters, linked = {}) {
  const options = resolveOptions(value, masters)
  const on = (key) => options.find((option) => option.key === key)?.applies === true
  const tools = []
  if (on('publishBashTool')) tools.push('ops_bash')
  const surface = resolvePwshSurface({ hidePwsh: value?.hidePwsh !== false, linkedInstalled: linked.linkedInstalled === true })
  if (surface.visible === 'pwsh7') tools.push('pwsh7')
  else if (surface.visible === 'pwsh') tools.push(surface.mode === 'override' ? 'pwsh -> pwsh7' : 'pwsh 5.1')
  else tools.push('no pwsh')
  tools.push(on('hideOfficialTools') ? 'read/glob/grep -> OPS' : 'read/glob/grep official')
  tools.push(on('discoveryEnabled') ? 'dynamic discovery' : 'resident only')
  return tools
}
