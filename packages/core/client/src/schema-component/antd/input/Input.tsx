import { LoadingOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Input as AntdInput } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import React from 'react';
import { ReadPretty } from './ReadPretty';

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>;
  URL?: React.FC<InputProps>;
};

export const Input: ComposedInput = connect(
  AntdInput,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
    };
  }),
  mapReadPretty(ReadPretty.Input),
);

Input.TextArea = connect(
  AntdInput.TextArea,
  mapProps((props, field) => {
    return {
      autoSize: {
        maxRows: 10,
        minRows: 3,
      },
      ...props,
    };
  }),
  mapReadPretty(ReadPretty.TextArea),
);
Input.URL = connect(AntdInput, mapReadPretty(ReadPretty.URL));

export default Input;
