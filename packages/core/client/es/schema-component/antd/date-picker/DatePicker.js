import { DatePicker as AntdDatePicker } from 'antd';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { ReadPretty } from './ReadPretty';
import { mapDateFormat } from './util';
export var DatePicker = connect(AntdDatePicker, mapProps(mapDateFormat()), mapReadPretty(ReadPretty.DatePicker));
DatePicker.RangePicker = connect(AntdDatePicker.RangePicker, mapProps(mapDateFormat()), mapReadPretty(ReadPretty.DateRangePicker));
export default DatePicker;