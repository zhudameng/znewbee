import React from 'react';
export declare const KanbanBlockContext: React.Context<any>;
export declare const KanbanBlockProvider: (props: any) => JSX.Element;
export declare const useKanbanBlockContext: () => any;
export declare const useKanbanBlockProps: () => {
    groupField: any;
    disableCardDrag: boolean;
    onCardDragEnd({ columns, groupField }: {
        columns: any;
        groupField: any;
    }, { fromColumnId, fromPosition }: {
        fromColumnId: any;
        fromPosition: any;
    }, { toColumnId, toPosition }: {
        toColumnId: any;
        toPosition: any;
    }): Promise<void>;
};
