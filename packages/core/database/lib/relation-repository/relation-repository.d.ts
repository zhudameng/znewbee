import { Association, ModelCtor, Transaction } from 'sequelize';
import { Collection } from '../collection';
import Database from '../database';
import { RelationField } from '../fields/relation-field';
import { Model } from '../model';
import { CreateOptions, Filter, FindOptions } from '../repository';
export declare const transaction: (transactionInjector?: any) => (target: any, name: any, descriptor: any) => any;
export declare abstract class RelationRepository {
    sourceCollection: Collection;
    association: Association;
    targetModel: ModelCtor<any>;
    targetCollection: Collection;
    associationName: string;
    associationField: RelationField;
    sourceKeyValue: string | number;
    sourceInstance: Model;
    db: Database;
    constructor(sourceCollection: Collection, association: string, sourceKeyValue: string | number);
    targetKey(): any;
    protected accessors(): import("sequelize").SingleAssociationAccessors | import("sequelize").MultiAssociationAccessors;
    create(options?: CreateOptions): Promise<any>;
    getSourceModel(transaction?: Transaction): Promise<Model<any, any>>;
    protected buildQueryOptions(options: FindOptions): any;
    protected parseFilter(filter: Filter, options?: any): {
        where?: undefined;
        include?: undefined;
    } | {
        where: {};
        include: any[];
    };
    protected getTransaction(options: any, autoGen?: boolean): Promise<Transaction | null>;
}
