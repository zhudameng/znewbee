import Resourcer from './resourcer';
import Middleware, { MiddlewareType } from './middleware';
import Action, { ActionName, ActionType } from './action';
export declare type ResourceType = 'single' | 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
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
export declare class Resource {
    readonly resourcer: Resourcer;
    readonly middlewares: Middleware[];
    readonly actions: Map<ActionName, Action>;
    readonly options: ResourceOptions;
    readonly except: Array<ActionName>;
    constructor(options: ResourceOptions, resourcer: Resourcer);
    getName(): string;
    getExcept(): ActionName[];
    getAction(action: ActionName): Action;
}
export default Resource;
