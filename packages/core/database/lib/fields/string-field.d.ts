import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class StringField extends Field {
    get dataType(): DataTypes.StringDataTypeConstructor;
}
export interface StringFieldOptions extends BaseColumnFieldOptions {
    type: 'string';
}
