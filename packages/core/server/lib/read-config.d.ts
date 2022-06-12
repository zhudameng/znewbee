export declare function readConfig(dir: string): Promise<{}>;
export declare class ConfigurationRepository {
    protected items: Map<string, any>;
    get(key: string, defaultValue?: any): any;
    set(key: string, value: any): Map<string, any>;
    toObject(): {};
}
export declare function loadConfiguration(configurationDir: string, repository: ConfigurationRepository): Promise<void>;
