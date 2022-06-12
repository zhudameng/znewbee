import { Field } from '@formily/core';
import { Schema } from '@formily/react';
import React from 'react';
export interface SettingsFormContextProps {
    field?: Field;
    fieldSchema?: Schema;
    dropdownVisible?: boolean;
    setDropdownVisible?: (v: boolean) => void;
    dn?: any;
}
export declare const SettingsFormContext: React.Context<SettingsFormContextProps>;
export declare const useSettingsFormContext: () => SettingsFormContextProps;
export declare const SettingsForm: any;
