import { ModelCtor } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
import FilterParser from './filter-parser';
import { Appends, Except, FindOptions } from './repository';
interface OptionsParserContext {
    collection: Collection;
    targetKey?: string;
}
export declare class OptionsParser {
    options: FindOptions;
    database: Database;
    collection: Collection;
    model: ModelCtor<any>;
    filterParser: FilterParser;
    context: OptionsParserContext;
    constructor(options: FindOptions, context: OptionsParserContext);
    isAssociation(key: string): boolean;
    isAssociationPath(path: string): boolean;
    toSequelizeParams(): any;
    /**
     * parser sort options
     * @param filterParams
     * @protected
     */
    protected parseSort(filterParams: any): any;
    protected parseFields(filterParams: any): any;
    protected parseExcept(except: Except, filterParams: any): any;
    protected parseAppends(appends: Appends, filterParams: any): any;
}
export {};
