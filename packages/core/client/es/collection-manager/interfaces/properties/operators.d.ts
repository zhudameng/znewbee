export declare const string: ({
    label: string;
    value: string;
    selected: boolean;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
export declare const array: ({
    label: string;
    value: string;
    selected: boolean;
    schema: {
        'x-component': string;
        'x-component-props': {
            mode: string;
        };
    };
    noValue?: undefined;
} | {
    label: string;
    value: string;
    schema: {
        'x-component': string;
        'x-component-props': {
            mode: string;
        };
    };
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
    schema?: undefined;
})[];
export declare const datetime: ({
    label: string;
    value: string;
    selected: boolean;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
export declare const number: ({
    label: string;
    value: string;
    selected: boolean;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
export declare const id: ({
    label: string;
    value: string;
    selected: boolean;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    visible(field: any): boolean;
    selected?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
export declare const enumType: ({
    label: string;
    value: string;
    selected: boolean;
    schema: {
        'x-component': string;
        'x-component-props'?: undefined;
    };
    noValue?: undefined;
} | {
    label: string;
    value: string;
    schema: {
        'x-component': string;
        'x-component-props'?: undefined;
    };
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    schema: {
        'x-component': string;
        'x-component-props': {
            mode: string;
        };
    };
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
    schema?: undefined;
})[];
export declare const time: ({
    label: string;
    value: string;
    selected: boolean;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    selected?: undefined;
    noValue?: undefined;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
export declare const boolean: ({
    label: string;
    value: string;
    selected: boolean;
    noValue: boolean;
} | {
    label: string;
    value: string;
    noValue: boolean;
    selected?: undefined;
})[];
