export declare const useCollectionManager: () => {
    service: any;
    interfaces: any;
    collections: any[];
    refreshCM: () => Promise<void>;
    get(name: string): any;
    getCollection(name: any): any;
    getCollectionFields(name: string): any;
    getCollectionField(name: string): any;
    getInterface(name: string): any;
};
