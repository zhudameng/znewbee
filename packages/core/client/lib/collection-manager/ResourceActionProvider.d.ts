import { Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
export declare const ResourceActionContext: React.Context<Result<any, any> & {
    state?: any;
    setState?: any;
    dragSort?: boolean;
    defaultRequest?: any;
}>;
interface ResourceActionProviderProps {
    type?: 'association' | 'collection';
    collection?: any;
    request?: any;
    dragSort?: boolean;
    uid?: string;
}
export declare const ResourceActionProvider: React.FC<ResourceActionProviderProps>;
export declare const useResourceActionContext: () => Result<any, any> & {
    state?: any;
    setState?: any;
    dragSort?: boolean;
    defaultRequest?: any;
};
export declare const useDataSourceFromRAC: (options: any) => Result<any, any> & {
    state?: any;
    setState?: any;
    dragSort?: boolean;
    defaultRequest?: any;
};
export declare const useResourceContext: () => {
    type: any;
    resource: any;
    collection: any;
    association: any;
    targetKey: any;
};
export {};
