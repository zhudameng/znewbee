import { ISchema, useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../..';
import { useCollection, useCollectionManager } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useCompile } from '../../hooks';

export const useFilterableFields = (collectionName: string) => {
  const { getCollectionFields, getInterface } = useCollectionManager();
  const fields = getCollectionFields(collectionName);
  return fields?.filter?.((field) => {
    if (!field.interface) {
      return false;
    }
    const fieldInterface = getInterface(field.interface);
    if (!fieldInterface.filterable) {
      return false;
    }
    return true;
  });
};

export const FilterActionDesigner = (props) => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { dn } = useDesignable();
  const { name } = useCollection();
  const fields = useFilterableFields(name);
  const compile = useCompile();
  const { t } = useTranslation();
  const nonfilterable = fieldSchema?.['x-component-props']?.nonfilterable || [];
  return (
    <GeneralSchemaDesigner {...props} disableInitializer>
      <SchemaSettings.ItemGroup title={t('Filterable fields')}>
        {fields.map((field) => {
          const checked = !nonfilterable.includes(field.name);
          return (
            <SchemaSettings.SwitchItem
              checked={checked}
              title={compile(field?.uiSchema?.title)}
              onChange={(value) => {
                fieldSchema['x-component-props'] = fieldSchema?.['x-component-props'] || {};
                const nonfilterable = fieldSchema?.['x-component-props']?.nonfilterable || [];
                if (!value) {
                  nonfilterable.push(field.name);
                } else {
                  const index = nonfilterable.indexOf(field.name);
                  nonfilterable.splice(index, 1);
                }
                fieldSchema['x-component-props'].nonfilterable = nonfilterable;
                dn.emit('patch', {
                  schema: {
                    ['x-uid']: fieldSchema['x-uid'],
                    'x-component-props': {
                      ...fieldSchema['x-component-props'],
                    },
                  },
                });
                dn.refresh();
              }}
            />
          );
        })}
      </SchemaSettings.ItemGroup>
      <SchemaSettings.Divider />
      <SchemaSettings.ModalItem
        title={t('Edit button')}
        schema={
          {
            type: 'object',
            title: t('Edit button'),
            properties: {
              title: {
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                title: t('Button title'),
                default: fieldSchema.title,
                'x-component-props': {},
              },
              icon: {
                'x-decorator': 'FormItem',
                'x-component': 'IconPicker',
                title: t('Button icon'),
                default: fieldSchema?.['x-component-props']?.icon,
                'x-component-props': {},
              },
            },
          } as ISchema
        }
        onSubmit={({ title, icon }) => {
          if (title) {
            fieldSchema.title = title;
            field.title = title;
            field.componentProps.icon = icon;
            fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
            fieldSchema['x-component-props'].icon = icon;
            dn.emit('patch', {
              schema: {
                ['x-uid']: fieldSchema['x-uid'],
                title,
                'x-component-props': {
                  ...fieldSchema['x-component-props'],
                },
              },
            });
            dn.refresh();
          }
        }}
      />
      <SchemaSettings.Divider />
      <SchemaSettings.Remove
        removeParentsIfNoChildren
        breakRemoveOn={(s) => {
          return s['x-component'] === 'Space' || s['x-component'] === 'ActionBar';
        }}
      />
    </GeneralSchemaDesigner>
  );
};
