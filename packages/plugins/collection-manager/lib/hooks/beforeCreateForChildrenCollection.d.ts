import Database from '@znewbee/database';
export declare function beforeCreateForChildrenCollection(db: Database): (model: any, { transaction, context }: {
    transaction: any;
    context: any;
}) => Promise<void>;
