import { ResourcerContext } from '@znewbee/resourcer';
import Database from '@znewbee/database';
export declare function table2resource(): (ctx: ResourcerContext & {
    db: Database;
}, next: () => Promise<any>) => Promise<any>;
export default table2resource;
