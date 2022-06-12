import type { DatePickerProps } from 'antd/lib/date-picker';
export declare const getDefaultFormat: (props: DatePickerProps & {
    dateFormat: string;
    timeFormat: string;
}) => string | import("rc-picker/lib/interface").CustomFormat<import("moment").Moment> | (string | import("rc-picker/lib/interface").CustomFormat<import("moment").Moment>)[];
export declare const mapDateFormat: () => (props: any) => any;
