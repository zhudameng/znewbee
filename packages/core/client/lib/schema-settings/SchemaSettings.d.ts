import { GeneralField } from '@formily/core';
import { ISchema, Schema } from '@formily/react';
import { MenuItemProps } from 'antd';
import React from 'react';
import { Designable } from '..';
interface SchemaSettingsProps {
    title?: any;
    dn?: Designable;
    field?: GeneralField;
    fieldSchema?: Schema;
}
interface SchemaSettingsContextProps {
    dn?: Designable;
    field?: GeneralField;
    fieldSchema?: Schema;
    setVisible?: any;
    visible?: any;
    template?: any;
    collectionName?: any;
}
export declare const useSchemaSettings: () => SchemaSettingsContextProps;
interface RemoveProps {
    confirm?: any;
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: ISchema | ((s: ISchema) => boolean);
}
declare type SchemaSettingsNested = {
    Remove?: React.FC<RemoveProps>;
    Item?: React.FC<MenuItemProps>;
    Divider?: React.FC;
    Popup?: React.FC<MenuItemProps & {
        schema?: ISchema;
    }>;
    [key: string]: any;
};
interface SchemaSettingsProviderProps {
    dn?: Designable;
    field?: GeneralField;
    fieldSchema?: Schema;
    setVisible?: any;
    visible?: any;
    template?: any;
    collectionName?: any;
}
export declare const SchemaSettingsProvider: React.FC<SchemaSettingsProviderProps>;
export declare const SchemaSettings: React.FC<SchemaSettingsProps> & SchemaSettingsNested;
export {};
