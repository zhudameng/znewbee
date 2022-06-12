import React from 'react';
import { useCollectionDataSource } from '../..';
declare const _default: {
    title: string;
    type: string;
    group: string;
    fieldset: {
        'config.collection': {
            name: string;
            type: string;
            title: string;
            required: boolean;
            'x-reactions': string[];
            'x-decorator': string;
            'x-component': string;
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
        CollectionFieldset: React.MemoExoticComponent<React.FunctionComponent<Pick<any, string | number | symbol>>>;
    };
    getter({ type, options, onChange }: {
        type: any;
        options: any;
        onChange: any;
    }): JSX.Element;
};
export default _default;
