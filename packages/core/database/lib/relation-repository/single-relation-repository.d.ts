import { SingleAssociationAccessors, Transactionable } from 'sequelize';
import { Model } from '../model';
import { Appends, Except, Fields, Filter, TargetKey, UpdateOptions } from '../repository';
import { RelationRepository } from './relation-repository';
export interface SingleRelationFindOption extends Transactionable {
    fields?: Fields;
    except?: Except;
    appends?: Appends;
    filter?: Filter;
}
interface SetOption extends Transactionable {
    tk?: TargetKey;
}
export declare abstract class SingleRelationRepository extends RelationRepository {
    remove(options?: Transactionable): Promise<void>;
    set(options: TargetKey | SetOption): Promise<void>;
    find(options?: SingleRelationFindOption): Promise<Model<any>>;
    findOne(options?: SingleRelationFindOption): Promise<Model<any>>;
    destroy(options?: Transactionable): Promise<Boolean>;
    update(options: UpdateOptions): Promise<any>;
    accessors(): SingleAssociationAccessors;
}
export {};
