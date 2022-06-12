export interface RegistryOptions {
    override: boolean;
}
export declare class Registry<T> {
    private map;
    options: RegistryOptions;
    constructor(options?: RegistryOptions);
    register(key: string, value: T): void;
    get(key: string): T;
    getKeys(): Iterable<string>;
    getValues(): Iterable<T>;
    getEntities(): Iterable<[string, T]>;
}
export default Registry;
