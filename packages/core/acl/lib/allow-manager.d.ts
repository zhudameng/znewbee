import { ACL } from './acl';
declare type ConditionFunc = (ctx: any) => Promise<boolean>;
export declare class AllowManager {
    acl: ACL;
    protected skipActions: Map<string, Map<string, string | true | ConditionFunc>>;
    protected registeredCondition: Map<string, ConditionFunc>;
    constructor(acl: ACL);
    allow(resourceName: string, actionName: string, condition?: string | ConditionFunc): void;
    getAllowedConditions(resourceName: string, actionName: string): Array<ConditionFunc | true>;
    registerAllowCondition(name: string, condition: ConditionFunc): void;
    aclMiddleware(): (ctx: any, next: any) => Promise<void>;
}
export {};
