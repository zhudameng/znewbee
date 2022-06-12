import Database from '@znewbee/database';
export declare function afterCreateForReverseField(db: Database): (model: any, { transaction }: {
    transaction: any;
}) => Promise<void>;
