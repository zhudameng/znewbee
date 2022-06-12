import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class DateField extends Field {
    get dataType(): DataTypes.DateDataTypeConstructor;
}
export interface DateFieldOptions extends BaseColumnFieldOptions {
    type: 'date';
}
