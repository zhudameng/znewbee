import React from "react";
import { ISchema } from "@formily/react";
import { Registry } from "@znewbee/utils";
export interface Trigger {
    title: string;
    type: string;
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
    getter?(node: any): React.ReactElement;
}
export declare const triggers: Registry<Trigger>;
export declare const TriggerConfig: () => JSX.Element;
