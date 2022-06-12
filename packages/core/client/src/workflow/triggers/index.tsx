import React from "react";
import { ISchema, useForm } from "@formily/react";
import { cx } from "@emotion/css";
import { Registry } from "@znewbee/utils";
import { useTranslation } from "react-i18next";
import { message, Tag } from "antd";

import { SchemaComponent, useActionContext, useAPIClient, useCompile, useRecord, useRequest, useResourceActionContext } from '../../';
import collection from './collection';
import { nodeCardClass, nodeMetaClass } from "../style";


function useUpdateConfigAction() {
  const { t } = useTranslation();
  const form = useForm();
  const api = useAPIClient();
  const record = useRecord();
  const ctx = useActionContext();
  const { refresh } = useResourceActionContext();
  return {
    async run() {
      if (record.executed) {
        message.error(t('Trigger in executed workflow cannot be modified'));
        return;
      }
      await form.submit();
      await api.resource('workflows', record.id).update({
        filterByTk: record.id,
        values: form.values
      });
      ctx.setVisible(false);
      refresh();
    },
  };
};

export interface Trigger {
  title: string;
  type: string;
  // group: string;
  options?: { label: string; value: any; key: string }[];
  fieldset: { [key: string]: ISchema };
  view?: ISchema;
  scope?: { [key: string]: any };
  components?: { [key: string]: any };
  render?(props): React.ReactElement;
  getter?(node: any): React.ReactElement;
};

export const triggers = new Registry<Trigger>();

triggers.register(collection.type, collection);

export const TriggerConfig = () => {
  const { t } = useTranslation();
  const compile = useCompile();
  const { data } = useResourceActionContext();
  if (!data) {
    return null;
  }
  const { type, config, executed } = data.data;
  const { title, fieldset, scope, components } = triggers.get(type);
  const detailText = executed ? '{{t("View")}}' : '{{t("Configure")}}';
  const titleText = `${t('Trigger')}: ${compile(title)}`;

  return (
    <div className={cx(nodeCardClass)}>
      <div className={cx(nodeMetaClass)}>
        <Tag color="gold">{t('Trigger')}</Tag>
      </div>
      <h4>{compile(title)}</h4>
      <SchemaComponent
        schema={{
          type: 'void',
          title: detailText,
          'x-component': 'Action.Link',
          name: 'drawer',
          properties: {
            drawer: {
              type: 'void',
              title: titleText,
              'x-component': 'Action.Drawer',
              'x-decorator': 'Form',
              'x-decorator-props': {
                initialValue: { config }
              },
              properties: {
                config: {
                  type: 'void',
                  name: 'config',
                  'x-component': 'fieldset',
                  'x-component-props': {},
                  properties: fieldset
                },
                actions: {
                  type: 'void',
                  'x-component': 'Action.Drawer.Footer',
                  properties: executed
                  ? {
                    close: {
                      title: '{{t("Close")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: '{{ cm.useCancelAction }}',
                      },
                    }
                  }
                  : {
                    cancel: {
                      title: '{{t("Cancel")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: '{{ cm.useCancelAction }}',
                      },
                    },
                    submit: {
                      title: '{{t("Submit")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        type: 'primary',
                        useAction: useUpdateConfigAction
                      }
                    }
                  }
                }
              }
            }
          }
        }}
        scope={scope}
        components={components}
      />
    </div>
  );
}
