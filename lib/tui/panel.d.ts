import type { AttentionStore, AttentionSnapshot } from './attention.js';
import type { ActivitySnapshot, ActivityStore } from './activity.js';
export type ActivityFilter = typeof ACTIVITY_FILTERS[number];
export interface ActivityViewOptions {
    filter?: ActivityFilter;
    page?: number;
    alert?: AttentionSnapshot;
}
export interface ActivityView {
    filter: ActivityFilter;
    page: number;
    pageCount: number;
    rowCount: number;
    lines: string[];
}
export interface PanelKeyEvent {
    input: string;
    key: {
        ctrl?: boolean;
        meta?: boolean;
        shift?: boolean;
        pageDown?: boolean;
        pageUp?: boolean;
    };
    preventDefault(): void;
}
export interface PanelHost {
    readonly focused: boolean;
    snapshot(): {
        sessionId?: string;
        lang?: string;
    };
    onKey(listener: (event: PanelKeyEvent) => void): () => void;
}
/** The optional host supplies React and UI components; importing this module loads neither. */
export interface PanelReact<Node, Component> {
    useSyncExternalStore<T>(subscribe: (listener: () => void) => () => void, snapshot: () => T): T;
    useState<T>(initial: T): [T, (value: T) => void];
    useEffect(effect: () => void | (() => void), dependencies: readonly unknown[]): void;
    createElement(component: Component, props: Record<string, unknown>, ...children: (Node | string)[]): Node;
}
export interface OpsPanelProps<Node = unknown, Component = unknown> {
    React: PanelReact<Node, Component>;
    ui: {
        Box: Component;
        Text: Component;
    };
    host: PanelHost;
    width: number;
    height: number;
}
export declare const ACTIVITY_FILTERS: readonly ["all", "running", "anomalies"];
/** Local pages of bounded retained metadata, never result pages or session-history reads. */
export declare function activityView(snapshot: ActivitySnapshot, lang?: string, height?: number, options?: ActivityViewOptions): ActivityView;
export declare function activityLines(snapshot: ActivitySnapshot, lang?: string, height?: number): string[];
export declare function createOpsPanel(store: ActivityStore, attention: AttentionStore): <Node, Component>({ React, ui, host, width, height }: OpsPanelProps<Node, Component>) => Node;
