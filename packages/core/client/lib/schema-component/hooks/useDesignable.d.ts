import { ISchema, Schema } from '@formily/react';
import { APIClient } from '../../api-client';
interface CreateDesignableProps {
    current: Schema;
    api?: APIClient;
    refresh?: () => void;
    onSuccess?: any;
    i18n?: any;
    t?: any;
}
export declare function createDesignable(options: CreateDesignableProps): Designable;
/**
 *
 */
declare type Position = 'beforeBegin' | 'afterBegin' | 'beforeEnd' | 'afterEnd';
interface InsertAdjacentOptions {
    wrap?: (s: ISchema) => ISchema;
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: ISchema | BreakFn;
    onSuccess?: any;
}
declare type BreakFn = (s: ISchema) => boolean;
interface RemoveOptions {
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: ISchema | BreakFn;
}
interface RecursiveRemoveOptions {
    breakRemoveOn?: ISchema | BreakFn;
}
export declare const splitWrapSchema: (wrapped: Schema, schema: ISchema) => any[];
export declare class Designable {
    current: Schema;
    options: CreateDesignableProps;
    events: {};
    constructor(options: CreateDesignableProps);
    loadAPIClientEvents(): void;
    prepareProperty(schema: ISchema): void;
    on(name: 'insertAdjacent' | 'remove' | 'error' | 'patch', listener: any): void;
    emit(name: 'insertAdjacent' | 'remove' | 'error' | 'patch', ...args: any[]): void;
    parentsIn(schema: Schema): boolean;
    refresh(): void;
    insertAdjacent(position: Position, schema: ISchema, options?: InsertAdjacentOptions): void;
    recursiveRemoveIfNoChildren(schema?: Schema, options?: RecursiveRemoveOptions): Schema<any, any, any, any, any, any, any, any, any>;
    remove(schema?: Schema, options?: RemoveOptions): void;
    removeWithoutEmit(schema?: Schema, options?: RemoveOptions): Schema<any, any, any, any, any, any, any, any, any>;
    insertBeforeBeginOrAfterEnd(schema: ISchema, options?: InsertAdjacentOptions): void;
    /**
     * Before the current schema itself.
     */
    insertBeforeBegin(schema: ISchema, options?: InsertAdjacentOptions): void;
    /**
     * Just inside the current schema, before its first child.
     *
     * @param schema
     * @returns
     */
    insertAfterBegin(schema: ISchema, options?: InsertAdjacentOptions): void;
    /**
     * Just inside the targetElement, after its last child.
     *
     * @param schema
     * @returns
     */
    insertBeforeEnd(schema: ISchema, options?: InsertAdjacentOptions): void;
    /**
     * After the current schema itself.
     */
    insertAfterEnd(schema: ISchema, options?: InsertAdjacentOptions): void;
}
export declare function useDesignable(): {
    dn: Designable;
    designable: boolean;
    reset: () => void;
    refresh: () => void;
    setDesignable: (value: boolean) => void;
    DesignableBar: () => JSX.Element;
    findComponent(component: any): any;
    on: any;
    patch: (key: ISchema | string, value?: any) => void;
    remove(schema?: any, options?: RemoveOptions): void;
    insertAdjacent(position: Position, schema: ISchema, options?: InsertAdjacentOptions): void;
    insertBeforeBegin(schema: ISchema): void;
    insertAfterBegin(schema: ISchema): void;
    insertBeforeEnd(schema: ISchema): void;
    insertAfterEnd(schema: ISchema): void;
};
export {};
