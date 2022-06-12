import { Plugin } from '@znewbee/server';
export declare class ChinaRegionPlugin extends Plugin {
    install(): Promise<void>;
    load(): Promise<void>;
    importData(): Promise<void>;
    getName(): string;
}
export default ChinaRegionPlugin;
