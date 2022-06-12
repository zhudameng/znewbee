import { Database } from '@znewbee/database';
import { Application } from './application';
import { InstallOptions } from './plugin-manager';
export interface PluginInterface {
    beforeLoad?: () => void;
    load(): any;
    getName(): string;
}
export interface PluginOptions {
    activate?: boolean;
    displayName?: string;
    description?: string;
    version?: string;
    install?: (this: Plugin) => void;
    load?: (this: Plugin) => void;
    plugin?: typeof Plugin;
    [key: string]: any;
}
export declare type PluginType = typeof Plugin;
export declare abstract class Plugin<O = any> implements PluginInterface {
    options: O;
    app: Application;
    db: Database;
    constructor(app: Application, options?: O);
    setOptions(options: O): void;
    abstract getName(): string;
    beforeLoad(): void;
    install(options?: InstallOptions): Promise<void>;
    load(): Promise<void>;
    collectionPath(): any;
    protected getPackageName(dirname: string): any;
}
