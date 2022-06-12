import { ActionName } from './action';
import { HandlerType } from './resourcer';
export declare type MiddlewareType = string | string[] | HandlerType | HandlerType[] | MiddlewareOptions | MiddlewareOptions[];
export interface MiddlewareOptions {
    /**
     * actions 白名单，默认有 list、get、create、update、delete
     */
    only?: Array<ActionName>;
    /**
     * actions 黑名单，默认有 list、get、create、update、delete
     */
    except?: Array<ActionName>;
    handler?: HandlerType | Function;
    [key: string]: any;
}
export declare class Middleware {
    protected options: MiddlewareOptions;
    constructor(options: MiddlewareOptions | Function);
    getHandler(): any;
    canAccess(name: ActionName): boolean;
    static toInstanceArray(middlewares: any): Middleware[];
}
export default Middleware;
