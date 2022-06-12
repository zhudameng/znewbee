export declare const useRoleResourceValues: (options: any) => {
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
