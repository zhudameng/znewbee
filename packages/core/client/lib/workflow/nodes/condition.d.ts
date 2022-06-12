/// <reference types="react" />
declare function CalculationConfig({ value, onChange }: {
    value: any;
    onChange: any;
}): JSX.Element;
declare const _default: {
    title: string;
    type: string;
    group: string;
    fieldset: {
        'config.rejectOnFalse': {
            type: string;
            name: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                disabled: boolean;
            };
            enum: {
                value: boolean;
                label: string;
            }[];
        };
        'config.calculation': {
            type: string;
            name: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
        };
    };
    view: {};
    options: {
        label: string;
        key: string;
        value: {
            rejectOnFalse: boolean;
        };
    }[];
    render(data: any): JSX.Element;
    components: {
        CalculationConfig: typeof CalculationConfig;
    };
};
export default _default;
