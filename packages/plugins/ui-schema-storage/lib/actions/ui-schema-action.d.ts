import { Context } from '@znewbee/actions';
export declare const uiSchemaActions: {
    getJsonSchema: (ctx: any, next: any) => Promise<void>;
    getProperties: (ctx: any, next: any) => Promise<void>;
    insert: (ctx: any, next: any) => Promise<void>;
    insertNewSchema: (ctx: any, next: any) => Promise<void>;
    remove: (ctx: any, next: any) => Promise<void>;
    patch: (ctx: any, next: any) => Promise<void>;
    clearAncestor: (ctx: any, next: any) => Promise<void>;
    insertAdjacent(ctx: Context, next: any): Promise<void>;
    insertBeforeBegin: (ctx: Context, next: any) => Promise<void>;
    insertAfterBegin: (ctx: Context, next: any) => Promise<void>;
    insertBeforeEnd: (ctx: Context, next: any) => Promise<void>;
    insertAfterEnd: (ctx: Context, next: any) => Promise<void>;
    saveAsTemplate(ctx: Context, next: any): Promise<void>;
};
