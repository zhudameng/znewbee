import React from 'react';
import { SchemaInitializerButtonProps, SchemaInitializerItemComponent, SchemaInitializerItemProps } from './types';
export declare const SchemaInitializerItemContext: React.Context<any>;
export declare const SchemaInitializer: {
    (): any;
    Button: React.MemoExoticComponent<React.FunctionComponent<SchemaInitializerButtonProps>>;
    Item(props: SchemaInitializerItemProps): JSX.Element;
    itemWrap(component?: SchemaInitializerItemComponent): SchemaInitializerItemComponent;
    SwitchItem(props: any): JSX.Element;
};
