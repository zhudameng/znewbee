import Action, { ActionName } from './action';
import Resource, { ResourceOptions } from './resource';
import { ParsedParams } from './utils';
export interface ResourcerContext {
    resourcer?: Resourcer;
    action?: Action;
    [key: string]: any;
}
export interface KoaMiddlewareOptions {
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 自定义 resource name 的获取规则
     *
     * 默认规则 relatedTable ? relatedTable.table : table
     */
    nameRule?: (params: ParsedParams) => string;
    /**
     * 自定义 action name
     *
     * 默认为
     *
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    accessors?: {
        /**
         * 查看列表
         */
        list?: string;
        /**
         * 新增数据
         */
        create?: string;
        /**
         * 查看数据详情
         */
        get?: string;
        /**
         * 更新数据
         */
        update?: string;
        /**
         * 删除数据
         */
        delete?: string;
    };
}
export interface ResourcerOptions {
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 自定义 action name
     *
     * 默认为
     *
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    accessors?: {
        /**
         * 查看列表
         */
        list?: string;
        /**
         * 新增数据
         */
        create?: string;
        /**
         * 查看数据详情
         */
        get?: string;
        /**
         * 更新数据
         */
        update?: string;
        /**
         * 删除数据
         */
        delete?: string;
    };
}
export interface ExecuteOptions {
    /**
     * 资源名称
     */
    resource: string;
    /**
     * 自定义 action name
     *
     * 默认
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    action: ActionName;
}
export declare type HandlerType = (ctx: ResourcerContext, next: () => Promise<any>) => any;
export interface Handlers {
    [key: string]: HandlerType;
}
export interface ImportOptions {
    /**
     * 指定配置所在路径
     */
    directory: string;
    /**
     * 文件后缀，默认值 ['js', 'ts', 'json']
     */
    extensions?: string[];
}
export declare class Resourcer {
    protected resources: Map<string, Resource>;
    /**
     * 全局定义的 action handlers
     */
    protected handlers: Map<ActionName, any>;
    protected actionHandlers: Map<ActionName, any>;
    protected middlewareHandlers: Map<string, any>;
    protected middlewares: any[];
    readonly options: ResourcerOptions;
    constructor(options?: ResourcerOptions);
    /**
     * 载入指定目录下的 resource 配置（配置的文件驱动）
     *
     * TODO: 配置的文件驱动现在会全部初始化，大数据时可能存在性能瓶颈，后续可以加入动态加载
     *
     * @param {object}   [options]
     * @param {string}   [options.directory] 指定配置所在路径
     * @param {array}    [options.extensions = ['js', 'ts', 'json']] 文件后缀
     */
    import(options: ImportOptions): Map<string, Resource>;
    /**
     * resource 配置
     *
     * @param name
     * @param options
     */
    define(options: ResourceOptions): Resource;
    isDefined(name: string): boolean;
    registerAction(name: ActionName, handler: HandlerType): void;
    registerActions(handlers: Handlers): void;
    /**
     * 注册全局的 action handlers
     *
     * @param handlers
     */
    registerActionHandlers(handlers: Handlers): void;
    registerActionHandler(name: ActionName, handler: HandlerType): void;
    getRegisteredHandler(name: ActionName): any;
    getRegisteredHandlers(): Map<ActionName, any>;
    getResource(name: string): Resource;
    getAction(name: string, action: ActionName): Action;
    getMiddlewares(): any[];
    use(middlewares: HandlerType | HandlerType[]): void;
    restApiMiddleware(options?: KoaMiddlewareOptions): (ctx: ResourcerContext, next: () => Promise<any>) => Promise<any>;
    middleware(options?: KoaMiddlewareOptions): (ctx: ResourcerContext, next: () => Promise<any>) => Promise<any>;
    /**
     * 实验性 API
     *
     * @param options
     * @param context
     * @param next
     */
    execute(options: ExecuteOptions, context?: ResourcerContext, next?: any): Promise<void>;
}
export default Resourcer;
