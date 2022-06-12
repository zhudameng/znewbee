import React from 'react';
export declare const TableSelectorContext: React.Context<any>;
export declare const TableSelectorProvider: (props: any) => JSX.Element;
export declare const useTableSelectorContext: () => any;
export declare const useTableSelectorProps: () => {
    loading: any;
    showIndex: boolean;
    dragSort: boolean;
    rowKey: any;
    pagination: boolean | {
        defaultCurrent: any;
        defaultPageSize: any;
    };
    onRowSelectionChange(selectedRowKeys: any, selectedRows: any): void;
    onRowDragEnd({ from, to }: {
        from: any;
        to: any;
    }): Promise<void>;
    onChange({ current, pageSize }: {
        current: any;
        pageSize: any;
    }): void;
};
