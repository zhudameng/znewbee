import { connect, mapProps, mapReadPretty, useField } from '@formily/react';
import { isValid } from '@formily/shared';
import { Radio as AntdRadio, Tag } from 'antd';
import type { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import React from 'react';

type ComposedRadio = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>;
  __ANT_RADIO?: boolean;
};

export const Radio: ComposedRadio = connect(
  AntdRadio,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  }),
);
Radio.__ANT_RADIO = true;

Radio.Group = connect(
  AntdRadio.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty((props) => {
    if (!isValid(props.value)) {
      return <div></div>;
    }
    const { options = [], value } = props;
    const field = useField<any>();
    const dataSource = field.dataSource || [];
    return (
      <div>
        {dataSource
          .filter((option) => option.value === value)
          .map((option, key) => (
            <Tag key={key} color={option.color}>
              {option.label}
            </Tag>
          ))}
      </div>
    );
  }),
);

export default Radio;
