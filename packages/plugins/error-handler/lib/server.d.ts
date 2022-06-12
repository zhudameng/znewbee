import { Plugin } from '@znewbee/server';
import { ErrorHandler } from './error-handler';
export declare class PluginErrorHandler extends Plugin {
    getName(): string;
    errorHandler: ErrorHandler;
    i18nNs: string;
    beforeLoad(): void;
    registerSequelizeValidationErrorHandler(): void;
    load(): Promise<void>;
}
