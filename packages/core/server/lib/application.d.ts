/// <reference types="node" />
/// <reference types="koa-bodyparser" />
import { ACL } from '@znewbee/acl';
import Database, { CollectionOptions, IDatabaseOptions } from '@znewbee/database';
import Resourcer, { ResourceOptions } from '@znewbee/resourcer';
import { AsyncEmitter } from '@znewbee/utils';
import { Command, CommandOptions } from 'commander';
import { Server } from 'http';
import { i18n, InitOptions } from 'i18next';
import Koa from 'koa';
import { AppManager } from './app-manager';
import { Plugin } from './plugin';
import { InstallOptions, PluginManager } from './plugin-manager';
export declare type PluginConfiguration = string | [string, any];
export declare type PluginsConfigurations = Array<PluginConfiguration>;
export interface ResourcerOptions {
    prefix?: string;
}
export interface ApplicationOptions {
    database?: IDatabaseOptions | Database;
    resourcer?: ResourcerOptions;
    bodyParser?: any;
    cors?: any;
    dataWrapping?: boolean;
    registerActions?: boolean;
    i18n?: i18n | InitOptions;
    plugins?: PluginsConfigurations;
}
export interface DefaultState {
    currentUser?: any;
    [key: string]: any;
}
export interface DefaultContext {
    db: Database;
    resourcer: Resourcer;
    [key: string]: any;
}
interface MiddlewareOptions {
    name?: string;
    resourceName?: string;
    resourceNames?: string[];
    insertBefore?: string;
    insertAfter?: string;
}
interface ActionsOptions {
    resourceName?: string;
    resourceNames?: string[];
}
interface ListenOptions {
    port?: number | undefined;
    host?: string | undefined;
    backlog?: number | undefined;
    path?: string | undefined;
    exclusive?: boolean | undefined;
    readableAll?: boolean | undefined;
    writableAll?: boolean | undefined;
    /**
     * @default false
     */
    ipv6Only?: boolean | undefined;
    signal?: AbortSignal | undefined;
}
interface StartOptions {
    cliArgs?: any[];
    listen?: ListenOptions;
}
export declare class Application<StateT = DefaultState, ContextT = DefaultContext> extends Koa implements AsyncEmitter {
    options: ApplicationOptions;
    readonly db: Database;
    readonly resourcer: Resourcer;
    readonly cli: Command;
    readonly i18n: i18n;
    readonly pm: PluginManager;
    readonly acl: ACL;
    readonly appManager: AppManager;
    protected plugins: Map<string, Plugin<any>>;
    listenServer: Server;
    constructor(options: ApplicationOptions);
    getVersion(): any;
    plugin<O = any>(pluginClass: any, options?: O): Plugin<O>;
    loadPluginConfig(pluginsConfigurations: PluginsConfigurations): void;
    use<NewStateT = {}, NewContextT = {}>(middleware: Koa.Middleware<StateT & NewStateT, ContextT & NewContextT>, options?: MiddlewareOptions): Koa<Koa.DefaultState & StateT & NewStateT, Koa.DefaultContext & ContextT & NewContextT>;
    collection(options: CollectionOptions): import("@znewbee/database").Collection<any, any>;
    resource(options: ResourceOptions): import("@znewbee/resourcer").Resource;
    actions(handlers: any, options?: ActionsOptions): void;
    command(name: string, desc?: string, opts?: CommandOptions): Command;
    findCommand(name: string): Command;
    load(): Promise<void>;
    getPlugin<P extends Plugin>(name: string): P;
    parse(argv?: string[]): Promise<Command>;
    start(options?: StartOptions): Promise<void>;
    listen(...args: any[]): Server;
    stop(options?: any): Promise<void>;
    destroy(options?: any): Promise<void>;
    install(options?: InstallOptions): Promise<void>;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
}
export default Application;
