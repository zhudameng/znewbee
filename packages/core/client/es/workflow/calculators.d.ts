import React from "react";
declare function NullRender(): any;
export declare const calculators: {
    value: string;
    title: string;
    children: {
        value: string;
        name: string;
    }[];
}[];
export declare function parseStringValue(value: string, Types: any): {
    type: string;
    value: string;
    options: {
        type: string;
    };
} | {
    type: string;
    options: any;
    value?: undefined;
};
export declare const BaseTypeSet: Set<string>;
export declare const VariableTypes: {
    constant: {
        title: string;
        value: string;
        options: {
            value: string;
            label: string;
        }[];
        component({ options }: {
            options?: {
                type: string;
            };
        }): any;
        appendTypeValue({ options }: {
            options?: {
                type: string;
            };
        }): string[];
        onTypeChange(old: any, [type, optionsType]: [any, any], onChange: any): void;
        parse(path: any): {
            path: any;
        };
    };
    $jobsMapByNodeId: {
        title: string;
        value: string;
        options(): any[];
        component({ options }: {
            options: any;
        }): typeof NullRender | ((node: any) => React.ReactElement<any, string | React.JSXElementConstructor<any>>);
        appendTypeValue({ options }: {
            type: string;
            options: any;
        }): number[];
        onTypeChange(old: any, [type, nodeId]: [any, any], onChange: any): void;
        parse([nodeId, ...path]: [any, ...any[]]): {
            nodeId: any;
            path: string;
        };
        stringify({ options }: {
            options: any;
        }): string;
    };
    $context: {
        title: string;
        value: string;
        component(): ((node: any) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) | typeof NullRender;
        parse([prefix, ...path]: [any, ...any[]]): {
            path: string;
        };
        stringify({ options }: {
            options: any;
        }): string;
    };
};
export declare const VariableTypesContext: React.Context<any>;
export declare function useVariableTypes(): any;
interface OperandProps {
    value: {
        type: string;
        value?: any;
        options?: any;
    };
    onChange(v: any): void;
    children?: React.ReactNode;
}
export declare function Operand({ value: operand, onChange, children }: OperandProps): JSX.Element;
export declare function Calculation({ calculator, operands, onChange }: {
    calculator: any;
    operands?: any[];
    onChange: any;
}): JSX.Element;
export declare function VariableComponent({ value, onChange, renderSchemaComponent }: {
    value: any;
    onChange: any;
    renderSchemaComponent: any;
}): JSX.Element;
export declare const CollectionFieldset: React.MemoExoticComponent<React.FunctionComponent<Pick<any, string | number | symbol>>>;
export {};
