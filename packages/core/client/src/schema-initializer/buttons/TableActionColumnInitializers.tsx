import { MenuOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../..';
import { useAPIClient } from '../../api-client';
import { createDesignable, useDesignable } from '../../schema-component';

export const TableActionColumnInitializers = (props: any) => {
  const fieldSchema = useFieldSchema();
  const api = useAPIClient();
  const { refresh } = useDesignable();
  const { t } = useTranslation();
  return (
    <SchemaInitializer.Button
      insertPosition={'beforeEnd'}
      insert={(schema) => {
        const spaceSchema = fieldSchema.reduceProperties((buf, schema) => {
          if (schema['x-component'] === 'Space') {
            return schema;
          }
          return buf;
        }, null);
        if (!spaceSchema) {
          return;
        }
        const dn = createDesignable({
          t,
          api,
          refresh,
          current: spaceSchema,
        });
        dn.loadAPIClientEvents();
        dn.insertBeforeEnd(schema);
      }}
      items={[
        {
          type: 'itemGroup',
          title: t('Enable actions'),
          children: [
            {
              type: 'item',
              title: t('View'),
              component: 'ViewActionInitializer',
              schema: {
                'x-component': 'Action.Link',
                'x-action': 'view',
                'x-decorator': 'ACLActionProvider',
              },
            },
            {
              type: 'item',
              title: t('Edit'),
              component: 'UpdateActionInitializer',
              schema: {
                'x-component': 'Action.Link',
                'x-action': 'update',
                'x-decorator': 'ACLActionProvider',
              },
            },
            {
              type: 'item',
              title: t('Delete'),
              component: 'DestroyActionInitializer',
              schema: {
                'x-component': 'Action.Link',
                'x-action': 'destroy',
                'x-decorator': 'ACLActionProvider',
              },
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'subMenu',
          title: '{{t("Customize")}}',
          children: [
            {
              type: 'item',
              title: '{{t("Popup")}}',
              component: 'CustomizeActionInitializer',
              schema: {
                type: 'void',
                title: '{{ t("Popup") }}',
                'x-action': 'customize:popup',
                'x-designer': 'Action.Designer',
                'x-component': 'Action.Link',
                'x-component-props': {
                  openMode: 'drawer',
                },
                properties: {
                  drawer: {
                    type: 'void',
                    title: '{{ t("Popup") }}',
                    'x-component': 'Action.Container',
                    'x-component-props': {
                      className: 'nb-action-popup',
                    },
                    properties: {
                      tabs: {
                        type: 'void',
                        'x-component': 'Tabs',
                        'x-component-props': {},
                        'x-initializer': 'TabPaneInitializers',
                        properties: {
                          tab1: {
                            type: 'void',
                            title: '{{t("Details")}}',
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
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'item',
              title: '{{t("Update record")}}',
              component: 'CustomizeActionInitializer',
              schema: {
                title: '{{ t("Update record") }}',
                'x-component': 'Action.Link',
                'x-action': 'customize:update',
                'x-designer': 'Action.Designer',
                'x-action-settings': {
                  assignedValues: {},
                  onSuccess: {
                    manualClose: true,
                    redirecting: false,
                    successMessage: '{{t("Updated successfully")}}',
                  },
                },
                'x-component-props': {
                  useProps: '{{ useCustomizeUpdateActionProps }}',
                },
              },
            },
          ],
        },
      ]}
      component={<MenuOutlined style={{ cursor: 'pointer' }} />}
    />
  );
};
