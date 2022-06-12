import { Model as SequelizeModel } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
interface IModel {
    [key: string]: any;
}
export declare class Model<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends SequelizeModel<TModelAttributes, TCreationAttributes> implements IModel {
    static database: Database;
    static collection: Collection;
    toJSON<T extends TModelAttributes>(): T;
    private hiddenObjKey;
    private sortAssociations;
    private sortArray;
}
export {};
