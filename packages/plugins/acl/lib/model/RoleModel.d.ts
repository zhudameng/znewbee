import { Model } from '@znewbee/database';
import { ACL } from '@znewbee/acl';
export declare class RoleModel extends Model {
    writeToAcl(options: {
        acl: ACL;
    }): void;
}
