import React from 'react';
export declare const TableBlockContext: React.Context<any>;
export declare const TableBlockProvider: (props: any) => JSX.Element;
export declare const useTableBlockContext: () => any;
export declare const useTableBlockProps: () => {
    loading: any;
    showIndex: any;
    dragSort: any;
    rowKey: any;
    pagination: boolean | {
        defaultCurrent: any;
        defaultPageSize: any;
    };
    onRowSelectionChange(selectedRowKeys: any): void;
    onRowDragEnd({ from, to }: {
        from: any;
        to: any;
    }): Promise<void>;
    onChange({ current, pageSize }: {
        current: any;
        pageSize: any;
    }): void;
};
