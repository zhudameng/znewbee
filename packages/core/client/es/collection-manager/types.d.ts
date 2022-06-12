import { ISchema } from '@formily/react';
export interface CollectionManagerOptions {
    service?: any;
    interfaces?: any;
    collections?: any[];
    refreshCM?: () => Promise<void>;
}
export interface FieldOptions {
    type: string;
    interface?: string;
    uiSchema?: ISchema;
    [key: string]: any;
}
export interface CollectionOptions {
    name?: string;
    title?: string;
    filterTargetKey?: string;
    targetKey?: string;
    sortable?: any;
    fields?: FieldOptions[];
}
export interface ICollectionProviderProps {
    name?: string;
    fields?: any;
}
export interface CollectionFieldOptions {
    name?: any;
    collectionName?: string;
    sourceKey?: string;
    uiSchema?: ISchema;
    target?: string;
    [key: string]: any;
}
