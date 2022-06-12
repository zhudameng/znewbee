import { Model } from './model';
export declare class MagicAttributeModel extends Model {
    get magicAttribute(): string;
    set(key: any, value?: any, options?: any): this;
    get(key?: any, value?: any): any;
    update(values?: any, options?: any): Promise<this>;
}
