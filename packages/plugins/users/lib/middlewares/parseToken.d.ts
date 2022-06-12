import { Context, Next } from '@znewbee/actions';
import UsersPlugin from '../server';
export declare function parseToken(options?: {
    plugin: UsersPlugin;
}): (ctx: Context, next: Next) => Promise<any>;
export declare function setCurrentRole(ctx: any): void;
