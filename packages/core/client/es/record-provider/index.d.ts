import React from 'react';
export declare const RecordContext: React.Context<{}>;
export declare const RecordIndexContext: React.Context<any>;
export declare const RecordProvider: React.FC<{
    record: any;
}>;
export declare const RecordIndexProvider: React.FC<{
    index: any;
}>;
export declare function useRecord<D = any>(): D;
export declare function useRecordIndex(): any;
export declare const useRecordIsOwn: () => boolean;
