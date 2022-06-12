/// <reference types="react" />
import { TimePickerProps as AntdTimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker';
declare type ComposedTimePicker = React.FC<AntdTimePickerProps> & {
    RangePicker?: React.FC<TimeRangePickerProps>;
};
export declare const TimePicker: ComposedTimePicker;
export default TimePicker;
