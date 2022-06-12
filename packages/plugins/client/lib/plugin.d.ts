import { Plugin } from '@znewbee/server';
export declare class ClientPlugin extends Plugin {
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
export default ClientPlugin;
