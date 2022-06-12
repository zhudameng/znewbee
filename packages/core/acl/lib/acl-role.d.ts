import { ACL, DefineOptions } from './acl';
import { AvailableStrategyOptions } from './acl-available-strategy';
import { ACLResource } from './acl-resource';
export interface RoleActionParams {
    fields?: string[];
    filter?: any;
    own?: boolean;
    whitelist?: string[];
    blacklist?: string[];
    [key: string]: any;
}
interface ResourceActionsOptions {
    [actionName: string]: RoleActionParams;
}
export declare class ACLRole {
    acl: ACL;
    name: string;
    strategy: string | AvailableStrategyOptions;
    resources: Map<string, ACLResource>;
    constructor(acl: ACL, name: string);
    getResource(name: string): ACLResource | undefined;
    setResource(name: string, resource: ACLResource): void;
    setStrategy(value: string | AvailableStrategyOptions): void;
    grantResource(resourceName: string, options: ResourceActionsOptions): void;
    getResourceActionsParams(resourceName: string): {};
    revokeResource(resourceName: any): void;
    grantAction(path: string, options?: RoleActionParams): void;
    getActionParams(path: string): RoleActionParams;
    revokeAction(path: string): void;
    toJSON(): DefineOptions;
    protected getResourceActionFromPath(path: string): {
        resourceName: string;
        actionName: string;
        resource: ACLResource;
        action: any;
    };
}
export {};
