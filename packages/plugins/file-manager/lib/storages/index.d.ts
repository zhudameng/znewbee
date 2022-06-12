export interface IStorage {
    filenameKey?: string;
    middleware?: Function;
    getFileData?: Function;
    make: Function;
    defaults: Function;
}
export declare function getStorageConfig(key: string): IStorage;
