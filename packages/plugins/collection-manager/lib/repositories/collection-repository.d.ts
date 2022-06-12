import { Repository } from '@znewbee/database';
interface LoadOptions {
    filter?: any;
    skipExist?: boolean;
}
export declare class CollectionRepository extends Repository {
    load(options?: LoadOptions): Promise<void>;
    db2cm(collectionName: string): Promise<void>;
}
export {};
