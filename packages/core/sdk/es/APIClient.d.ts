import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export interface ActionParams {
    filterByTk?: any;
    [key: string]: any;
}
declare type ResourceActionOptions<P = any> = {
    resource?: string;
    resourceOf?: any;
    action?: string;
    params?: P;
};
export interface IResource {
    list?: (params?: ActionParams) => Promise<any>;
    get?: (params?: ActionParams) => Promise<any>;
    create?: (params?: ActionParams) => Promise<any>;
    update?: (params?: ActionParams) => Promise<any>;
    destroy?: (params?: ActionParams) => Promise<any>;
    [key: string]: (params?: ActionParams) => Promise<any>;
}
export declare class Auth {
    protected api: APIClient;
    protected options: {
        token: any;
        locale: any;
        role: any;
    };
    constructor(api: APIClient);
    get locale(): string;
    get role(): string;
    get token(): string;
    set locale(value: string);
    set role(value: string);
    set token(value: string);
    middleware(config: AxiosRequestConfig): AxiosRequestConfig<any>;
    getLocale(): string;
    setLocale(locale: string): void;
    getToken(): string;
    setToken(token: string): void;
    getRole(): string;
    setRole(role: string): void;
    signIn(values: any): Promise<AxiosResponse<any>>;
    signOut(): Promise<void>;
}
export declare abstract class Storage {
    abstract clear(): void;
    abstract getItem(key: string): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, value: string): void;
}
export declare class MemoryStorage extends Storage {
    items: Map<any, any>;
    clear(): void;
    getItem(key: string): any;
    setItem(key: string, value: string): Map<any, any>;
    removeItem(key: string): boolean;
}
interface ExtendedOptions {
    authClass?: any;
    storageClass?: any;
}
export declare class APIClient {
    axios: AxiosInstance;
    auth: Auth;
    storage: Storage;
    constructor(instance?: AxiosInstance | (AxiosRequestConfig & ExtendedOptions));
    private initStorage;
    paramsSerializer(): void;
    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D> | ResourceActionOptions): Promise<R>;
    resource(name: string, of?: any): IResource;
}
export {};
