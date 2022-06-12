import { Plugin } from '@znewbee/server';
export default class PluginActionLogs extends Plugin {
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
