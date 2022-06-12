import { Model } from '../model';
import { CreateOptions, DestroyOptions, FindOptions, TargetKey, TK, UpdateOptions } from '../repository';
import { AssociatedOptions, FindAndCountOptions, FindOneOptions, MultipleRelationRepository } from './multiple-relation-repository';
interface IHasManyRepository<M extends Model> {
    find(options?: FindOptions): Promise<M>;
    findAndCount(options?: FindAndCountOptions): Promise<[M[], number]>;
    findOne(options?: FindOneOptions): Promise<M>;
    create(options?: CreateOptions): Promise<M>;
    update(options?: UpdateOptions): Promise<M>;
    destroy(options?: TK | DestroyOptions): Promise<Boolean>;
    set(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    add(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    remove(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
}
export declare class HasManyRepository extends MultipleRelationRepository implements IHasManyRepository<any> {
    find(options?: FindOptions): Promise<any>;
    destroy(options?: TK | DestroyOptions): Promise<Boolean>;
    handleKeyOfAdd(options: any): any;
    set(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    add(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    accessors(): import("sequelize").MultiAssociationAccessors;
}
export {};
