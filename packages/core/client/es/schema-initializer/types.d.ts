/// <reference types="react" />
import { ISchema, Schema } from '@formily/react';
import { ButtonProps, DropDownProps, MenuItemProps } from 'antd';
export interface SchemaInitializerButtonProps extends ButtonProps {
    insert?: (s: ISchema) => void;
    wrap?: (s: ISchema) => ISchema;
    insertPosition?: 'beforeBegin' | 'afterBegin' | 'beforeEnd' | 'afterEnd';
    items?: SchemaInitializerItemOptions[];
    dropdown?: DropDownProps;
    component?: any;
    designable?: boolean;
    onSuccess?: any;
}
export declare type SchemaInitializerItemOptions = ItemGroupOptions | SubMenuOptions | ItemOptions | DividerOptions;
interface ItemCommonOptions {
    title?: any;
    key?: string;
}
interface ItemGroupOptions extends ItemCommonOptions {
    type: 'itemGroup';
    children?: SchemaInitializerItemOptions[];
}
interface SubMenuOptions extends ItemCommonOptions {
    type: 'subMenu';
    children?: SchemaInitializerItemOptions[];
}
declare type BreakFn = (s: ISchema) => boolean;
interface RemoveOptions {
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: ISchema | BreakFn;
}
declare type RemoveCallback = (s: Schema, options?: RemoveOptions) => void;
interface ItemOptions extends ItemCommonOptions {
    type: 'item';
    component?: any;
    schema?: ISchema;
    remove?: (schema: Schema, cb: RemoveCallback) => void;
    find?: (schema: Schema, key?: string, current?: string) => Schema | null | undefined;
    [key: string]: any;
}
interface DividerOptions {
    type: 'divider';
}
export declare type SchemaInitializerItemComponent = (props?: SchemaInitializerItemComponentProps) => any;
interface SchemaInitializerItemComponentProps {
    insert?: (s: ISchema) => void;
    item?: ItemOptions;
}
export interface SchemaInitializerItemProps extends Omit<MenuItemProps, 'onClick'> {
    items?: SchemaInitializerItemOptions[];
    onClick?: MenuClickEventHandler;
}
declare type MenuClickEventHandler = (info: MenuInfo) => void;
interface MenuInfo {
    item: ItemOptions;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
export {};
