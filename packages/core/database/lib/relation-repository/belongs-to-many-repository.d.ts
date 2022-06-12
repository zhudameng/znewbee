import { Transaction } from 'sequelize';
import { Model } from '../model';
import { CreateOptions, DestroyOptions, FindOptions, TargetKey, UpdateOptions } from '../repository';
import { FindAndCountOptions, FindOneOptions, MultipleRelationRepository } from './multiple-relation-repository';
import { AssociatedOptions, PrimaryKeyWithThroughValues } from './types';
declare type CreateBelongsToManyOptions = CreateOptions;
interface IBelongsToManyRepository<M extends Model> {
    find(options?: FindOptions): Promise<M[]>;
    findAndCount(options?: FindAndCountOptions): Promise<[M[], number]>;
    findOne(options?: FindOneOptions): Promise<M>;
    create(options?: CreateBelongsToManyOptions): Promise<M>;
    update(options?: UpdateOptions): Promise<M>;
    destroy(options?: number | string | number[] | string[] | DestroyOptions): Promise<Boolean>;
    set(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    add(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    remove(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    toggle(options: TargetKey | {
        pk?: TargetKey;
        transaction?: Transaction;
    }): Promise<void>;
}
export declare class BelongsToManyRepository extends MultipleRelationRepository implements IBelongsToManyRepository<any> {
    create(options?: CreateBelongsToManyOptions): Promise<any>;
    destroy(options?: TargetKey | TargetKey[] | DestroyOptions): Promise<Boolean>;
    protected setTargets(call: 'add' | 'set', options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
    add(options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
    set(options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
    toggle(options: TargetKey | {
        tk?: TargetKey;
        transaction?: Transaction;
    }): Promise<void>;
    extendFindOptions(findOptions: any): any;
    throughName(): any;
    throughModel(): any;
}
export {};
