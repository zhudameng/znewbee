export declare const skip: (options: ACLSkipOptions) => (ctx: any, next: any) => Promise<void>;
interface ACLSkipOptions {
    resourceName: string;
    actionName: string;
}
export {};
