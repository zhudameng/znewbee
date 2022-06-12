import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosRequestConfig } from 'axios';
declare type FunctionService = (...args: any[]) => Promise<any>;
declare type ResourceActionOptions<P = any> = {
    resource?: string;
    resourceOf?: any;
    action?: string;
    params?: P;
};
export declare function useRequest<P>(service: AxiosRequestConfig<P> | ResourceActionOptions<P> | FunctionService, options?: Options<any, any> & {
    uid?: string;
}): {
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
export {};
