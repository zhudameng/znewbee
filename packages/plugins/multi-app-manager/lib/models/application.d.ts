import { IDatabaseOptions, Model, Transactionable } from '@znewbee/database';
import { Application } from '@znewbee/server';
export interface registerAppOptions extends Transactionable {
    skipInstall?: boolean;
}
export declare class ApplicationModel extends Model {
    static getDatabaseConfig(app: Application): IDatabaseOptions;
    static handleAppStart(app: Application, options: registerAppOptions): Promise<void>;
    registerToMainApp(mainApp: Application, options: registerAppOptions): Promise<void>;
    static initOptions(appName: string, mainApp: Application): {
        database: IDatabaseOptions;
    };
}
