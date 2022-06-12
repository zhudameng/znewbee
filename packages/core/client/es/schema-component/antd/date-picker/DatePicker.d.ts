import React from 'react';
import type { DatePickerProps as AntdDatePickerProps, RangePickerProps as AntdRangePickerProps } from 'antd/lib/date-picker';
declare type ComposedDatePicker = React.FC<AntdDatePickerProps> & {
    RangePicker?: React.FC<AntdRangePickerProps>;
};
export declare const DatePicker: ComposedDatePicker;
export default DatePicker;
