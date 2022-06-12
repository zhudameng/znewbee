import { ResourceType } from './resource';
export interface ParseRequest {
    path: string;
    method: string;
    type?: ResourceType;
}
export interface ParseOptions {
    prefix?: string;
    accessors?: {
        list?: string;
        create?: string;
        get?: string;
        update?: string;
        delete?: string;
        set?: string;
        add?: string;
    };
}
export interface ParsedParams {
    actionName?: string;
    resourceName?: string;
    resourceIndex?: string;
    associatedName?: string;
    associatedIndex?: string;
}
export declare function getNameByParams(params: ParsedParams): string;
export declare function parseRequest(request: ParseRequest, options?: ParseOptions): ParsedParams | false;
export declare function requireModule(module: any): any;
export declare function parseQuery(input: string): any;
export declare function parseFields(fields: any): any;
export declare function mergeFields(defaults: any, inputs: any): any;
