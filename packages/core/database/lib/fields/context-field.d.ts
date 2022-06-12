import { BaseColumnFieldOptions, Field } from './field';
export declare class ContextField extends Field {
    get dataType(): any;
    init(): void;
    bind(): void;
    unbind(): void;
}
export interface ContextFieldOptions extends BaseColumnFieldOptions {
    type: 'context';
    dataIndex: string;
    dataType?: string;
    createOnly?: boolean;
}
