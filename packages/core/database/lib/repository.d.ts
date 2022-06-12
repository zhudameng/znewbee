import { Association, BulkCreateOptions, CreateOptions as SequelizeCreateOptions, DestroyOptions as SequelizeDestroyOptions, FindAndCountOptions as SequelizeAndCountOptions, FindOptions as SequelizeFindOptions, ModelCtor, Transactionable, UpdateOptions as SequelizeUpdateOptions } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
import { Model } from './model';
import { BelongsToManyRepository } from './relation-repository/belongs-to-many-repository';
import { BelongsToRepository } from './relation-repository/belongs-to-repository';
import { HasManyRepository } from './relation-repository/hasmany-repository';
import { HasOneRepository } from './relation-repository/hasone-repository';
import { RelationRepository } from './relation-repository/relation-repository';
export interface IRepository {
}
interface CreateManyOptions extends BulkCreateOptions {
    records: Values[];
}
export { Transactionable } from 'sequelize';
export interface FilterAble {
    filter: Filter;
}
export declare type TargetKey = string | number;
export declare type TK = TargetKey | TargetKey[];
export declare type Filter = any;
export declare type Appends = string[];
export declare type Except = string[];
export declare type Fields = string[];
export declare type Sort = string[] | string;
export declare type WhiteList = string[];
export declare type BlackList = string[];
export declare type AssociationKeysToBeUpdate = string[];
export declare type Values = any;
export interface CountOptions extends Omit<SequelizeCreateOptions, 'distinct' | 'where' | 'include'>, Transactionable {
    fields?: Fields;
    filter?: Filter;
}
export interface FilterByTk {
    filterByTk?: TargetKey;
}
export interface FindOptions extends SequelizeFindOptions, CommonFindOptions, FilterByTk {
}
export interface CommonFindOptions extends Transactionable {
    filter?: Filter;
    fields?: Fields;
    appends?: Appends;
    except?: Except;
    sort?: Sort;
    context?: any;
}
interface FindOneOptions extends FindOptions, CommonFindOptions {
}
export interface DestroyOptions extends SequelizeDestroyOptions {
    filter?: Filter;
    filterByTk?: TargetKey | TargetKey[];
    truncate?: boolean;
    context?: any;
}
interface FindAndCountOptions extends Omit<SequelizeAndCountOptions, 'where' | 'include' | 'order'> {
    filter?: Filter;
    fields?: Fields;
    except?: Except;
    appends?: Appends;
    sort?: Sort;
}
export interface CreateOptions extends SequelizeCreateOptions {
    values?: Values;
    whitelist?: WhiteList;
    blacklist?: BlackList;
    updateAssociationValues?: AssociationKeysToBeUpdate;
    context?: any;
}
export interface UpdateOptions extends Omit<SequelizeUpdateOptions, 'where'> {
    values: Values;
    filter?: Filter;
    filterByTk?: TargetKey;
    whitelist?: WhiteList;
    blacklist?: BlackList;
    updateAssociationValues?: AssociationKeysToBeUpdate;
    context?: any;
}
declare class RelationRepositoryBuilder<R extends RelationRepository> {
    collection: Collection;
    associationName: string;
    association: Association;
    builderMap: {
        HasOne: typeof HasOneRepository;
        BelongsTo: typeof BelongsToRepository;
        BelongsToMany: typeof BelongsToManyRepository;
        HasMany: typeof HasManyRepository;
    };
    constructor(collection: Collection, associationName: string);
    protected builder(): {
        HasOne: typeof HasOneRepository;
        BelongsTo: typeof BelongsToRepository;
        BelongsToMany: typeof BelongsToManyRepository;
        HasMany: typeof HasManyRepository;
    };
    of(id: string | number): R;
}
export declare class Repository<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> implements IRepository {
    database: Database;
    collection: Collection;
    model: ModelCtor<Model>;
    constructor(collection: Collection);
    /**
     * return count by filter
     */
    count(countOptions?: CountOptions): Promise<number>;
    /**
     * find
     * @param options
     */
    find(options?: FindOptions): Promise<Model<any, any>[]>;
    /**
     * find and count
     * @param options
     */
    findAndCount(options?: FindAndCountOptions): Promise<[Model[], number]>;
    /**
     * Find By Id
     *
     */
    findById(id: string | number): Promise<Model<any, any>>;
    /**
     * Find one record from database
     *
     * @param options
     */
    findOne(options?: FindOneOptions): Promise<Model<any, any>>;
    /**
     * Save instance to database
     *
     * @param values
     * @param options
     */
    create<M extends Model>(options: CreateOptions): Promise<M>;
    /**
     * Save Many instances to database
     *
     * @param records
     * @param options
     */
    createMany(options: CreateManyOptions): Promise<any[]>;
    /**
     * Update model value
     *
     * @param values
     * @param options
     */
    update(options: UpdateOptions): Promise<Model<any, any>[]>;
    destroy(options?: TargetKey | TargetKey[] | DestroyOptions): any;
    /**
     * @param association target association
     */
    relation<R extends RelationRepository>(association: string): RelationRepositoryBuilder<R>;
    protected buildQueryOptions(options: any): any;
    protected parseFilter(filter: Filter, options?: any): {
        where?: undefined;
        include?: undefined;
    } | {
        where: {};
        include: any[];
    };
    protected getTransaction(options: any, autoGen?: boolean): Promise<any>;
}
