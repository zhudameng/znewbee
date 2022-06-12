export declare const useCancelAction: () => {
    run(): Promise<void>;
};
export declare const useResetFilterAction: () => {
    run(): Promise<void>;
};
export declare const useKanbanEvents: () => {
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
export declare const useSortFields: (collectionName: string) => any;
export declare const useCollectionFilterOptions: (collectionName: string) => any[];
export declare const useFilterDataSource: (options: any) => {
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
export declare const useFilterAction: () => {
    run(): Promise<void>;
};
export declare const useCreateAction: () => {
    run(): Promise<void>;
};
export declare const useCreateActionWithoutRefresh: () => {
    run(): Promise<void>;
};
export declare const useUpdateViewAction: () => {
    run(): Promise<void>;
};
export declare const useMoveAction: () => {
    move(from: any, to: any): Promise<void>;
};
export declare const useUpdateAction: () => {
    run(): Promise<void>;
};
export declare const useDestroyAction: () => {
    run(): Promise<void>;
};
export declare const useBulkDestroyAction: () => {
    run(): Promise<void>;
};
export declare const useValuesFromRecord: (options: any) => {
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
export declare const useValuesFromRA: (options: any) => {
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
export declare const useCreateActionAndRefreshCM: () => {
    run(): Promise<void>;
};
export declare const useUpdateActionAndRefreshCM: () => {
    run(): Promise<void>;
};
export declare const useDestroyActionAndRefreshCM: () => {
    run(): Promise<void>;
};
export declare const useBulkDestroyActionAndRefreshCM: () => {
    run(): Promise<void>;
};
