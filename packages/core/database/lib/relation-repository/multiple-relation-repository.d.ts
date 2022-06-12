import { MultiAssociationAccessors, Transaction, Transactionable } from 'sequelize';
import { CommonFindOptions, CountOptions, DestroyOptions, Filter, FilterByTk, FindOptions, TargetKey, TK, UpdateOptions } from '../repository';
import { RelationRepository } from './relation-repository';
export interface FindAndCountOptions extends CommonFindOptions {
}
export interface FindOneOptions extends CommonFindOptions, FilterByTk {
}
export interface AssociatedOptions extends Transactionable {
    tk?: TK;
}
export declare abstract class MultipleRelationRepository extends RelationRepository {
    extendFindOptions(findOptions: any): any;
    find(options?: FindOptions): Promise<any>;
    findAndCount(options?: FindAndCountOptions): Promise<[any[], number]>;
    count(options?: CountOptions): Promise<number>;
    findOne(options?: FindOneOptions): Promise<any>;
    remove(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    update(options?: UpdateOptions): Promise<any>;
    destroy(options?: TK | DestroyOptions): Promise<Boolean>;
    protected destroyByFilter(filter: Filter, transaction?: Transaction): Promise<Boolean>;
    protected filterHasInclude(filter: Filter, options?: any): boolean;
    protected accessors(): MultiAssociationAccessors;
}
