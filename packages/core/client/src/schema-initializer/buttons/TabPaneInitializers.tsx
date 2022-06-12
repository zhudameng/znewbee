import { useForm } from '@formily/react';
import React from 'react';
import { SchemaComponent, useActionContext, useDesignable } from '../..';

export const TabPaneInitializers = () => {
  const { designable, insertBeforeEnd } = useDesignable();
  if (!designable) {
    return null;
  }
  const useSubmitAction = () => {
    const form = useForm();
    const ctx = useActionContext();
    return {
      async run() {
        await form.submit();
        const { title } = form.values;
        insertBeforeEnd({
          type: 'void',
          title,
          'x-component': 'Tabs.TabPane',
          'x-designer': 'Tabs.Designer',
          'x-component-props': {},
          properties: {
            grid: {
              type: 'void',
              'x-component': 'Grid',
              'x-initializer': 'RecordBlockInitializers',
              properties: {},
            },
          },
        });
        await form.reset();
        ctx.setVisible(false);
      },
    };
  };
  return (
    <SchemaComponent
      schema={{
        type: 'void',
        properties: {
          action1: {
            type: 'void',
            'x-component': 'Action',
            'x-component-props': {
              icon: 'PlusOutlined',
              style: {
                borderColor: 'rgb(241, 139, 98)',
                color: 'rgb(241, 139, 98)',
              },
              type: 'dashed',
            },
            title: '{{t("Add tab")}}',
            properties: {
              drawer1: {
                'x-decorator': 'Form',
                'x-component': 'Action.Modal',
                'x-component-props': {
                  width: 520,
                },
                type: 'void',
                title: '{{t("Add tab")}}',
                properties: {
                  title: {
                    title: '{{t("Tab name")}}',
                    required: true,
                    'x-component': 'Input',
                    'x-decorator': 'FormItem',
                  },
                  footer: {
                    'x-component': 'Action.Modal.Footer',
                    type: 'void',
                    properties: {
                      cancel: {
                        title: '{{t("Cancel")}}',
                        'x-component': 'Action',
                        'x-component-props': {
                          useAction: () => {
                            const ctx = useActionContext();
                            return {
                              async run() {
                                ctx.setVisible(false);
                              },
                            };
                          },
                        },
                      },
                      submit: {
                        title: '{{t("Submit")}}',
                        'x-component': 'Action',
                        'x-component-props': {
                          type: 'primary',
                          useAction: useSubmitAction,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }}
    />
  );
};
