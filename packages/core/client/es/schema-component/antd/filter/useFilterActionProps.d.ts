export declare const useFilterOptions: (collectionName: string) => any[];
export declare const mergeFilter: (filter1: any, filter2: any) => any;
export declare const useFilterActionProps: () => {
    options: any[];
    onSubmit(values: any): void;
    onReset(): void;
};
