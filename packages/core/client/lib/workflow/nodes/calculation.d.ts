/// <reference types="react" />
declare const _default: {
    title: string;
    type: string;
    group: string;
    fieldset: {
        'config.calculation': {
            type: string;
            title: string;
            name: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
    };
    view: {};
    components: {
        CalculationConfig({ value, onChange }: {
            value: any;
            onChange: any;
        }): JSX.Element;
    };
    getter(): JSX.Element;
};
export default _default;
