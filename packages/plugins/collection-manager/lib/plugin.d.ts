import { Plugin } from '@znewbee/server';
export declare class CollectionManagerPlugin extends Plugin {
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getName(): string;
}
export default CollectionManagerPlugin;
