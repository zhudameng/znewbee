import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class IntegerField extends Field {
    get dataType(): DataTypes.IntegerDataTypeConstructor;
}
export interface IntegerFieldOptions extends BaseColumnFieldOptions {
    type: 'integer';
}
export declare class FloatField extends Field {
    get dataType(): DataTypes.FloatDataTypeConstructor;
}
export interface FloatFieldOptions extends BaseColumnFieldOptions {
    type: 'float';
}
export declare class DoubleField extends Field {
    get dataType(): DataTypes.DoubleDataTypeConstructor;
}
export interface DoubleFieldOptions extends BaseColumnFieldOptions {
    type: 'double';
}
export declare class RealField extends Field {
    get dataType(): DataTypes.RealDataTypeConstructor;
}
export interface RealFieldOptions extends BaseColumnFieldOptions {
    type: 'real';
}
export declare class DecimalField extends Field {
    get dataType(): DataTypes.DecimalDataTypeConstructor;
}
export interface DecimalFieldOptions extends BaseColumnFieldOptions {
    type: 'decimal';
}
