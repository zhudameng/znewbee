import { Database } from '@znewbee/database';
export declare type HookType = 'onSelfDestroy' | 'onCollectionDestroy' | 'onCollectionFieldDestroy' | 'onAnyCollectionFieldDestroy' | 'onSelfCreate' | 'onSelfMove';
export declare class ServerHooks {
    protected db: Database;
    hooks: Map<HookType, Map<string, any>>;
    constructor(db: Database);
    registerHooks(): void;
    listen(): void;
    protected callSchemaInstanceHooksByType(schemaInstance: any, options: any, type: HookType): Promise<void>;
    protected onUiSchemaMove(schemaInstance: any, options: any): Promise<void>;
    protected onCollectionDestroy(collectionModel: any, options: any): Promise<void>;
    protected onAnyCollectionFieldDestroy(fieldModel: any, options: any): Promise<void>;
    protected onCollectionFieldDestroy(fieldModel: any, options: any): Promise<void>;
    protected onUiSchemaCreate(schemaInstance: any, options: any): Promise<void>;
    protected findHooksAndCall(hooksFilter: any, hooksArgs: any, transaction: any): Promise<void>;
    /**
     * register a server hook function
     * @param type type of server hook
     * @param name name of server hook
     * @param hookFunc server hook function
     */
    register(type: HookType, name: string, hookFunc: any): void;
}
