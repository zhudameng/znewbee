import { ISchema } from '@formily/react';
import { Registry } from '@znewbee/utils';
import React from 'react';
export interface Instruction {
    title: string;
    type: string;
    group: string;
    options?: {
        label: string;
        value: any;
        key: string;
    }[];
    fieldset: {
        [key: string]: ISchema;
    };
    view?: ISchema;
    scope?: {
        [key: string]: any;
    };
    components?: {
        [key: string]: any;
    };
    render?(props: any): React.ReactElement;
    endding?: boolean;
    getter?(node: any): React.ReactElement;
}
export declare const instructions: Registry<Instruction>;
export declare function useNodeContext(): any;
export declare function Node({ data }: {
    data: any;
}): JSX.Element;
export declare function RemoveButton(): JSX.Element;
export declare function NodeDefaultView(props: any): JSX.Element;
