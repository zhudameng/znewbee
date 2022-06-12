/// <reference types="react" />
import { ObjectField } from '@formily/core';
import { Schema } from '@formily/react';
export interface FilterContextProps {
    field?: ObjectField;
    fieldSchema?: Schema;
    dynamicComponent?: any;
    options?: any[];
}
export declare const RemoveConditionContext: import("react").Context<any>;
export declare const FilterContext: import("react").Context<FilterContextProps>;
export declare const FilterLogicContext: import("react").Context<any>;
