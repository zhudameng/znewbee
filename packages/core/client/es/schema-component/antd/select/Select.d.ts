import type { SelectProps } from 'antd';
import React from 'react';
export declare const Select: React.ForwardRefExoticComponent<Partial<SelectProps<any, any> & {
    objectValue?: boolean;
    onChange?: (v: any) => void;
}> & React.RefAttributes<unknown>>;
export default Select;
