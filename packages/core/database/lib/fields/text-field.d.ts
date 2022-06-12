import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class TextField extends Field {
    get dataType(): DataTypes.TextDataTypeConstructor;
}
export interface TextFieldOptions extends BaseColumnFieldOptions {
    type: 'text';
}
