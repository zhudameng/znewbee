import { MultipleRelationRepository, Repository } from '@znewbee/database';
import { Context } from '.';
export declare function getRepositoryFromParams(ctx: Context): MultipleRelationRepository | Repository<any, any>;
export declare function RelationRepositoryActionBuilder(method: 'remove' | 'set'): (ctx: Context, next: any) => Promise<void>;
