declare type MergeStrategyType = 'merge' | 'deepMerge' | 'overwrite' | 'andMerge' | 'orMerge' | 'intersect' | 'union';
declare type MergeStrategyFunc = (x: any, y: any) => any;
export declare type MergeStrategy = MergeStrategyType | MergeStrategyFunc;
export interface MergeStrategies {
    [key: string]: MergeStrategy;
}
export default function isPlainObject(value: any): boolean;
export declare const mergeStrategies: Map<MergeStrategyType, MergeStrategyFunc>;
export declare function assign(target: any, source: any, strategies?: MergeStrategies): any;
export {};
