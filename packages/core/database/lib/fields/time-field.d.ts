import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class TimeField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
}
export interface TimeFieldOptions extends BaseColumnFieldOptions {
    type: 'time';
}
