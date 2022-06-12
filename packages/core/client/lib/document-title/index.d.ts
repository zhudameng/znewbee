import React from 'react';
interface DocumentTitleContextProps {
    title?: any;
    setTitle?: (title?: any) => void;
}
export declare const DocumentTitleContext: React.Context<DocumentTitleContextProps>;
export declare const DocumentTitleProvider: React.FC<{
    addonBefore?: string;
    addonAfter?: string;
}>;
export declare const RemoteDocumentTitleProvider: React.FC;
export declare const useDocumentTitle: () => DocumentTitleContextProps;
export declare const useCurrentDocumentTitle: (title: string) => void;
export {};
