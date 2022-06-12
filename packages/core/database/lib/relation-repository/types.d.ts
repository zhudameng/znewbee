import { TargetKey, Values } from '../repository';
import { Transactionable } from 'sequelize';
export declare type PrimaryKeyWithThroughValues = [TargetKey, Values];
export interface AssociatedOptions extends Transactionable {
    tk?: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[];
}
export declare type setAssociationOptions = TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions;
