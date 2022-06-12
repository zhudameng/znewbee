import { CleanOptions, SyncOptions } from '@znewbee/database';
import Application from './application';
import { Plugin } from './plugin';
interface PluginManagerOptions {
    app: Application;
}
export interface InstallOptions {
    cliArgs?: any[];
    clean?: CleanOptions | boolean;
    sync?: SyncOptions;
}
export declare class PluginManager {
    app: Application;
    protected plugins: Map<string, Plugin<any>>;
    constructor(options: PluginManagerOptions);
    getPlugins(): Map<string, Plugin<any>>;
    get(name: string): Plugin<any>;
    add<P = Plugin, O = any>(pluginClass: any, options?: O): P;
    load(): Promise<void>;
    install(options?: InstallOptions): Promise<void>;
    static resolvePlugin(pluginName: string): any;
}
export {};
