import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_VALUE,
  OPTION_KEYS,
  resolveOption,
  resolveOptions,
  resolvePwshSurface,
  visibleTools,
} from './model.mjs'

const masters = { hideOfficialTools: true, dynamicTools: true }

test('every option defaults to on', () => {
  assert.deepEqual(OPTION_KEYS, Object.keys(DEFAULT_VALUE))
  for (const option of resolveOptions(DEFAULT_VALUE, masters)) {
    assert.equal(option.checked, true)
    assert.equal(option.enabled, true)
    assert.equal(option.applies, true)
  }
})

test('a master off disables its child but keeps the stored value', () => {
  const option = resolveOption('hideOfficialTools', { hideOfficialTools: true }, { hideOfficialTools: false })
  assert.equal(option.checked, true)
  assert.equal(option.enabled, false)
  assert.equal(option.applies, false)
  assert.equal(option.gatedBy, 'hideOfficialTools')

  const off = resolveOption('hideOfficialTools', { hideOfficialTools: false }, { hideOfficialTools: false })
  assert.equal(off.checked, false)
  assert.equal(off.enabled, false)
  assert.equal(off.applies, false)
})

test('options without a master are always effective', () => {
  for (const key of ['publishBashTool', 'hidePwsh']) {
    const option = resolveOption(key, { [key]: true }, {})
    assert.equal(option.enabled, true)
    assert.equal(option.applies, true)
    assert.equal(option.gatedBy, null)
  }
})

test('pwsh surface has exactly four states', () => {
  assert.deepEqual(resolvePwshSurface({ hidePwsh: true, linkedInstalled: false }), { mode: 'hidden', visible: null, version: null })
  assert.deepEqual(resolvePwshSurface({ hidePwsh: true, linkedInstalled: true }), { mode: 'added', visible: 'pwsh7', version: '7' })
  assert.deepEqual(resolvePwshSurface({ hidePwsh: false, linkedInstalled: false }), { mode: 'official', visible: 'pwsh', version: '5.1' })
  assert.deepEqual(resolvePwshSurface({ hidePwsh: false, linkedInstalled: true }), { mode: 'override', visible: 'pwsh', version: '7' })
})

test('the override state never adds a second entry', () => {
  const override = resolvePwshSurface({ hidePwsh: false, linkedInstalled: true })
  assert.equal(override.visible, 'pwsh')
  assert.equal(override.mode, 'override')
})

test('visible tools follows the effective bits, not the stored ones', () => {
  assert.deepEqual(
    visibleTools(DEFAULT_VALUE, masters, { linkedInstalled: true }),
    ['ops_bash', 'pwsh7', 'read/glob/grep -> OPS', 'dynamic discovery'],
  )
  assert.deepEqual(
    visibleTools(DEFAULT_VALUE, { hideOfficialTools: false, dynamicTools: false }, { linkedInstalled: true }),
    ['ops_bash', 'pwsh7', 'read/glob/grep official', 'resident only'],
  )
  assert.deepEqual(
    visibleTools({ ...DEFAULT_VALUE, hidePwsh: false }, masters, { linkedInstalled: true }),
    ['ops_bash', 'pwsh -> pwsh7', 'read/glob/grep -> OPS', 'dynamic discovery'],
  )
  assert.deepEqual(
    visibleTools({ ...DEFAULT_VALUE, publishBashTool: false, hidePwsh: false }, masters, { linkedInstalled: false }),
    ['pwsh 5.1', 'read/glob/grep -> OPS', 'dynamic discovery'],
  )
})
