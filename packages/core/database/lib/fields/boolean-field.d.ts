import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class BooleanField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
}
export interface BooleanFieldOptions extends BaseColumnFieldOptions {
    type: 'boolean';
}
