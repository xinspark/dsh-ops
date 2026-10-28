/**
 * Reference React implementation of the PowerShell / tool-exposure settings.
 *
 * This file is a demo artefact, not part of the OPS build: `demo/` is outside
 * `tsconfig.json`'s `src` root. It is written against the same pieces the
 * shipped client uses (`Switch` from the host primitives, `--dsw-alias-*`
 * tokens, flat sections), so moving it into `src/client/` is a paste plus
 * import fix-up, not a rewrite.
 *
 * Two exports:
 * - `ShellOptionsSection` — the four mode-row switches and the model summary;
 * - `LinkedShellCard` — the dsh-win-pwsh7 status/install block.
 *
 * Both are controlled: they never read or write the host themselves. The
 * caller passes the current values and persists changes through `configForms`.
 */
import type { ReactNode } from 'react'
import { Switch } from '@deepseek-ai/dsh-client-ui-primitives'
import {
  OPTION_KEYS,
  resolveOptions,
  resolvePwshSurface,
  visibleTools,
} from './model.mjs'

export interface ShellSettings {
  publishBashTool: boolean
  hidePwsh: boolean
  hideOfficialTools: boolean
  discoveryEnabled: boolean
}

export interface Masters {
  hideOfficialTools: boolean
  dynamicTools: boolean
}

export interface LinkedPlugin {
  state: 'missing' | 'installed'
  version?: string
  pwshVersion?: string
  path?: string
}

export interface ShellOptionsProps {
  value: ShellSettings
  masters: Masters
  linked: LinkedPlugin
  disabled?: boolean
  onChange(patch: Partial<ShellSettings>): void
}

export interface LinkedShellProps {
  linked: LinkedPlugin
  hidePwsh: boolean
  busy?: boolean
  message?: string
  onInstall?(): void
  onRecheck?(): void
}

type LabelKey =
  | 'publishBashTool' | 'publishBashToolHint'
  | 'hidePwsh' | 'hidePwshMissing' | 'hidePwshAdded' | 'hidePwshOverride'
  | 'hideOfficialTools' | 'hideOfficialToolsHint'
  | 'discoveryEnabled' | 'discoveryEnabledHint'
  | 'gated' | 'summary' | 'installed' | 'missing' | 'install' | 'recheck'
  | 'linkedTitle' | 'linkedHint' | 'version' | 'powerShell' | 'path' | 'status' | 'enabled'

export const LABELS: Record<'zh' | 'en', Record<LabelKey, string>> = {
  zh: {
    publishBashTool: '开启 bash 工具',
    publishBashToolHint: '向已授权会话发布 ops_bash。关闭后只保留文件工具。',
    hidePwsh: '隐藏 pwsh',
    hidePwshMissing: '隐藏宿主自带的 pwsh。关闭后 Windows PowerShell 5.1 会直接暴露给模型。',
    hidePwshAdded: '隐藏官方 pwsh，由 dsh-win-pwsh7 提供 pwsh7。',
    hidePwshOverride: '保留官方 pwsh 入口，执行器切换为 pwsh7（覆盖，不新增第二个入口）。',
    hideOfficialTools: '隐藏原版工具',
    hideOfficialToolsHint: 'OPS 接管 read / glob / grep 时，隐藏对应的官方工具。',
    discoveryEnabled: '启用动态工具加载',
    discoveryEnabledHint: '按需发现并加载 OPS 能力；关闭后只保留始终加载项。',
    gated: '受总开关停用',
    summary: '模型将看到',
    installed: '已安装',
    missing: '未安装',
    install: '安装 dsh-win-pwsh7',
    recheck: '重新检测',
    linkedTitle: 'PowerShell 联动',
    linkedHint: '安装后：隐藏 pwsh 开启时由联动插件新增 pwsh7；关闭时保留官方 pwsh 入口，只覆盖执行器。',
    version: '版本',
    powerShell: 'PowerShell',
    path: '路径',
    status: '状态',
    enabled: '已启用 · 执行器可用',
  },
  en: {
    publishBashTool: 'Enable the bash tool',
    publishBashToolHint: 'Publishes ops_bash to authorized sessions. Off keeps only the file tools.',
    hidePwsh: 'Hide pwsh',
    hidePwshMissing: 'Hides the host pwsh. Off exposes Windows PowerShell 5.1 to the model.',
    hidePwshAdded: 'Hides the official pwsh; dsh-win-pwsh7 provides pwsh7.',
    hidePwshOverride: 'Keeps the official pwsh entry and switches its executor to pwsh7 (override, no second entry).',
    hideOfficialTools: 'Hide the official tools',
    hideOfficialToolsHint: 'Hides the matching official tool while OPS owns read / glob / grep.',
    discoveryEnabled: 'Enable dynamic tool loading',
    discoveryEnabledHint: 'Discovers and loads OPS capabilities on demand; off keeps the always-loaded set.',
    gated: 'Disabled by its master switch',
    summary: 'The model will see',
    installed: 'Installed',
    missing: 'Not installed',
    install: 'Install dsh-win-pwsh7',
    recheck: 'Check again',
    linkedTitle: 'PowerShell link',
    linkedHint: 'Once installed: with Hide pwsh on, the linked plugin adds pwsh7; with it off, the official pwsh entry stays and only its executor changes.',
    version: 'Version',
    powerShell: 'PowerShell',
    path: 'Path',
    status: 'Status',
    enabled: 'Enabled · executor available',
  },
}

function label(locale: 'zh' | 'en', key: LabelKey): string {
  return LABELS[locale][key]
}

function Row(props: {
  title: string
  hint: ReactNode
  checked: boolean
  disabled: boolean
  badge?: string
  onChange(checked: boolean): void
}) {
  return (
    <div className="ops-shell-row" style={props.disabled ? { opacity: 0.72 } : undefined}>
      <div className="ops-shell-row-text">
        <div className="ops-shell-row-title">{props.title}</div>
        <p className="ops-shell-row-hint">{props.hint}</p>
      </div>
      <div className="ops-shell-row-side">
        {props.badge && <span className="ops-shell-badge warn">{props.badge}</span>}
        <Switch
          checked={props.checked}
          disabled={props.disabled}
          label={props.title}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}

/**
 * The four switches plus the "model will see" summary.
 *
 * The parent owns the values. `resolveOptions` is the single source of the
 * gated/effective decision, so the switch a reviewer sees here and the host's
 * later decision cannot drift.
 */
export function ShellOptionsSection({ value, masters, linked, disabled = false, onChange }: ShellOptionsProps) {
  const locale: 'zh' | 'en' = 'zh'
  const options = resolveOptions(value, masters)
  const option = (key: (typeof OPTION_KEYS)[number]) => options.find((entry) => entry.key === key)!
  const surface = resolvePwshSurface({ hidePwsh: value.hidePwsh, linkedInstalled: linked.state === 'installed' })
  const hidePwshHint = linked.state !== 'installed'
    ? label(locale, 'hidePwshMissing')
    : value.hidePwsh ? label(locale, 'hidePwshAdded') : label(locale, 'hidePwshOverride')
  const chips = visibleTools(value, masters, { linkedInstalled: linked.state === 'installed' })

  return (
    <section className="ops-shell-section">
      <div className="ops-shell-rows">
        <Row
          title={label(locale, 'publishBashTool')}
          hint={label(locale, 'publishBashToolHint')}
          checked={option('publishBashTool').checked}
          disabled={disabled}
          onChange={(checked) => onChange({ publishBashTool: checked })}
        />
        <Row
          title={label(locale, 'hidePwsh')}
          hint={hidePwshHint}
          checked={option('hidePwsh').checked}
          disabled={disabled}
          onChange={(checked) => onChange({ hidePwsh: checked })}
        />
        <Row
          title={label(locale, 'hideOfficialTools')}
          hint={label(locale, 'hideOfficialToolsHint')}
          checked={option('hideOfficialTools').checked}
          disabled={disabled || !option('hideOfficialTools').enabled}
          badge={option('hideOfficialTools').enabled ? undefined : label(locale, 'gated')}
          onChange={(checked) => onChange({ hideOfficialTools: checked })}
        />
        <Row
          title={label(locale, 'discoveryEnabled')}
          hint={label(locale, 'discoveryEnabledHint')}
          checked={option('discoveryEnabled').checked}
          disabled={disabled || !option('discoveryEnabled').enabled}
          badge={option('discoveryEnabled').enabled ? undefined : label(locale, 'gated')}
          onChange={(checked) => onChange({ discoveryEnabled: checked })}
        />
      </div>

      <div className="ops-shell-summary">
        <span>{label(locale, 'summary')}</span>
        <div className="ops-shell-chips">
          {chips.map((chip) => <span className="ops-shell-chip" key={chip}>{chip}</span>)}
        </div>
      </div>
      {surface.mode === 'official' && <p className="ops-shell-warn">模型将看到原版 Windows PowerShell 5.1。</p>}
    </section>
  )
}

/** The dsh-win-pwsh7 status/install block, separated so the status is the only card. */
export function LinkedShellCard({ linked, hidePwsh, busy = false, message, onInstall, onRecheck }: LinkedShellProps) {
  const locale: 'zh' | 'en' = 'zh'
  const installed = linked.state === 'installed'
  const surface = resolvePwshSurface({ hidePwsh, linkedInstalled: installed })
  const why = surface.mode === 'added'
    ? '隐藏 pwsh 已开启：隐藏官方 pwsh，由联动插件新增 pwsh7。'
    : surface.mode === 'override'
      ? '隐藏 pwsh 已关闭：保留官方 pwsh 入口，执行器覆盖为 pwsh7。'
      : surface.mode === 'hidden'
        ? '隐藏 pwsh 已开启，但未安装联动插件：模型看不到 PowerShell 工具。'
        : '隐藏 pwsh 已关闭且未安装联动插件：官方 Windows PowerShell 5.1 会暴露给模型。'

  return (
    <section className="ops-shell-linked">
      <div className="ops-shell-linked-head">
        <strong>{installed ? 'dsh-win-pwsh7' : label(locale, 'linkedTitle')}</strong>
        <span className={'ops-shell-badge' + (installed ? ' ok' : '')}>{label(locale, installed ? 'installed' : 'missing')}</span>
      </div>
      {installed ? (
        <>
          <dl className="ops-shell-facts">
            <div><dt>{label(locale, 'version')}</dt><dd>{linked.version}</dd></div>
            <div><dt>{label(locale, 'powerShell')}</dt><dd><code>{linked.pwshVersion}</code></dd></div>
            <div><dt>{label(locale, 'path')}</dt><dd><code>{linked.path}</code></dd></div>
            <div><dt>{label(locale, 'status')}</dt><dd>{label(locale, 'enabled')}</dd></div>
          </dl>
          <p className="ops-shell-callout">{why}</p>
          <div className="ops-shell-actions">
            <button type="button" className="ops-shell-button" disabled={busy} onClick={onRecheck}>{label(locale, 'recheck')}</button>
          </div>
        </>
      ) : (
        <>
          <p className="ops-shell-hint">{label(locale, 'linkedHint')}</p>
          <div className="ops-shell-actions">
            <button type="button" className="ops-shell-button primary" disabled={busy} onClick={onInstall}>{label(locale, 'install')}</button>
          </div>
        </>
      )}
      {message && <p className="ops-shell-hint" role="status">{message}</p>}
    </section>
  )
}

/** Append to `src/client/styles.ts` next to `SETTINGS_CSS`. */
export const SHELL_CSS = `
.ops-shell-section{display:flex;flex-direction:column;gap:16px;min-width:0;}
.ops-shell-rows{display:flex;flex-direction:column;min-width:0;}
.ops-shell-row{display:flex;align-items:flex-start;gap:20px;padding:14px 0;border-top:1px solid var(--dsw-alias-border-l2);min-width:0;}
.ops-shell-row:first-child{border-top:0;}
.ops-shell-row-text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px;}
.ops-shell-row-title{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:1.5;}
.ops-shell-row-hint{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:1.5;}
.ops-shell-row-side{flex:none;display:flex;align-items:center;gap:10px;}
.ops-shell-badge{padding:1px 7px;border:1px solid var(--dsw-alias-border-l3);border-radius:999px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:nowrap;}
.ops-shell-badge.warn{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 40%,transparent);}
.ops-shell-badge.ok{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,transparent);}
.ops-shell-summary{display:flex;align-items:baseline;gap:10px;padding:12px 14px;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-interactive-bg-hover);font-size:12px;color:var(--dsw-alias-label-secondary);}
.ops-shell-summary>span{flex:none;color:var(--dsw-alias-label-tertiary);}
.ops-shell-chips{display:flex;flex-wrap:wrap;gap:6px;min-width:0;}
.ops-shell-chip{padding:1px 7px;border:1px solid var(--dsw-alias-border-l3);border-radius:6px;font-family:var(--dsw-font-mono,monospace);font-size:11px;line-height:18px;}
.ops-shell-warn{margin:0;color:var(--dsw-alias-state-warn-primary);font-size:12px;}
.ops-shell-linked{display:flex;flex-direction:column;gap:12px;padding:14px;border:1px solid var(--dsw-alias-border-l3);border-radius:10px;min-width:0;}
.ops-shell-linked-head{display:flex;align-items:center;gap:10px;}
.ops-shell-linked-head .ops-shell-badge{margin-left:auto;}
.ops-shell-facts{display:grid;gap:6px;margin:0;padding:12px;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-interactive-bg-hover);font-size:12px;}
.ops-shell-facts>div{display:grid;grid-template-columns:76px minmax(0,1fr);gap:10px;}
.ops-shell-facts dt{color:var(--dsw-alias-label-tertiary);}
.ops-shell-facts dd{margin:0;overflow-wrap:anywhere;}
.ops-shell-callout{margin:0;padding:10px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm);font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary);}
.ops-shell-actions{display:flex;flex-wrap:wrap;gap:10px;}
.ops-shell-button{height:32px;padding:0 14px;border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;cursor:pointer;}
.ops-shell-button.primary{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-base);border-color:transparent;}
.ops-shell-button:disabled{opacity:.4;cursor:not-allowed;}
`
