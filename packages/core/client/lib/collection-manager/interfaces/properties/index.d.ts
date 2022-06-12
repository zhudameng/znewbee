import { ISchema } from '@formily/react';
export * as operators from './operators';
export declare const type: ISchema;
export declare const dateTimeProps: {
    [key: string]: ISchema;
};
export declare const dataSource: ISchema;
export declare const defaultProps: {
    'uiSchema.title': {
        type: string;
        title: string;
        required: boolean;
        'x-decorator': string;
        'x-component': string;
    };
    name: {
        type: string;
        title: string;
        required: boolean;
        'x-disabled': string;
        'x-decorator': string;
        'x-component': string;
        description: string;
    };
    type: import("@formily/react").Stringify<{
        [key: symbol]: any;
        [key: `x-${string}`]: any;
        [key: `x-${number}`]: any;
        version?: string;
        name?: import("@formily/react").SchemaKey;
        title?: any;
        description?: any;
        default?: any;
        readOnly?: boolean;
        writeOnly?: boolean;
        type?: import("@formily/react").SchemaTypes;
        enum?: import("@formily/react").SchemaEnum<any>;
        const?: any;
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;
        maxLength?: number;
        minLength?: number;
        pattern?: string | RegExp;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        required?: string | boolean | string[];
        format?: string;
        $ref?: string;
        $namespace?: string;
        definitions?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        properties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        items?: import("@formily/react").SchemaItems<any, any, any, any, any, any, any, any>;
        additionalItems?: import("@formily/react").Stringify<any>;
        patternProperties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        additionalProperties?: import("@formily/react").Stringify<any>;
        "x-value"?: any;
        "x-index"?: number;
        "x-pattern"?: any;
        "x-display"?: any;
        "x-validator"?: any;
        "x-decorator"?: any;
        "x-decorator-props"?: any;
        "x-component"?: any;
        "x-component-props"?: any;
        "x-reactions"?: import("@formily/react").SchemaReactions<any>;
        "x-content"?: any;
        "x-data"?: any;
        "x-visible"?: boolean;
        "x-hidden"?: boolean;
        "x-disabled"?: boolean;
        "x-editable"?: boolean;
        "x-read-only"?: boolean;
        "x-read-pretty"?: boolean;
    }>;
};
export declare const recordPickerSelector: ISchema;
export declare const recordPickerViewer: {
    type: string;
    title: string;
    'x-component': string;
    'x-component-props': {
        className: string;
    };
    properties: {
        tabs: {
            type: string;
            'x-component': string;
            'x-component-props': {};
            'x-initializer': string;
            properties: {
                tab1: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-designer': string;
                    'x-component-props': {};
                    properties: {
                        grid: {
                            type: string;
                            'x-component': string;
                            'x-initializer': string;
                            properties: {};
                        };
                    };
                };
            };
        };
    };
};
