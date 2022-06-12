import React from 'react';
import { useCollectionDataSource } from '../../collection-manager';
declare const _default: {
    title: string;
    type: string;
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
        'config.mode': {
            type: string;
            title: string;
            name: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                options: {
                    value: number;
                    label: string;
                }[];
            };
            required: boolean;
        };
        'config.changed': {
            type: string;
            name: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                mode: string;
            };
        };
        'config.condition': {
            name: string;
            title: string;
            type: string;
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
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        FieldsSelect: React.MemoExoticComponent<React.FunctionComponent<unknown>>;
    };
    getter({ type, options, onChange }: {
        type: any;
        options: any;
        onChange: any;
    }): JSX.Element;
};
export default _default;
