import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class VirtualField extends Field {
    get dataType(): DataTypes.VirtualDataTypeConstructor;
}
export interface VirtualFieldOptions extends BaseColumnFieldOptions {
    type: 'virtual';
}
