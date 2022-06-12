export declare const usePickActionProps: () => {
    onClick(): void;
};
export declare const useCreateActionProps: () => {
    onClick(): Promise<void>;
};
export declare const useCustomizeUpdateActionProps: () => {
    onClick(): Promise<void>;
};
export declare const useUpdateActionProps: () => {
    onClick(): Promise<void>;
};
export declare const useDestroyActionProps: () => {
    onClick(): Promise<void>;
};
export declare const useBulkDestroyActionProps: () => {
    onClick(): Promise<void>;
};
export declare const useDetailsPaginationProps: () => {
    simple: boolean;
    hidden: boolean;
    current: any;
    total: any;
    pageSize: number;
    onChange(page: any): Promise<void>;
    style: {
        marginTop: number;
        textAlign: string;
    };
};
