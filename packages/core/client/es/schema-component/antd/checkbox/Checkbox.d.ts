import type { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import React from 'react';
declare type ComposedCheckbox = React.FC<CheckboxProps> & {
    Group?: React.FC<CheckboxGroupProps>;
    __ANT_CHECKBOX?: boolean;
};
export declare const Checkbox: ComposedCheckbox;
export default Checkbox;
