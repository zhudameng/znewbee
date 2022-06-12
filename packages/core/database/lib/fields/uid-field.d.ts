import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class UidField extends Field {
    get dataType(): DataTypes.StringDataTypeConstructor;
    init(): void;
}
export interface UidFieldOptions extends BaseColumnFieldOptions {
    type: 'uid';
    prefix?: string;
}
