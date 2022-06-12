import { ACL, ACLRole } from '@znewbee/acl';
import { Model } from '@znewbee/database';
import { AssociationFieldsActions, GrantHelper } from '../server';
export declare class RoleResourceActionModel extends Model {
    writeToACL(options: {
        acl: ACL;
        role: ACLRole;
        resourceName: string;
        associationFieldsActions: AssociationFieldsActions;
        grantHelper: GrantHelper;
    }): Promise<void>;
}
