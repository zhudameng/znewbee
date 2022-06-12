import { Model } from '../model';
import { CreateOptions, UpdateOptions } from '../repository';
import { SingleRelationFindOption, SingleRelationRepository } from './single-relation-repository';
interface BelongsToFindOptions extends SingleRelationFindOption {
}
interface IBelongsToRepository<M extends Model> {
    find(options?: BelongsToFindOptions): Promise<M>;
    findOne(options?: BelongsToFindOptions): Promise<M>;
    create(options?: CreateOptions): Promise<M>;
    update(options?: UpdateOptions): Promise<M>;
    destroy(): Promise<Boolean>;
    set(primaryKey: any): Promise<void>;
    remove(): Promise<void>;
}
export declare class BelongsToRepository extends SingleRelationRepository implements IBelongsToRepository<any> {
}
export {};
