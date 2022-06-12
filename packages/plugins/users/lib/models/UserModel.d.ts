import { Model, Transactionable } from '@znewbee/database';
export declare class UserModel extends Model {
    setDefaultRole(roleName: string, options?: Transactionable): Promise<boolean>;
}
