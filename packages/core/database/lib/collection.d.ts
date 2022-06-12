/// <reference types="node" />
import { EventEmitter } from 'events';
import { ModelCtor, ModelOptions, SyncOptions } from 'sequelize';
import { Database } from './database';
import { Field, FieldOptions } from './fields';
import { Model } from './model';
import { Repository } from './repository';
export declare type RepositoryType = typeof Repository;
export declare type CollectionSortable = string | boolean | {
    name?: string;
    scopeKey?: string;
};
export interface CollectionOptions extends Omit<ModelOptions, 'name' | 'hooks'> {
    name: string;
    tableName?: string;
    filterTargetKey?: string;
    fields?: FieldOptions[];
    model?: string | ModelCtor<Model>;
    repository?: string | RepositoryType;
    sortable?: CollectionSortable;
    /**
     * @default true
     */
    autoGenId?: boolean;
    /**
     * @default 'options'
     */
    magicAttribute?: string;
    [key: string]: any;
}
export interface CollectionContext {
    database: Database;
}
export declare class Collection<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends EventEmitter {
    options: CollectionOptions;
    context: CollectionContext;
    isThrough?: boolean;
    fields: Map<string, any>;
    model: ModelCtor<Model>;
    repository: Repository<TModelAttributes, TCreationAttributes>;
    get filterTargetKey(): string;
    get name(): string;
    constructor(options: CollectionOptions, context?: CollectionContext);
    private sequelizeModelOptions;
    /**
     * TODO
     */
    modelInit(): void;
    setRepository(repository?: RepositoryType | string): void;
    private bindFieldEventListener;
    forEachField(callback: (field: Field) => void): void;
    findField(callback: (field: Field) => boolean): any;
    hasField(name: string): boolean;
    getField<F extends Field>(name: string): F;
    addField(name: string, options: FieldOptions): Field;
    setField(name: string, options: FieldOptions): Field;
    setFields(fields: FieldOptions[], resetFields?: boolean): void;
    resetFields(): void;
    removeField(name: any): boolean;
    /**
     * TODO
     */
    updateOptions(options: CollectionOptions, mergeOptions?: any): this;
    setSortable(sortable: any): void;
    /**
     * TODO
     *
     * @param name
     * @param options
     */
    updateField(name: string, options: FieldOptions): void;
    sync(syncOptions?: SyncOptions): Promise<void>;
}
