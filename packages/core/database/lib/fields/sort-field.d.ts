import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare class SortField extends Field {
    get dataType(): DataTypes.IntegerDataTypeConstructor;
    setSortValue(instance: any, options: any): Promise<void>;
    onScopeChange(instance: any, options: any): Promise<void>;
    initRecordsSortValue({ transaction }: {
        transaction: any;
    }): Promise<void>;
    bind(): void;
    unbind(): void;
}
export interface SortFieldOptions extends BaseColumnFieldOptions {
    type: 'sort';
    scopeKey?: string;
}
