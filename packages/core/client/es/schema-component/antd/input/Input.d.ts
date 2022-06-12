import { InputProps, TextAreaProps } from 'antd/lib/input';
import React from 'react';
declare type ComposedInput = React.FC<InputProps> & {
    TextArea?: React.FC<TextAreaProps>;
    URL?: React.FC<InputProps>;
};
export declare const Input: ComposedInput;
export default Input;
