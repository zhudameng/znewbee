import Database from '@znewbee/database';
import Resourcer from '@znewbee/resourcer';
import Application, { ApplicationOptions } from './application';
export declare function createI18n(options: ApplicationOptions): import("i18next").i18n;
export declare function createDatabase(options: ApplicationOptions): Database;
export declare function createResourcer(options: ApplicationOptions): Resourcer;
export declare function registerMiddlewares(app: Application, options: ApplicationOptions): void;
