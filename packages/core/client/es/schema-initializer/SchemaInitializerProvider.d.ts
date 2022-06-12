import React from 'react';
export declare const SchemaInitializerContext: React.Context<any>;
export interface SchemaInitializerProviderProps {
    components?: any;
    initializers?: Record<string, any>;
}
export declare const useSchemaInitializer: (name: string) => {
    exists: boolean;
    render: (props?: any) => React.CElement<any, React.Component<any, any, any>>;
};
export declare const SchemaInitializerProvider: React.FC<SchemaInitializerProviderProps>;
