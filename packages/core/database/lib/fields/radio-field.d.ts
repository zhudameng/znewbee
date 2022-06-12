import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export interface RadioFieldOptions extends BaseColumnFieldOptions {
    type: 'radio';
}
/**
 * 暂时只支持全局，不支持批量
 */
export declare class RadioField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
    init(): void;
    bind(): void;
    unbind(): void;
}
