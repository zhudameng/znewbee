import { isArrayField } from '@formily/core';
import { observer, useField } from '@formily/react';
import { isValid } from '@formily/shared';
import { Tag } from 'antd';
import React from 'react';
import { defaultFieldNames, getCurrentOptions } from './shared';

type Composed = {
  Select?: React.FC<any>;
  Object?: React.FC<any>;
};

export const ReadPretty = observer((props: any) => {
  const fieldNames = { ...defaultFieldNames, ...props.fieldNames };
  const field = useField<any>();
  if (!isValid(props.value)) {
    return <div />;
  }
  if (isArrayField(field) && field?.value?.length === 0) {
    return <div />;
  }
  const dataSource = field.dataSource || props.options || [];
  const options = getCurrentOptions(field.value, dataSource, fieldNames);
  return (
    <div>
      {options.map((option, key) => (
        <Tag key={key} color={option[fieldNames.color]}>
          {option[fieldNames.label]}
        </Tag>
      ))}
    </div>
  );
});
