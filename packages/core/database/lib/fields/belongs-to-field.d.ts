import { BelongsToOptions as SequelizeBelongsToOptions } from 'sequelize';
import { BaseRelationFieldOptions, RelationField } from './relation-field';
export declare class BelongsToField extends RelationField {
    static type: string;
    get target(): any;
    bind(): boolean;
    unbind(): void;
}
export interface BelongsToFieldOptions extends BaseRelationFieldOptions, SequelizeBelongsToOptions {
    type: 'belongsTo';
    target?: string;
}
