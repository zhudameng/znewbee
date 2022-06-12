import { Options, Result } from 'ahooks/lib/useRequest/src/types';
import { TableProps } from 'antd';
import React from 'react';
declare type TableVoidProps = TableProps<any> & {
    request?: any;
    useSelectedRowKeys?: any;
    useDataSource?: (options?: Options<any, any> & {
        uid?: string;
    }, props?: any) => Result<any, any> & {
        state?: any;
        setState?: any;
    };
};
export declare const TableVoid: React.FC<TableVoidProps>;
export {};
