import Koa from 'koa';
import { Database } from '@znewbee/database';
import { Action } from '@znewbee/resourcer';
import lodash from 'lodash';
import * as actions from './actions';

export * as utils from './utils';

export type Next = () => Promise<any>;

export interface Context extends Koa.Context {
  db: Database;
  action: Action;
  body: any;
  app: any;
  [key: string]: any;
}

export function registerActions(api: any) {
  api.actions(
    lodash.pick(actions, ['add', 'create', 'destroy', 'get', 'list', 'remove', 'set', 'toggle', 'update', 'move']),
  );
}

export default actions;
