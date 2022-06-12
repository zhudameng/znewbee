import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class JsonField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
}
export interface JsonFieldOptions extends BaseColumnFieldOptions {
    type: 'json';
}
export declare class JsonbField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
}
export interface JsonbFieldOptions extends BaseColumnFieldOptions {
    type: 'jsonb';
}
