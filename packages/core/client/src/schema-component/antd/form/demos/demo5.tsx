import { FormItem, Input } from '@formily/antd';
import { ISchema, observer, useForm } from '@formily/react';
import {
  Action,
  APIClientProvider,
  Form,
  SchemaComponent,
  SchemaComponentProvider,
  useAPIClient
} from '@znewbee/client';
import { Card, Space } from 'antd';
import React from 'react';
import { apiClient } from './apiClient';

export default observer(() => {
  const schema: ISchema = {
    type: 'object',
    properties: {
      form1: {
        type: 'void',
        'x-uid': 'form1',
        'x-component': 'Form',
        'x-component-props': {
          request: {
            resource: 'posts',
            action: 'get',
          },
        },
        properties: {
          field1: {
            title: 'T1',
            'x-component': 'Input',
            'x-decorator': 'FormItem',
          },
          field2: {
            title: 'T2',
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            required: true,
            default: 'default value',
          },
          out: {
            'x-component': 'Output',
          },
          Space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              action2: {
                // type: 'void',
                'x-component': 'Action',
                title: 'Submit',
                'x-component-props': {
                  useAction: '{{ useSubmit }}',
                },
              },
              action1: {
                // type: 'void',
                title: 'Refresh',
                'x-component': 'Action',
                'x-component-props': {
                  useAction: '{{ useRefresh }}',
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

  const useSubmit = () => {
    const form = useForm();
    return {
      async run() {
        await form.submit();
        console.log(form.values);
      },
    };
  };

  const useRefresh = () => {
    const apiClient = useAPIClient();
    return {
      async run() {
        apiClient.service('form1')?.refresh();
      },
    };
  };

  return (
    <APIClientProvider apiClient={apiClient}>
      <SchemaComponentProvider
        scope={{ useSubmit, useRefresh }}
        components={{ Space, Card, Output, Action, Form, Input, FormItem }}
      >
        <SchemaComponent schema={schema} />
      </SchemaComponentProvider>
    </APIClientProvider>
  );
});
