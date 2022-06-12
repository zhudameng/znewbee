import { MenuItemProps } from 'antd';
import React from 'react';
export declare const usePrefixCls: (tag?: string, props?: {
    prefixCls?: string;
}) => string;
declare type PluginManagerType = {
    Toolbar?: React.FC<ToolbarProps> & {
        Item?: React.FC<MenuItemProps & {
            selected?: boolean;
        }>;
    };
};
export declare const PluginManager: PluginManagerType;
interface ToolbarProps {
    items?: ToolbarItemProps[];
}
interface ToolbarItemProps {
    component: string;
    pin?: boolean;
}
export declare const RemotePluginManagerToolbar: () => JSX.Element;
export {};
