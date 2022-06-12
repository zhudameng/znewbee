import { Model } from '../model';
import { CreateOptions } from '../repository';
import { SingleRelationFindOption, SingleRelationRepository } from './single-relation-repository';
interface HasOneFindOptions extends SingleRelationFindOption {
}
interface IHasOneRepository<M extends Model> {
    find(options?: HasOneFindOptions): Promise<M>;
    findOne(options?: HasOneFindOptions): Promise<M>;
    create(options?: CreateOptions): Promise<M>;
    update(options?: any): Promise<M>;
    destroy(): Promise<Boolean>;
    set(primaryKey: any): Promise<void>;
    remove(): Promise<void>;
}
export declare class HasOneRepository extends SingleRelationRepository implements IHasOneRepository<any> {
}
export {};
