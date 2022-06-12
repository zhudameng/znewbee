import { Plugin } from '@znewbee/server';
export declare class UiRoutesStoragePlugin extends Plugin {
    getName(): string;
    install(): Promise<void>;
    load(): Promise<void>;
}
export default UiRoutesStoragePlugin;
