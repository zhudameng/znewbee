import { Plugin } from '@znewbee/server';
import { ServerHooks } from './server-hooks';
export declare class UiSchemaStoragePlugin extends Plugin {
    serverHooks: ServerHooks;
    registerRepository(): void;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
export default UiSchemaStoragePlugin;
