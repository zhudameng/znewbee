import { useCollectionDataSource } from '../..';
import { VariableComponent } from '../calculators';
declare const _default: {
    title: string;
    type: string;
    group: string;
    fieldset: {
        'config.collection': {
            type: string;
            title: string;
            name: string;
            required: boolean;
            'x-reactions': string[];
            'x-decorator': string;
            'x-component': string;
        };
        'config.multiple': {
            type: string;
            title: string;
            name: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                disabled: boolean;
            };
        };
        'config.params': {
            type: string;
            name: string;
            title: string;
            'x-decorator': string;
            properties: {
                filter: {
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
            };
        };
    };
    view: {};
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        VariableComponent: typeof VariableComponent;
    };
    getter({ type, options, onChange }: {
        type: any;
        options: any;
        onChange: any;
    }): JSX.Element;
};
export default _default;
