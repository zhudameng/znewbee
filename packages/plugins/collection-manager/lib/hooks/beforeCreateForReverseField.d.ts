import Database from '@znewbee/database';
export declare function beforeCreateForReverseField(db: Database): (model: any, { transaction }: {
    transaction: any;
}) => Promise<void>;
