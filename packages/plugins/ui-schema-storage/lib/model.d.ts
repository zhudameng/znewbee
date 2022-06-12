import { MagicAttributeModel } from '@znewbee/database';
import { HookType } from './server-hooks';
declare class UiSchemaModel extends MagicAttributeModel {
    getServerHooksByType(type: HookType): any;
}
export { UiSchemaModel };
