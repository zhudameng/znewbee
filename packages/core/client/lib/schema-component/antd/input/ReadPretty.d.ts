import { InputProps, TextAreaProps } from 'antd/lib/input';
import React from 'react';
declare type Composed = {
    Input: React.FC<InputProps & {
        ellipsis?: any;
    }>;
    URL: React.FC<InputProps>;
    TextArea: React.FC<TextAreaProps & {
        ellipsis?: any;
        text?: any;
        addonBefore?: any;
        suffix?: any;
        addonAfter?: any;
        autop?: boolean;
    }>;
    Html?: any;
};
export declare const ReadPretty: Composed;
export {};
