import React from 'react';
export declare const BlockResourceContext: React.Context<any>;
export declare const BlockAssociationContext: React.Context<any>;
export declare const useBlockResource: () => any;
export declare const useResourceAction: (props: any, opts?: {}) => import("ahooks/lib/useRequest/src/types").Result<unknown, any[]>;
export declare const useBlockRequestContext: () => any;
export declare const BlockProvider: (props: any) => JSX.Element;
export declare const useBlockAssociationContext: () => any;
export declare const useFilterByTk: () => any;
export declare const useSourceIdFromRecord: () => any;
export declare const useSourceIdFromParentRecord: () => any;
export declare const useParamsFromRecord: () => {
    filterByTk: any;
};
export declare const RecordLink: (props: any) => JSX.Element;
