import { DataType, ModelAttributeColumnOptions, ModelIndexesOptions, SyncOptions } from 'sequelize';
import { Collection } from '../collection';
import { Database } from '../database';
export interface FieldContext {
    database: Database;
    collection: Collection;
}
export interface BaseFieldOptions {
    name?: string;
    hidden?: boolean;
    [key: string]: any;
}
export interface BaseColumnFieldOptions extends BaseFieldOptions, Omit<ModelAttributeColumnOptions, 'type'> {
    dataType?: DataType;
    index?: boolean | ModelIndexesOptions;
}
export declare abstract class Field {
    options: any;
    context: FieldContext;
    database: Database;
    collection: Collection;
    [key: string]: any;
    get name(): any;
    get type(): any;
    get dataType(): any;
    constructor(options?: any, context?: FieldContext);
    sync(syncOptions: SyncOptions): Promise<void>;
    init(): void;
    on(eventName: string, listener: (...args: any[]) => void): this;
    off(eventName: string, listener: (...args: any[]) => void): this;
    get(name: string): any;
    merge(obj: any): void;
    bind(): void;
    unbind(): void;
    toSequelize(): any;
    isSqlite(): boolean;
}
