import { InstallOptions, Plugin } from '@znewbee/server';
export declare class PluginMultiAppManager extends Plugin {
    getName(): string;
    install(options?: InstallOptions): Promise<void>;
    load(): Promise<void>;
}
