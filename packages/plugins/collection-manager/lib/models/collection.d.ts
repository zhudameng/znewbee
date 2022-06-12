import { SyncOptions, Transactionable } from 'sequelize';
import Database, { Collection, MagicAttributeModel } from '@znewbee/database';
interface LoadOptions extends Transactionable {
    skipField?: boolean;
    skipExist?: boolean;
}
export declare class CollectionModel extends MagicAttributeModel {
    get db(): Database;
    load(loadOptions?: LoadOptions): Promise<Collection<any, any>>;
    loadFields(options?: Transactionable): Promise<void>;
    migrate(options?: SyncOptions & Transactionable): Promise<void>;
}
export {};
