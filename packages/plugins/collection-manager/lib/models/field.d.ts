import Database, { MagicAttributeModel } from '@znewbee/database';
import { SyncOptions, Transactionable } from 'sequelize';
interface LoadOptions extends Transactionable {
    skipExist?: boolean;
}
export declare class FieldModel extends MagicAttributeModel {
    get db(): Database;
    load(loadOptions?: LoadOptions): Promise<import("@znewbee/database").Field>;
    migrate(options?: SyncOptions & Transactionable): Promise<void>;
}
export {};
