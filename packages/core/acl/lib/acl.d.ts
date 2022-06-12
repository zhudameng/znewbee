/// <reference types="node" />
import EventEmitter from 'events';
import { AclAvailableAction, AvailableActionOptions } from './acl-available-action';
import { ACLAvailableStrategy, AvailableStrategyOptions } from './acl-available-strategy';
import { ACLRole, RoleActionParams } from './acl-role';
import { AllowManager } from './allow-manager';
interface CanResult {
    role: string;
    resource: string;
    action: string;
    params?: any;
}
export interface DefineOptions {
    role: string;
    allowConfigure?: boolean;
    strategy?: string | Omit<AvailableStrategyOptions, 'acl'>;
    actions?: {
        [key: string]: RoleActionParams;
    };
    routes?: any;
}
export interface ListenerContext {
    acl: ACL;
    role: ACLRole;
    path: string;
    actionName: string;
    resourceName: string;
    params: RoleActionParams;
}
declare type Listener = (ctx: ListenerContext) => void;
interface CanArgs {
    role: string;
    resource: string;
    action: string;
}
export declare class ACL extends EventEmitter {
    protected availableActions: Map<string, AclAvailableAction>;
    protected availableStrategy: Map<string, ACLAvailableStrategy>;
    protected middlewares: any[];
    allowManager: AllowManager;
    roles: Map<string, ACLRole>;
    actionAlias: Map<string, string>;
    configResources: string[];
    constructor();
    define(options: DefineOptions): ACLRole;
    getRole(name: string): ACLRole;
    removeRole(name: string): boolean;
    registerConfigResources(names: string[]): void;
    registerConfigResource(name: string): void;
    isConfigResource(name: string): boolean;
    setAvailableAction(name: string, options: AvailableActionOptions): void;
    getAvailableAction(name: string): AclAvailableAction;
    getAvailableActions(): Map<string, AclAvailableAction>;
    setAvailableStrategy(name: string, options: Omit<AvailableStrategyOptions, 'acl'>): void;
    beforeGrantAction(listener?: Listener): void;
    can({ role, resource, action }: CanArgs): CanResult | null;
    protected isAvailableAction(actionName: string): boolean;
    resolveActionAlias(action: string): string;
    use(fn: any): void;
    allow(resourceName: string, actionNames: string[] | string, condition?: any): void;
    parseJsonTemplate(json: any, ctx: any): any;
    middleware(): (ctx: any, next: any) => Promise<void>;
}
export {};
