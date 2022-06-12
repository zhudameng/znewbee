import { Repository, Transactionable } from '@znewbee/database';
import { Transaction } from 'sequelize';
import { ChildOptions, SchemaNode } from './dao/ui_schema_node_dao';
interface GetJsonSchemaOptions {
    includeAsyncNode?: boolean;
    transaction?: Transaction;
}
declare type BreakRemoveOnType = {
    [key: string]: any;
};
export interface removeParentOptions extends Transactionable {
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: BreakRemoveOnType;
}
interface InsertAdjacentOptions extends removeParentOptions {
    wrap?: any;
}
export declare class UiSchemaRepository extends Repository {
    tableNameAdapter(tableName: any): any;
    get uiSchemasTableName(): any;
    get uiSchemaTreePathTableName(): any;
    sqlAdapter(sql: string): string;
    static schemaToSingleNodes(schema: any, carry?: SchemaNode[], childOptions?: ChildOptions): SchemaNode[];
    getProperties(uid: string, options?: Transactionable): Promise<Partial<{
        "x-uid": any;
        "x-async": boolean;
    }>>;
    getJsonSchema(uid: string, options?: GetJsonSchemaOptions): Promise<any>;
    private ignoreSchemaProperties;
    nodesToSchema(nodes: any, rootUid: any): {
        "x-uid": any;
        "x-async": boolean;
    };
    clearAncestor(uid: string, options?: Transactionable): Promise<void>;
    patch(newSchema: any, options?: any): Promise<void>;
    updateNode(uid: string, schema: any, transaction?: Transaction): Promise<void>;
    protected childrenCount(uid: any, transaction: any): Promise<number>;
    protected isLeafNode(uid: any, transaction: any): Promise<boolean>;
    findParentUid(uid: any, transaction?: any): Promise<string>;
    protected findNodeSchemaWithParent(uid: any, transaction: any): Promise<{
        parentUid: string;
        schema: import("@znewbee/database").Model<any, any>;
    }>;
    protected isSingleChild(uid: any, transaction: any): Promise<import("@znewbee/database").Model<any, any>>;
    removeEmptyParents(options: Transactionable & {
        uid: string;
        breakRemoveOn?: BreakRemoveOnType;
    }): Promise<void>;
    private breakOnMatched;
    recursivelyRemoveIfNoChildren(options: Transactionable & {
        uid: string;
        breakRemoveOn?: BreakRemoveOnType;
    }): Promise<void>;
    remove(uid: string, options?: Transactionable & removeParentOptions): Promise<void>;
    insertBeside(targetUid: string, schema: any, side: 'before' | 'after', options?: InsertAdjacentOptions): Promise<any>;
    insertInner(targetUid: string, schema: any, position: 'first' | 'last', options?: InsertAdjacentOptions): Promise<any>;
    private schemaExists;
    insertAdjacent(position: 'beforeBegin' | 'afterBegin' | 'beforeEnd' | 'afterEnd', target: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertAfterBegin(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertBeforeEnd(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertBeforeBegin(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertAfterEnd(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    insertNodes(nodes: SchemaNode[], options?: Transactionable): Promise<any[]>;
    insert(schema: any, options?: Transactionable): Promise<any>;
    insertNewSchema(schema: any, options?: Transactionable & {
        returnNode?: boolean;
    }): Promise<any>;
    private insertSchemaRecord;
    private prepareSingleNodeForInsert;
    insertSingleNode(schema: SchemaNode, options: Transactionable & removeParentOptions): Promise<any>;
}
export default UiSchemaRepository;
