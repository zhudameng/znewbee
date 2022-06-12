import Koa from 'koa';
import { Database } from '@znewbee/database';
import { Action } from '@znewbee/resourcer';
import * as actions from './actions';
export * as utils from './utils';
export declare type Next = () => Promise<any>;
export interface Context extends Koa.Context {
    db: Database;
    action: Action;
    body: any;
    app: any;
    [key: string]: any;
}
export declare function registerActions(api: any): void;
export default actions;
