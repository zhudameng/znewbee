import React from 'react';
import { Select } from 'antd';
import { observer, useForm } from '@formily/react';

import { useCollectionDataSource, useCollectionManager } from '../../collection-manager';
import { useCompile } from '../../schema-component';

import { useFlowContext } from '../WorkflowCanvas';
import { BaseTypeSet } from '../calculators';
import { collection, filter } from '../schemas/collection';
import { useTranslation } from 'react-i18next';

const FieldsSelect = observer((props) => {
  const compile = useCompile();
  const { getCollectionFields } = useCollectionManager();
  const { values } = useForm();
  const fields = getCollectionFields(values?.config?.collection);

  return (
    <Select
      {...props}
    >
      {fields
        .filter(field => (
          !field.hidden
          && (field.uiSchema ? !field.uiSchema['x-read-pretty'] : true)
        ))
        .map(field => (
          <Select.Option value={field.name}>{compile(field.uiSchema?.title)}</Select.Option>
        ))}
    </Select>
  );
});

export default {
  title: '{{t("Collection event")}}',
  type: 'collection',
  fieldset: {
    'config.collection': collection,
    'config.mode': {
      type: 'number',
      title: '{{t("Trigger on")}}',
      name: 'config.mode',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        options: [
          { value: 1, label: '{{t("After record added")}}' },
          { value: 2, label: '{{t("After record updated")}}' },
          { value: 3, label: '{{t("After record added or updated")}}' },
          { value: 4, label: '{{t("After record deleted")}}' }
        ]
      },
      required: true
    },
    'config.changed': {
      type: 'array',
      name: 'changed',
      title: '{{t("Changed fields")}}',
      description: '{{t("Triggered only if one of the selected fields changes. If unselected, it means that it will be triggered when any field changes. When record is added or deleted, any field is considered to have been changed.")}}',
      'x-decorator': 'FormItem',
      'x-component': 'FieldsSelect',
      'x-component-props': {
        mode: 'multiple',
      }
    },
    'config.condition': {
      ...filter,
      name: 'config.condition',
      title: '{{t("Only triggers when match conditions")}}'
    }
  },
  scope: {
    useCollectionDataSource
  },
  components: {
    FieldsSelect
  },
  getter({ type, options, onChange }) {
    const { t } = useTranslation();
    const compile = useCompile();
    const { collections = [] } = useCollectionManager();
    const { workflow } = useFlowContext();
    const collection = collections.find(item => item.name === workflow.config.collection) ?? { fields: [] };

    return (
      <Select
        placeholder={t('Fields')}
        value={options?.path?.replace(/^data\./, '')}
        onChange={(path) => {
          onChange({ type, options: { ...options, path: `data.${path}` } });
        }}
      >
        {collection.fields
          .filter(field => BaseTypeSet.has(field?.uiSchema?.type))
          .map(field => (
          <Select.Option key={field.name} value={field.name}>{compile(field.uiSchema.title)}</Select.Option>
        ))}
      </Select>
    );
  }
};
