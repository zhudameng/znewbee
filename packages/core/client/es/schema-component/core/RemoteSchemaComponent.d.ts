import { Schema } from '@formily/react';
import React from 'react';
export interface RemoteSchemaComponentProps {
    scope?: any;
    uid?: string;
    onSuccess?: any;
    components?: any;
    schemaTransform?: (schema: Schema) => Schema;
    render?: any;
    hidden?: any;
    onlyRenderProperties?: boolean;
    noForm?: boolean;
}
export declare const RemoteSchemaComponent: React.FC<RemoteSchemaComponentProps>;
