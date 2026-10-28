/**
 * The shipped panel viewer template, read from `panel.html` beside this module.
 *
 * The template lives in `lib/` on purpose: `files` publishes `lib`, so the viewer
 * is available from the installed package with no build step and `npm run verify`
 * never renders it. It is read once and cached, and a read failure is the
 * caller's to report — never a reason to stop writing the JSON, which is the only
 * data source.
 *
 * @module dsh-ops/panel/render
 */
/** The published viewer asset, resolved from this module rather than the cwd. */
export declare const PANEL_TEMPLATE_URL: URL;
/**
 * The viewer HTML: a static page that reads a JSON document and inlines none.
 * @returns {string} the template text.
 * @throws when the shipped asset cannot be read (packaging defect).
 */
export declare function renderPanelHtml(): string;
