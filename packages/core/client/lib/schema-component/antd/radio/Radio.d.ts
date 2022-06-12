import type { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import React from 'react';
declare type ComposedRadio = React.FC<RadioProps> & {
    Group?: React.FC<RadioGroupProps>;
    __ANT_RADIO?: boolean;
};
export declare const Radio: ComposedRadio;
export default Radio;
