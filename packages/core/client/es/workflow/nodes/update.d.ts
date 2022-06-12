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
        'config.params.filter': {
            title: string;
            type: string;
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
        'config.params.values': {
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
    };
    view: {};
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        VariableComponent: typeof VariableComponent;
        CollectionFieldset: import("react").MemoExoticComponent<import("react").FunctionComponent<Pick<any, string | number | symbol>>>;
    };
};
export default _default;
