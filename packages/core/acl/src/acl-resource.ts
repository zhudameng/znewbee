import { ACLRole, RoleActionParams } from './acl-role';
import { ACL, ListenerContext } from './acl';

export type ResourceActions = { [key: string]: RoleActionParams };

interface AclResourceOptions {
  name: string;
  role: ACLRole;
  actions?: ResourceActions;
}

export class ACLResource {
  actions = new Map<string, RoleActionParams>();
  acl: ACL;
  role: ACLRole;
  name: string;

  constructor(options: AclResourceOptions) {
    this.acl = options.role.acl;

    this.role = options.role;
    this.name = options.name;

    const actionsOption: ResourceActions = options.actions || {};
    for (const actionName of Object.keys(actionsOption)) {
      this.actions.set(actionName, actionsOption[actionName]);
    }
  }

  getActions() {
    return Array.from(this.actions.keys()).reduce((carry, key) => {
      carry[key] = this.actions.get(key);
      return carry;
    }, {});
  }

  getAction(name: string) {
    return this.actions.get(name) || this.actions.get(this.acl.resolveActionAlias(name));
  }

  setAction(name: string, params: RoleActionParams) {
    const context: ListenerContext = {
      role: this.role,
      acl: this.role.acl,
      params: params || {},
      path: `${this.name}:${name}`,
      resourceName: this.name,
      actionName: name,
    };

    this.acl.emit('beforeGrantAction', context);

    this.actions.set(name, context.params);
  }

  setActions(actions: { [key: string]: RoleActionParams }) {
    for (const actionName of Object.keys(actions)) {
      this.setAction(actionName, actions[actionName]);
    }
  }

  removeAction(name: string) {
    this.actions.delete(name);
  }
}
