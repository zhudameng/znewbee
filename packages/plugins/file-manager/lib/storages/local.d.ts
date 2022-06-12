import Application from '@znewbee/server';
import multer from 'multer';
declare function middleware(app: Application, options?: any): Promise<void>;
declare const _default: {
    middleware: typeof middleware;
    make(storage: any): multer.StorageEngine;
    defaults(): {
        title: string;
        type: string;
        name: string;
        baseUrl: string;
        options: {
            documentRoot: string;
        };
    };
};
export default _default;
