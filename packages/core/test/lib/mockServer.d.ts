import Application, { ApplicationOptions } from '@znewbee/server';
import supertest, { SuperAgentTest } from 'supertest';
interface ActionParams {
    filterByTk?: any;
    fields?: string[];
    filter?: any;
    sort?: string[];
    page?: number;
    pageSize?: number;
    values?: any;
    /**
     * @deprecated
     */
    resourceName?: string;
    /**
     * @deprecated
     */
    resourceIndex?: string;
    /**
     * @deprecated
     */
    associatedName?: string;
    /**
     * @deprecated
     */
    associatedIndex?: string;
    [key: string]: any;
}
interface SortActionParams {
    resourceName?: string;
    resourceIndex?: any;
    associatedName?: string;
    associatedIndex?: any;
    sourceId?: any;
    targetId?: any;
    sortField?: string;
    method?: string;
    target?: any;
    sticky?: boolean;
    [key: string]: any;
}
interface Resource {
    get: (params?: ActionParams) => Promise<supertest.Response>;
    list: (params?: ActionParams) => Promise<supertest.Response>;
    create: (params?: ActionParams) => Promise<supertest.Response>;
    update: (params?: ActionParams) => Promise<supertest.Response>;
    destroy: (params?: ActionParams) => Promise<supertest.Response>;
    sort: (params?: SortActionParams) => Promise<supertest.Response>;
    [name: string]: (params?: ActionParams) => Promise<supertest.Response>;
}
export declare class MockServer extends Application {
    loadAndInstall(options?: any): Promise<void>;
    cleanDb(): Promise<void>;
    agent(): SuperAgentTest & {
        resource: (name: string, resourceOf?: any) => Resource;
    };
}
export declare function mockServer(options?: ApplicationOptions): MockServer;
export declare function createMockServer(): void;
export default mockServer;
