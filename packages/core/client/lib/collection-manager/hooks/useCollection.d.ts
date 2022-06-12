import { SchemaKey } from '@formily/react';
import { CollectionFieldOptions } from '../types';
export declare const useCollection: () => {
    resource: import("@znewbee/sdk").IResource;
    getField(name: SchemaKey): CollectionFieldOptions;
    name?: string;
    title?: string;
    filterTargetKey?: string;
    targetKey?: string;
    sortable?: any;
    fields?: import("../types").FieldOptions[];
};
