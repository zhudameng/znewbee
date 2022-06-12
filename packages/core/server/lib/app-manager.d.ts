/// <reference types="node" />
import EventEmitter from 'events';
import http, { IncomingMessage, ServerResponse } from 'http';
import Application, { ApplicationOptions } from './application';
declare type AppSelector = (req: IncomingMessage) => Application | string | undefined | null;
export declare class AppManager extends EventEmitter {
    private app;
    applications: Map<string, Application>;
    constructor(app: Application);
    appSelector: AppSelector;
    createApplication(name: string, options: ApplicationOptions): Application;
    removeApplication(name: string): Promise<void>;
    setAppSelector(selector: AppSelector): void;
    listen(...args: any[]): http.Server;
    getApplication(appName: string): Promise<null | Application>;
    callback(): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
}
export {};
