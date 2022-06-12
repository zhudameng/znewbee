import Resource from './resource';
import { HandlerType } from './resourcer';
import Middleware, { MiddlewareType } from './middleware';
import { MergeStrategies } from './assign';
export declare type ActionType = string | HandlerType | ActionOptions;
export declare type DefaultActionType = 'list' | 'create' | 'get' | 'update' | 'destroy' | 'set' | 'add' | 'remove';
export declare type ActionName = DefaultActionType | Omit<String, DefaultActionType>;
export interface ActionContext {
    action?: Action;
    [key: string]: any;
}
export declare type FieldsOptions = string[] | {
    only?: string[];
    appends?: string[];
} | {
    except?: string[];
    appends?: string[];
};
export declare type FieldsOptionsFn = (ctx: ActionContext) => FieldsOptions | Promise<FieldsOptions>;
/**
 * 过滤参数
 *
 * TODO：细节待定
 */
export interface FilterOptions {
    [key: string]: any;
}
export declare type FilterOptionsFn = (ctx: ActionContext) => FilterOptions | Promise<FieldsOptions>;
export declare type ParamsCallback = (ctx: ActionContext) => ActionParams | Promise<ActionParams>;
export interface ActionOptions {
    /**
     * 默认数据
     */
    values?: any;
    /**
     * 字段
     *
     * 示例一：
     * ['col1', 'col2', 'relation.col1'];
     *
     * 示例二：
     * {
     *  only: ['col1'],
     * }
     *
     * 示例三：
     * {
     *  except: ['col1'],
     * }
     */
    fields?: string[];
    appends?: string[];
    except?: string[];
    whitelist?: string[];
    blacklist?: string[];
    /**
     * 过滤
     */
    filter?: FilterOptions;
    /**
     * 排序
     */
    sort?: string[];
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页显示数量
     */
    pageSize?: number;
    /**
     * 最大每页显示数量
     */
    maxPageSize?: number;
    /**
     * 中间件
     */
    middleware?: MiddlewareType;
    /**
     * 中间件
     *
     * 与 middleware 用法相同
     */
    middlewares?: MiddlewareType;
    /**
     * 当前 Action 待执行的方法
     *
     * 支持 Function 和 require 调用
     */
    handler?: HandlerType;
    /**
     * 其他扩展配置
     */
    [key: string]: any;
}
/**
 * action params 与 action options 略有不同
 * - options 的参数更灵活，主要用于开发配置
 * - params 是开发配置参数 + 客户端参数的结合体
 */
export interface ActionParams {
    filterByTk?: any;
    /**
     * 输出哪些字段
     *
     * 与 ActionOptions 的不同，这里的 fields 是 object，提供 only，except，appends 三种情况
     */
    fields?: string[];
    appends?: string[];
    except?: string[];
    whitelist?: string[];
    blacklist?: string[];
    /**
     * 过滤
     */
    filter?: FilterOptions;
    /**
     * 排序
     *
     * 与 ActionOptions 的不同，这里的 sort 只有一种 array 类型
     */
    sort?: string[];
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页显示数量
     */
    pageSize?: number;
    /**
     * 数据，默认为 options.defaultValues + request.body
     */
    values?: any;
    /**
     * 当前资源的主体，对应的表名或 Model 名称
     */
    resourceName?: string;
    /**
     * 资源标识符
     */
    resourceIndex?: string;
    /**
     * 资源的从属关系
     */
    associatedName?: string;
    /**
     * 从属关系的标识符
     */
    associatedIndex?: string;
    /**
     * 从属关系的当前实例
     */
    associated?: any;
    /**
     * 资源提供哪些行为或方法
     */
    actionName?: string;
    /**
     * 其他扩展配置
     */
    [key: string]: any;
}
export declare class Action {
    protected handler: any;
    protected resource: Resource;
    protected name: ActionName;
    protected options: ActionOptions;
    protected context: ActionContext;
    params: ActionParams;
    actionName: string;
    resourceName: string;
    resourceOf: any;
    readonly middlewares: Array<Middleware>;
    constructor(options: ActionOptions);
    clone(): Action;
    setContext(context: any): void;
    mergeParams(params: ActionParams, strategies?: MergeStrategies): void;
    setResource(resource: Resource): this;
    getResource(): Resource;
    getOptions(): ActionOptions;
    setName(name: ActionName): this;
    getName(): ActionName;
    getMiddlewareHandlers(): any[];
    getHandler(): any;
    getHandlers(): any[];
    execute(context: any, next?: any): Promise<void>;
    static toInstanceMap(actions: object, resource?: Resource): Map<string, Action>;
}
export default Action;
