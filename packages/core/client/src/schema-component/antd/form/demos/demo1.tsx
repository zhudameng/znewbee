import { FormItem, Input } from '@formily/antd';
import { ISchema, observer, useForm } from '@formily/react';
import { Action, Form, SchemaComponent, SchemaComponentProvider, useCloseAction } from '@znewbee/client';
import React from 'react';

export default observer(() => {
  const schema: ISchema = {
    type: 'object',
    properties: {
      a1: {
        type: 'void',
        'x-component': 'Action',
        'x-component-props': {
          type: 'primary',
        },
        title: 'Open',
        properties: {
          d1: {
            type: 'void',
            'x-component': 'Action.Drawer',
            'x-decorator': 'Form',
            title: 'Drawer Title',
            properties: {
              field1: {
                'x-component': 'Input',
                'x-decorator': 'FormItem',
                title: 'T1',
              },
              out: {
                'x-component': 'Output',
              },
              f1: {
                type: 'void',
                'x-component': 'Action.Drawer.Footer',
                properties: {
                  a1: {
                    'x-component': 'Action',
                    title: 'Close',
                    'x-component-props': {
                      useAction: '{{ useCloseAction }}',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const Output = observer(() => {
    const form = useForm();
    return <pre>{JSON.stringify(form.values, null, 2)}</pre>;
  });

  return (
    <SchemaComponentProvider scope={{ useCloseAction }} components={{ Output, Form, Action, Input, FormItem }}>
      <SchemaComponent schema={schema} />
    </SchemaComponentProvider>
  );
});
