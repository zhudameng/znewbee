import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export interface PasswordFieldOptions extends BaseColumnFieldOptions {
    type: 'password';
    /**
     * @default 64
     */
    length?: number;
    /**
     * @default 8
     */
    randomBytesSize?: number;
}
export declare class PasswordField extends Field {
    get dataType(): DataTypes.StringDataTypeConstructor;
    verify(password: string, hash: string): Promise<unknown>;
    hash(password: string): Promise<unknown>;
    init(): void;
    bind(): void;
    unbind(): void;
}
