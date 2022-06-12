import { ACL } from './acl';
declare type StrategyValue = false | '*' | string | string[];
export interface AvailableStrategyOptions {
    displayName?: string;
    actions?: false | string | string[];
    allowConfigure?: boolean;
    resource?: '*';
}
export declare function strategyValueMatched(strategy: StrategyValue, value: string): boolean;
export declare const predicate: {
    own: {
        filter: {
            createdById: string;
        };
    };
    all: {};
};
export declare class ACLAvailableStrategy {
    acl: ACL;
    options: AvailableStrategyOptions;
    actionsAsObject: {
        [key: string]: string;
    };
    allowConfigure: boolean;
    constructor(acl: ACL, options: AvailableStrategyOptions);
    matchAction(actionName: string): any;
    allow(resourceName: string, actionName: string): any;
}
export {};
