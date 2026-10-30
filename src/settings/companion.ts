/** The installed version of the companion plugin, read from the profile's package tree. */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const NAME = 'dsh-win-pwsh7'
let cached: { at: number; value: string | undefined } | undefined

/**
 * The `node_modules` roots on the way up from a loaded module.
 *
 * The package is installed as `<profile>/node_modules/dsh-ops/lib/...`, so
 * walking up from its own module URL names the profile that holds the row. This
 * runs in the host process, where the launcher sets no `DSH_PROFILE_DIR` (it
 * passes that only to shell calls), so an environment-only lookup silently
 * answered "not installed" while the page showed the link as on.
 *
 * @param from - a module URL or a path inside the installed package.
 * @returns candidate `node_modules` directories, nearest first.
 */
function moduleRoots(from: string): string[] {
  let dir: string
  try { dir = from.startsWith('file:') ? path.dirname(fileURLToPath(from)) : path.dirname(from) } catch { return [] }
  const roots: string[] = []
  // Bounded: a package deeper than this is not a profile install, and the
  // environment and sweep roots still cover it.
  for (let depth = 0; depth < 8; depth += 1) {
    if (path.basename(dir) !== 'node_modules') roots.push(path.join(dir, 'node_modules'))
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return roots
}

/** Candidate node_modules roots: explicit environment, the loaded package, then this user's profiles. */
function roots(env: NodeJS.ProcessEnv, sweep: boolean, from: string | undefined): string[] {
  const list: string[] = []
  if (env.DSH_PROFILE_DIR !== undefined) list.push(path.join(env.DSH_PROFILE_DIR, 'node_modules'))
  if (env.DSH_PROFILE !== undefined) list.push(path.join(os.homedir(), '.dsh', 'profiles', env.DSH_PROFILE, 'node_modules'))
  if (from !== undefined) list.push(...moduleRoots(from))
  if (sweep) try {
    for (const entry of fs.readdirSync(path.join(os.homedir(), '.dsh', 'profiles'))) list.push(path.join(os.homedir(), '.dsh', 'profiles', entry, 'node_modules'))
  } catch { /* no profiles directory: nothing to read */ }
  return [...new Set(list)]
}

/**
 * The companion plugin's installed version, or undefined when it is not installed.
 * @param options - environment, clock, module origin and sweep, injectable for tests.
 * @returns the version string from the package manifest.
 */
export function companionVersion(options: { env?: NodeJS.ProcessEnv; now?: () => number; sweep?: boolean; from?: string } = {}): string | undefined {
  const env = options.env ?? process.env
  const now = options.now?.() ?? Date.now()
  if (cached !== undefined && now - cached.at < 60_000) return cached.value
  let value: string | undefined
  for (const root of roots(env, options.sweep !== false, options.from ?? import.meta.url)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(path.join(root, NAME, 'package.json'), 'utf8')) as { name?: string; version?: string }
      if (manifest.name === NAME && typeof manifest.version === 'string') { value = manifest.version; break }
    } catch { /* not installed in this root */ }
  }
  cached = { at: now, value }
  return value
}
