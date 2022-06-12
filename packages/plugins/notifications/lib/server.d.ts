import { Plugin } from '@znewbee/server';
export default class PluginNotifications extends Plugin {
    load(): Promise<void>;
    getName(): string;
}
