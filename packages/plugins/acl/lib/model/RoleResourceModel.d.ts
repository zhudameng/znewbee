import { Model } from '@znewbee/database';
import { ACL, ACLRole } from '@znewbee/acl';
import { AssociationFieldsActions, GrantHelper } from '../server';
export declare class RoleResourceModel extends Model {
    revoke(options: {
        role: ACLRole;
        resourceName: string;
        grantHelper: GrantHelper;
    }): Promise<void>;
    writeToACL(options: {
        acl: ACL;
        associationFieldsActions: AssociationFieldsActions;
        grantHelper: GrantHelper;
        transaction: any;
    }): Promise<void>;
}
