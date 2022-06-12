import { Model } from 'sequelize';
import { Context } from '..';
import { Collection, TargetKey, SortField } from '@znewbee/database';
export declare function move(ctx: Context, next: any): Promise<void>;
interface MoveOptions {
    insertAfter?: boolean;
}
export declare class SortAbleCollection {
    collection: Collection;
    field: SortField;
    scopeKey: string;
    constructor(collection: Collection, fieldName?: string);
    move(sourceInstanceId: TargetKey, targetInstanceId: TargetKey, options?: MoveOptions): Promise<void>;
    changeScope(sourceInstanceId: TargetKey, targetScope: any, method?: string): Promise<void>;
    sticky(sourceInstanceId: TargetKey): Promise<void>;
    sameScopeMove(sourceInstance: Model, targetInstance: Model, options: MoveOptions): Promise<void>;
}
export {};
