import React from 'react';
export declare const DataSourceContext: React.Context<any>;
export declare const ds: {
    useSelectedRowKeys: () => any[];
    useDataSource: (options: any) => {
        state: {};
        setState: (patch: Partial<{}> | ((prevState: {}) => Partial<{}>)) => void;
        loading: boolean;
        data?: any;
        error?: Error;
        params: any;
        cancel: () => void;
        refresh: () => void;
        refreshAsync: () => Promise<any>;
        run: (...params: any) => void;
        runAsync: (...params: any) => Promise<any>;
        mutate: (data?: any) => void;
    };
    useCreateAction: () => {
        run(): Promise<void>;
    };
    useBulkDestroyAction: () => {
        run(): Promise<void>;
    };
    useUpdateAction: () => {
        run(): Promise<void>;
    };
    useDestroyAction: () => {
        run(): Promise<void>;
    };
};
export declare const SubFieldDataSourceProvider: React.MemoExoticComponent<React.FunctionComponent<unknown>>;
export declare const DataSourceProvider: React.MemoExoticComponent<React.FunctionComponent<Pick<any, string | number | symbol>>>;
