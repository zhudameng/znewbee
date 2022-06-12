import { BaseColumnFieldOptions, Field } from './field';
import { DataTypes } from 'sequelize';
export declare class ArrayField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
    sortValue(model: any): void;
    bind(): void;
    unbind(): void;
}
export interface ArrayFieldOptions extends BaseColumnFieldOptions {
    type: 'array';
}
