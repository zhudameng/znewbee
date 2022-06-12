import { Options, Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
declare type Opts = Options<any, any> & {
    uid?: string;
};
export interface FormProps {
    [key: string]: any;
}
export declare type FormUseValues = (opts?: Opts, props?: FormProps) => Result<any, any>;
export declare const Form: React.FC<FormProps> & {
    Designer?: any;
};
export {};
