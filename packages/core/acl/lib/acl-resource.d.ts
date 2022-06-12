import { ACLRole, RoleActionParams } from './acl-role';
import { ACL } from './acl';
export declare type ResourceActions = {
    [key: string]: RoleActionParams;
};
interface AclResourceOptions {
    name: string;
    role: ACLRole;
    actions?: ResourceActions;
}
export declare class ACLResource {
    actions: Map<string, RoleActionParams>;
    acl: ACL;
    role: ACLRole;
    name: string;
    constructor(options: AclResourceOptions);
    getActions(): {};
    getAction(name: string): RoleActionParams;
    setAction(name: string, params: RoleActionParams): void;
    setActions(actions: {
        [key: string]: RoleActionParams;
    }): void;
    removeAction(name: string): void;
}
export {};
