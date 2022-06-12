import { BelongsToManyOptions as SequelizeBelongsToManyOptions } from 'sequelize';
import { MultipleRelationFieldOptions, RelationField } from './relation-field';
export declare class BelongsToManyField extends RelationField {
    get through(): any;
    bind(): boolean;
    unbind(): void;
}
export interface BelongsToManyFieldOptions extends MultipleRelationFieldOptions, Omit<SequelizeBelongsToManyOptions, 'through'> {
    type: 'belongsToMany';
    through?: string;
}
