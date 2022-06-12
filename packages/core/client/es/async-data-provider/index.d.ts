import { Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
export declare const AsyncDataContext: React.Context<Result<any, any> & {
    state?: any;
    setState?: any;
}>;
export interface AsyncDataProviderProps {
    value?: any;
    request?: any;
    uid?: string;
    onSuccess?: (data: any, params: any) => void;
}
export declare const AsyncDataProvider: React.FC<AsyncDataProviderProps>;
export declare const useAsyncData: () => Result<any, any> & {
    state?: any;
    setState?: any;
};
