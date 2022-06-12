import React from 'react';
export declare const SchemaTemplateManagerContext: React.Context<any>;
export declare const SchemaTemplateManagerProvider: React.FC<any>;
export declare const useSchemaTemplate: () => any;
export declare const useSchemaTemplateManager: () => {
    templates: any;
    refresh: any;
    getTemplateSchemaByMode(options: any): Promise<any>;
    copyTemplateSchema(template: any): Promise<any>;
    saveAsTemplate(values: any): Promise<{
        key: string;
    }>;
    getTemplateBySchema(schema: any): any;
    getTemplateBySchemaId(schemaId: any): any;
    getTemplateById(key: any): any;
    getTemplatesByCollection(collectionName: string): any;
};
export declare const RemoteSchemaTemplateManagerProvider: React.FC;
