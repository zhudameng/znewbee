import { connect, mapReadPretty } from '@formily/react';
import { InputRecordPicker } from './InputRecordPicker';
import { ReadPrettyRecordPicker } from './ReadPrettyRecordPicker';
export var RecordPicker = connect(InputRecordPicker, // mapProps(mapSuffixProps),
mapReadPretty(ReadPrettyRecordPicker));