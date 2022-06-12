import { InstallOptions, Plugin } from '@znewbee/server';
export declare class SystemSettingsPlugin extends Plugin {
    getInitAppLang(options: any): any;
    install(options?: InstallOptions): Promise<void>;
    beforeLoad(): void;
    load(): Promise<void>;
    getName(): string;
}
export default SystemSettingsPlugin;
