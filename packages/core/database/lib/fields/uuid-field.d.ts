import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field, FieldContext } from './field';
export declare class UuidField extends Field {
    constructor(options?: any, context?: FieldContext);
    get dataType(): DataTypes.AbstractDataTypeConstructor;
}
export interface UUIDFieldOptions extends BaseColumnFieldOptions {
    type: 'uuid';
}
