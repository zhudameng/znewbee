/// <reference types="node" />
import { AsyncEmitter } from '@znewbee/utils';
import merge from 'deepmerge';
import { EventEmitter } from 'events';
import { ModelCtor, Options, QueryInterfaceDropAllTablesOptions, QueryOptions, Sequelize, SyncOptions } from 'sequelize';
import { Collection, CollectionOptions, RepositoryType } from './collection';
import { ImportFileExtension } from './collection-importer';
import * as FieldTypes from './fields';
import { Field, FieldContext, RelationField } from './fields';
import { Model } from './model';
import { ModelHook } from './model-hook';
import { RelationRepository } from './relation-repository/relation-repository';
import { Repository } from './repository';
export interface MergeOptions extends merge.Options {
}
export interface PendingOptions {
    field: RelationField;
    model: ModelCtor<Model>;
}
interface MapOf<T> {
    [key: string]: T;
}
export interface IDatabaseOptions extends Options {
    tablePrefix?: string;
}
export declare type DatabaseOptions = IDatabaseOptions | Sequelize;
interface RegisterOperatorsContext {
    db?: Database;
    path?: string;
    field?: Field;
    app?: any;
}
export interface CleanOptions extends QueryInterfaceDropAllTablesOptions {
    drop?: boolean;
}
declare type OperatorFunc = (value: any, ctx?: RegisterOperatorsContext) => any;
export declare class Database extends EventEmitter implements AsyncEmitter {
    sequelize: Sequelize;
    fieldTypes: Map<any, any>;
    options: IDatabaseOptions;
    models: Map<string, ModelCtor<Model<any, any>>>;
    repositories: Map<string, typeof Repository>;
    operators: Map<any, any>;
    collections: Map<string, Collection<any, any>>;
    pendingFields: Map<string, FieldTypes.RelationField[]>;
    modelCollection: Map<ModelCtor<any>, Collection<any, any>>;
    modelHook: ModelHook;
    delayCollectionExtend: Map<string, {
        collectionOptions: CollectionOptions;
        mergeOptions?: any;
    }[]>;
    constructor(options: DatabaseOptions);
    /**
     * Add collection to database
     * @param options
     */
    collection<Attributes = any, CreateAttributes = Attributes>(options: CollectionOptions): Collection<Attributes, CreateAttributes>;
    getTablePrefix(): string;
    /**
     * get exists collection by its name
     * @param name
     */
    getCollection(name: string): Collection;
    hasCollection(name: string): boolean;
    removeCollection(name: string): void;
    getModel<M extends Model>(name: string): ModelCtor<M>;
    getRepository<R extends Repository>(name: string): R;
    getRepository<R extends RelationRepository>(name: string, relationId: string | number): R;
    addPendingField(field: RelationField): void;
    removePendingField(field: RelationField): void;
    registerFieldTypes(fieldTypes: MapOf<typeof Field>): void;
    registerModels(models: MapOf<ModelCtor<any>>): void;
    registerRepositories(repositories: MapOf<RepositoryType>): void;
    initOperators(): void;
    registerOperators(operators: MapOf<OperatorFunc>): void;
    buildField(options: any, context: FieldContext): any;
    sync(options?: SyncOptions): Promise<Sequelize>;
    clean(options: CleanOptions): Promise<void>;
    isSqliteMemory(): boolean;
    auth(options?: QueryOptions & {
        repeat?: number;
    }): Promise<any>;
    reconnect(): Promise<void>;
    closed(): any;
    close(): Promise<void>;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    import(options: {
        directory: string;
        extensions?: ImportFileExtension[];
    }): Promise<Map<string, Collection>>;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
}
export declare function extend(collectionOptions: CollectionOptions, mergeOptions?: MergeOptions): {
    collectionOptions: CollectionOptions;
    mergeOptions: MergeOptions;
    extend: boolean;
};
export declare const defineCollection: (collectionOptions: CollectionOptions) => CollectionOptions;
export declare const extendCollection: (collectionOptions: CollectionOptions, mergeOptions?: MergeOptions) => {
    collectionOptions: CollectionOptions;
    mergeOptions: MergeOptions;
    extend: boolean;
};
export default Database;
