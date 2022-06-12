import _ from 'lodash';
import Resourcer from './resourcer';
import Middleware, { MiddlewareType } from './middleware';
import Action, { ActionName, ActionType } from './action';

export type ResourceType = 'single' | 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';

export interface ResourceOptions {
  /**
   * 资源名称
   */
  name: string;

  /**
   * 资源类型，默认为 single
   */
  type?: ResourceType;

  /**
   * 资源的行为
   */
  actions?: {
    [key: string]: ActionType;
  };

  /**
   * actions 白名单，默认有 list、get、create、update、delete
   */
  only?: Array<ActionName>;

  /**
   * actions 黑名单，默认有 list、get、create、update、delete
   */
  except?: Array<ActionName>;

  /**
   * 中间件
   */
  middleware?: MiddlewareType;

  /**
   * 中间件
   */
  middlewares?: MiddlewareType;

  /**
   * 额外的一些参数
   */
  [key: string]: any;
}

export class Resource {
  public readonly resourcer: Resourcer;

  public readonly middlewares: Middleware[];

  public readonly actions = new Map<ActionName, Action>();

  public readonly options: ResourceOptions;

  public readonly except: Array<ActionName>;

  constructor(options: ResourceOptions, resourcer: Resourcer) {
    const { middleware, middlewares, actions = {} } = options;
    this.options = options;
    this.resourcer = resourcer;
    this.middlewares = Middleware.toInstanceArray(middleware || middlewares);
    let excludes = [];
    for (const [name, handler] of resourcer.getRegisteredHandlers()) {
      if (!actions[name as string]) {
        actions[name as string] = handler;
      }
    }
    const { only = [], except = [] } = options;
    if (except.length > 0) {
      excludes = except;
    } else if (only.length > 0) {
      excludes = Object.keys(actions).filter((name) => !only.includes(name));
    }
    this.except = excludes;
    this.actions = Action.toInstanceMap(_.omit(actions, excludes), this);
  }

  getName() {
    return this.options.name;
  }

  getExcept() {
    return this.except;
  }

  getAction(action: ActionName) {
    if (this.except.includes(action)) {
      throw new Error(`${action} action is not allowed`);
    }
    if (!this.actions.has(action)) {
      throw new Error(`${action} action does not exist`);
    }
    return this.actions.get(action);
  }
}

export default Resource;
