import { Database, IDatabaseOptions } from './database';
export declare class MockDatabase extends Database {
    constructor(options: IDatabaseOptions);
}
export declare function getConfigByEnv(): {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
    logging: boolean | {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    storage: string;
    define: {
        charset: string;
        collate: string;
    };
};
export declare function mockDatabase(options?: IDatabaseOptions): MockDatabase;
