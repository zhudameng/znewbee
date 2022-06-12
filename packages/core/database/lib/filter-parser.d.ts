import { ModelCtor } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
import { Model } from './model';
declare type FilterType = any;
interface FilterParserContext {
    collection: Collection;
    app?: any;
}
export default class FilterParser {
    collection: Collection;
    database: Database;
    model: ModelCtor<Model>;
    filter: FilterType;
    context: FilterParserContext;
    constructor(filter: FilterType, context: FilterParserContext);
    prepareFilter(filter: FilterType): any;
    toSequelizeParams(): {
        where?: undefined;
        include?: undefined;
    } | {
        where: {};
        include: any[];
    };
    private getFieldNameFromQueryPath;
}
export {};
