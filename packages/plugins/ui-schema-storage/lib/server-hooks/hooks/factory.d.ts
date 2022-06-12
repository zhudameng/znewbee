import { HookType } from '../index';
export declare function hookFactory(hookType: HookType, hookName: string, hookFunc: any): {
    hookType: HookType;
    hookName: string;
    hookFunc: any;
};
