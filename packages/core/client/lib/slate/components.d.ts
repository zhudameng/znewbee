import React from 'react';
interface BaseProps {
    className: string;
    [key: string]: unknown;
}
export declare const Button: React.ForwardRefExoticComponent<Pick<{
    active: boolean;
    reversed: boolean;
} & BaseProps, keyof BaseProps> & React.RefAttributes<HTMLSpanElement>>;
export declare const EditorValue: React.ForwardRefExoticComponent<Pick<{
    value: any;
} & BaseProps, keyof BaseProps> & React.RefAttributes<null>>;
export declare const Icon: React.ForwardRefExoticComponent<Pick<BaseProps, keyof BaseProps> & React.RefAttributes<HTMLSpanElement>>;
export declare const Instruction: React.ForwardRefExoticComponent<Pick<BaseProps, keyof BaseProps> & React.RefAttributes<HTMLDivElement>>;
export declare const Menu: React.ForwardRefExoticComponent<Pick<BaseProps, keyof BaseProps> & React.RefAttributes<HTMLDivElement>>;
export declare const Portal: ({ children }: {
    children: any;
}) => React.ReactPortal;
export declare const Toolbar: React.ForwardRefExoticComponent<Pick<BaseProps, keyof BaseProps> & React.RefAttributes<HTMLDivElement>>;
export {};
