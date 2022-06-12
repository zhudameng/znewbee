export declare class ErrorHandler {
    handlers: any[];
    register(guard: (err: any) => boolean, render: (err: any, ctx: any) => void): void;
    defaultHandler(err: any, ctx: any): void;
    middleware(): (ctx: any, next: any) => Promise<any>;
}
