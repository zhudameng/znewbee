/**
 * title: addonBefore/addonAfter
 */
import { FormItem } from '@formily/antd';
import { InputNumber, SchemaComponent, SchemaComponentProvider } from '@znewbee/client';
import React from 'react';

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'boolean',
      title: `Editable`,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        addonBefore: '¥',
        addonAfter: '万元',
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      type: 'boolean',
      title: `Read pretty`,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        addonBefore: '¥',
        addonAfter: '万元',
      },
    },
  },
};

export default () => {
  return (
    <SchemaComponentProvider components={{ InputNumber, FormItem }}>
      <SchemaComponent schema={schema} />
    </SchemaComponentProvider>
  );
};
