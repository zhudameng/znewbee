import type { SequelizeHooks } from 'sequelize/types/lib/hooks';
import Database from './database';
export declare class ModelHook {
    database: Database;
    boundEvent: Set<string>;
    constructor(database: Database);
    isModelHook(eventName: string | symbol): keyof SequelizeHooks | false;
    findModelName(hookArgs: any): any;
    bindEvent(eventName: any): void;
    hasBindEvent(eventName: any): boolean;
    sequelizeHookBuilder(eventName: any): (...args: any[]) => Promise<void>;
}
