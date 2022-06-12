export declare const collection: {
    type: string;
    title: string;
    name: string;
    required: boolean;
    'x-reactions': string[];
    'x-decorator': string;
    'x-component': string;
};
export declare const values: {
    type: string;
    title: string;
    name: string;
    'x-decorator': string;
    'x-decorator-props': {
        labelAlign: string;
        className: string;
    };
    'x-component': string;
    description: string;
};
export declare const filter: {
    type: string;
    title: string;
    name: string;
    'x-decorator': string;
    'x-decorator-props': {
        labelAlign: string;
        className: string;
    };
    'x-component': string;
    'x-component-props': {
        useProps(): {
            options: any[];
            className: string;
        };
        dynamicComponent: string;
    };
};
