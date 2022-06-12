import { Plugin } from '@znewbee/server';
export default class PluginFileManager extends Plugin {
    storageType(): string;
    install(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
