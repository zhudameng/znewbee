import { Context, Next } from '@znewbee/actions';
export declare function middleware(ctx: Context, next: Next): Promise<any>;
export declare function action(ctx: Context, next: Next): Promise<never>;
