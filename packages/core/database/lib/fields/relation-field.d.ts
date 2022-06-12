import { BaseFieldOptions, Field } from './field';
export interface BaseRelationFieldOptions extends BaseFieldOptions {
}
export interface MultipleRelationFieldOptions extends BaseRelationFieldOptions {
    sortBy?: string | string[];
}
export declare abstract class RelationField extends Field {
    /**
     * target relation name
     */
    get target(): any;
    get foreignKey(): any;
    get sourceKey(): any;
    get targetKey(): any;
    /**
     * get target model from database by it's name
     * @constructor
     */
    get TargetModel(): import("sequelize/types").ModelCtor<import("sequelize/types").Model<any, any>>;
}
