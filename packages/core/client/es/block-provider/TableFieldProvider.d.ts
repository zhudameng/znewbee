import { Field } from '@formily/core';
import React from 'react';
import { APIClient } from '../api-client';
export declare const TableFieldContext: React.Context<any>;
export declare class TableFieldResource {
    field: Field;
    api: APIClient;
    sourceId: any;
    resource?: any;
    constructor(options: any);
    list(options: any): Promise<{
        data: {
            data: any;
        };
    }>;
    get(options: any): Promise<{
        data: {
            data: any;
        };
    }>;
    create(options: any): Promise<void>;
    update(options: any): Promise<void>;
    destroy(options: any): Promise<void>;
}
export declare const TableFieldProvider: (props: any) => JSX.Element;
export declare const useTableFieldContext: () => any;
export declare const useTableFieldProps: () => {
    size: string;
    loading: any;
    showIndex: any;
    dragSort: any;
    pagination: boolean;
    rowKey: (record: any) => number;
    onRowSelectionChange(selectedRowKeys: any): void;
    onChange({ current, pageSize }: {
        current: any;
        pageSize: any;
    }): void;
};
