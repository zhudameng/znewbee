import { Plugin } from '@znewbee/server';
import { RoleResourceActionModel } from './model/RoleResourceActionModel';
import { RoleResourceModel } from './model/RoleResourceModel';
export interface AssociationFieldAction {
    associationActions: string[];
    targetActions?: string[];
}
interface AssociationFieldActions {
    [availableActionName: string]: AssociationFieldAction;
}
export interface AssociationFieldsActions {
    [associationType: string]: AssociationFieldActions;
}
export declare class GrantHelper {
    resourceTargetActionMap: Map<string, string[]>;
    targetActionResourceMap: Map<string, string[]>;
    constructor();
}
export declare class PluginACL extends Plugin {
    associationFieldsActions: AssociationFieldsActions;
    grantHelper: GrantHelper;
    get acl(): import("@znewbee/acl").ACL;
    registerAssociationFieldAction(associationType: string, value: AssociationFieldActions): void;
    registerAssociationFieldsActions(): void;
    writeResourceToACL(resourceModel: RoleResourceModel, transaction: any): Promise<void>;
    writeActionToACL(actionModel: RoleResourceActionModel, transaction: any): Promise<void>;
    writeRolesToACL(): Promise<void>;
    beforeLoad(): Promise<void>;
    install(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
export default PluginACL;
