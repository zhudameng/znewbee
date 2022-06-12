import { ISchema, Schema, useFieldSchema, useForm } from '@formily/react';
import { uid } from '@formily/shared';
import { useTranslation } from 'react-i18next';
import { SchemaInitializerItemOptions } from '../';
import { useCollection, useCollectionManager } from '../collection-manager';
import { useDesignable } from '../schema-component';
import { useSchemaTemplateManager } from '../schema-templates';

export const itemsMerge = (items1, items2) => {
  return items1;
};

export const gridRowColWrap = (schema: ISchema) => {
  return {
    type: 'void',
    'x-component': 'Grid.Row',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'Grid.Col',
        properties: {
          [schema.name || uid()]: schema,
        },
      },
    },
  };
};

export const removeTableColumn = (schema, cb) => {
  cb(schema.parent);
};

export const removeGridFormItem = (schema, cb) => {
  cb(schema, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid',
    },
  });
};

export const useRemoveGridFormItem = () => {
  const form = useForm();
  return (schema, cb) => {
    cb(schema, {
      removeParentsIfNoChildren: true,
      breakRemoveOn: {
        'x-component': 'Grid',
      },
    });
    delete form.values?.[schema.name];
  };
};

export const findTableColumn = (schema: Schema, key: string, action: string, deepth: number = 0) => {
  return schema.reduceProperties((buf, s) => {
    if (s[key] === action) {
      return s;
    }
    const c = s.reduceProperties((buf, s) => {
      if (s[key] === action) {
        return s;
      }
      return buf;
    });
    if (c) {
      return c;
    }
    return buf;
  });
};

export const useTableColumnInitializerFields = () => {
  const { name, fields = [] } = useCollection();
  const { getInterface } = useCollectionManager();
  return fields
    .filter((field) => field?.interface && field?.interface !== 'subTable')
    .map((field) => {
      const interfaceConfig = getInterface(field.interface);
      const schema = {
        name: field.name,
        'x-collection-field': `${name}.${field.name}`,
        'x-component': 'CollectionField',
        'x-read-pretty': true,
        'x-component-props': {},
      };
      // interfaceConfig?.schemaInitialize?.(schema, { field, readPretty: true, block: 'Table' });
      return {
        type: 'item',
        title: field?.uiSchema?.title || field.name,
        component: 'TableCollectionFieldInitializer',
        find: findTableColumn,
        remove: removeTableColumn,
        schemaInitialize: (s) => {
          interfaceConfig?.schemaInitialize?.(s, { field, readPretty: true, block: 'Table' });
        },
        field,
        schema,
      } as SchemaInitializerItemOptions;
    });
};

export const useFormItemInitializerFields = (options?: any) => {
  const { name, fields } = useCollection();
  const { getInterface } = useCollectionManager();
  const form = useForm();
  const { readPretty = form.readPretty, block = 'Form' } = options || {};

  return fields
    ?.filter((field) => field?.interface)
    ?.map((field) => {
      const interfaceConfig = getInterface(field.interface);
      const schema = {
        type: 'string',
        name: field.name,
        // title: field?.uiSchema?.title || field.name,
        'x-designer': 'FormItem.Designer',
        'x-component': 'CollectionField',
        'x-decorator': 'FormItem',
        'x-collection-field': `${name}.${field.name}`,
      };
      // interfaceConfig?.schemaInitialize?.(schema, { field, block: 'Form', readPretty: form.readPretty });
      return {
        type: 'item',
        title: field?.uiSchema?.title || field.name,
        component: 'CollectionFieldInitializer',
        remove: removeGridFormItem,
        schemaInitialize: (s) => {
          interfaceConfig?.schemaInitialize?.(s, { field, block, readPretty });
        },
        schema,
      } as SchemaInitializerItemOptions;
    });
};

export const useCustomFormItemInitializerFields = (options?: any) => {
  const { name, fields } = useCollection();
  const { getInterface } = useCollectionManager();
  const form = useForm();
  const { readPretty = form.readPretty, block = 'Form' } = options || {};
  const remove = useRemoveGridFormItem();
  return fields
    ?.filter((field) => {
      return field?.interface && !field?.uiSchema?.['x-read-pretty'];
    })
    ?.map((field) => {
      const interfaceConfig = getInterface(field.interface);
      const schema = {
        type: 'string',
        name: field.name,
        title: field?.uiSchema?.title || field.name,
        'x-designer': 'FormItem.Designer',
        'x-component': 'AssignedField',
        'x-decorator': 'FormItem',
        'x-collection-field': `${name}.${field.name}`,
      };
      return {
        type: 'item',
        title: field?.uiSchema?.title || field.name,
        component: 'CollectionFieldInitializer',
        remove: remove,
        schemaInitialize: (s) => {
          interfaceConfig?.schemaInitialize?.(s, { field, block, readPretty });
        },
        schema,
      } as SchemaInitializerItemOptions;
    });
};

const findSchema = (schema: Schema, key: string, action: string) => {
  return schema.reduceProperties((buf, s) => {
    if (s[key] === action) {
      return s;
    }
    const c = findSchema(s, key, action);
    if (c) {
      return c;
    }
    return buf;
  });
};

const removeSchema = (schema, cb) => {
  return cb(schema);
};

export const useCurrentSchema = (action: string, key: string, find = findSchema, rm = removeSchema) => {
  const fieldSchema = useFieldSchema();
  const { remove } = useDesignable();
  const schema = find(fieldSchema, key, action);
  return {
    schema,
    exists: !!schema,
    remove() {
      schema && rm(schema, remove);
    },
  };
};

export const useRecordCollectionDataSourceItems = (componentName) => {
  const { t } = useTranslation();
  const collection = useCollection();
  const { getTemplatesByCollection } = useSchemaTemplateManager();
  const templates = getTemplatesByCollection(collection.name).filter((template) => {
    return componentName && template.componentName === componentName;
  });
  if (!templates.length) {
    return [];
  }
  const index = 0;
  return [
    {
      type: 'item',
      name: collection.name,
      title: t('Blank block'),
    },
    {
      type: 'divider',
    },
    {
      key: `${componentName}_table_subMenu_${index}_copy`,
      type: 'subMenu',
      name: 'copy',
      title: t('Duplicate template'),
      children: templates.map((template) => {
        const templateName =
          template?.componentName === 'ReadPrettyFormItem' ? `${template?.name} ${t('(Fields only)')}` : template?.name;
        return {
          type: 'item',
          mode: 'copy',
          name: collection.name,
          template,
          title: templateName || t('Untitled'),
        };
      }),
    },
    {
      key: `${componentName}_table_subMenu_${index}_ref`,
      type: 'subMenu',
      name: 'ref',
      title: t('Reference template'),
      children: templates.map((template) => {
        const templateName =
          template?.componentName === 'ReadPrettyFormItem' ? `${template?.name} ${t('(Fields only)')}` : template?.name;
        return {
          type: 'item',
          mode: 'reference',
          name: collection.name,
          template,
          title: templateName || t('Untitled'),
        };
      }),
    },
  ];
};

export const useCollectionDataSourceItems = (componentName) => {
  const { t } = useTranslation();
  const { collections } = useCollectionManager();
  const { getTemplatesByCollection } = useSchemaTemplateManager();
  return [
    {
      key: 'tableBlock',
      type: 'itemGroup',
      title: t('Select collection'),
      children: collections
        ?.filter((item) => !item.inherit)
        ?.map((item, index) => {
          const templates = getTemplatesByCollection(item.name).filter((template) => {
            return componentName && template.componentName === componentName;
          });
          if (!templates.length) {
            return {
              type: 'item',
              name: item.name,
              title: item.title,
            };
          }
          return {
            key: `${componentName}_table_subMenu_${index}`,
            type: 'subMenu',
            name: `${item.name}_${index}`,
            title: item.title,
            children: [
              {
                type: 'item',
                name: item.name,
                title: t('Blank block'),
              },
              {
                type: 'divider',
              },
              {
                key: `${componentName}_table_subMenu_${index}_copy`,
                type: 'subMenu',
                name: 'copy',
                title: t('Duplicate template'),
                children: templates.map((template) => {
                  const templateName =
                    template?.componentName === 'FormItem' ? `${template?.name} ${t('(Fields only)')}` : template?.name;
                  return {
                    type: 'item',
                    mode: 'copy',
                    name: item.name,
                    template,
                    title: templateName || t('Untitled'),
                  };
                }),
              },
              {
                key: `${componentName}_table_subMenu_${index}_ref`,
                type: 'subMenu',
                name: 'ref',
                title: t('Reference template'),
                children: templates.map((template) => {
                  const templateName =
                    template?.componentName === 'FormItem' ? `${template?.name} ${t('(Fields only)')}` : template?.name;
                  return {
                    type: 'item',
                    mode: 'reference',
                    name: item.name,
                    template,
                    title: templateName || t('Untitled'),
                  };
                }),
              },
            ],
          };
        }),
    },
  ];
};

export const createDetailsBlockSchema = (options) => {
  const {
    formItemInitializers = 'ReadPrettyFormItemInitializers',
    actionInitializers = 'DetailsActionInitializers',
    collection,
    association,
    resource,
    template,
    ...others
  } = options;
  const resourceName = resource || association || collection;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resourceName}:get`,
    'x-decorator': 'DetailsBlockProvider',
    'x-decorator-props': {
      resource: resourceName,
      collection,
      association,
      readPretty: true,
      action: 'list',
      params: {
        pageSize: 1,
      },
      // useParams: '{{ useParamsFromRecord }}',
      ...others,
    },
    'x-designer': 'DetailsDesigner',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'FormV2',
        'x-read-pretty': true,
        'x-component-props': {
          useProps: '{{ useDetailsBlockProps }}',
        },
        properties: {
          actions: {
            type: 'void',
            'x-initializer': actionInitializers,
            'x-component': 'ActionBar',
            'x-component-props': {
              style: {
                marginBottom: 24,
              },
            },
            properties: {},
          },
          grid: template || {
            type: 'void',
            'x-component': 'Grid',
            'x-initializer': formItemInitializers,
            properties: {},
          },
          pagination: {
            type: 'void',
            'x-component': 'Pagination',
            'x-component-props': {
              useProps: '{{ useDetailsPaginationProps }}',
            },
          },
        },
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createFormBlockSchema = (options) => {
  const {
    formItemInitializers = 'FormItemInitializers',
    actionInitializers = 'FormActionInitializers',
    collection,
    resource,
    association,
    action,
    template,
    ...others
  } = options;
  const resourceName = resource || association || collection;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action-props': {
      skipScopeCheck: !action,
    },
    'x-acl-action': action ? `${resourceName}:update` : `${resourceName}:create`,
    'x-decorator': 'FormBlockProvider',
    'x-decorator-props': {
      ...others,
      action,
      resource: resourceName,
      collection,
      association,
      // action: 'get',
      // useParams: '{{ useParamsFromRecord }}',
    },
    'x-designer': 'FormV2.Designer',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'FormV2',
        'x-component-props': {
          useProps: '{{ useFormBlockProps }}',
        },
        properties: {
          grid: template || {
            type: 'void',
            'x-component': 'Grid',
            'x-initializer': formItemInitializers,
            properties: {},
          },
          actions: {
            type: 'void',
            'x-initializer': actionInitializers,
            'x-component': 'ActionBar',
            'x-component-props': {
              layout: 'one-column',
              style: {
                marginTop: 24,
              },
            },
            properties: {},
          },
        },
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createReadPrettyFormBlockSchema = (options) => {
  const {
    formItemInitializers = 'ReadPrettyFormItemInitializers',
    actionInitializers = 'ReadPrettyFormActionInitializers',
    collection,
    association,
    resource,
    template,
    ...others
  } = options;
  const resourceName = resource || association || collection;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resourceName}:get`,
    'x-decorator': 'FormBlockProvider',
    'x-decorator-props': {
      resource: resourceName,
      collection,
      association,
      readPretty: true,
      action: 'get',
      useParams: '{{ useParamsFromRecord }}',
      ...others,
    },
    'x-designer': 'FormV2.ReadPrettyDesigner',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'FormV2',
        'x-read-pretty': true,
        'x-component-props': {
          useProps: '{{ useFormBlockProps }}',
        },
        properties: {
          actions: {
            type: 'void',
            'x-initializer': actionInitializers,
            'x-component': 'ActionBar',
            'x-component-props': {
              style: {
                marginBottom: 24,
              },
            },
            properties: {},
          },
          grid: template || {
            type: 'void',
            'x-component': 'Grid',
            'x-initializer': formItemInitializers,
            properties: {},
          },
        },
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createTableBlockSchema = (options) => {
  const { collection, resource, rowKey, ...others } = options;
  const schema: ISchema = {
    type: 'void',
    'x-decorator': 'TableBlockProvider',
    'x-acl-action': `${resource || collection}:list`,
    'x-decorator-props': {
      collection,
      resource: resource || collection,
      action: 'list',
      params: {
        pageSize: 20,
      },
      rowKey,
      showIndex: true,
      dragSort: false,
      ...others,
    },
    'x-designer': 'TableBlockDesigner',
    'x-component': 'CardItem',
    properties: {
      actions: {
        type: 'void',
        'x-initializer': 'TableActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16,
          },
        },
        properties: {},
      },
      [uid()]: {
        type: 'array',
        'x-initializer': 'TableColumnInitializers',
        'x-component': 'TableV2',
        'x-component-props': {
          rowKey: 'id',
          rowSelection: {
            type: 'checkbox',
          },
          useProps: '{{ useTableBlockProps }}',
        },
        properties: {
          actions: {
            type: 'void',
            title: '{{ t("Actions") }}',
            'x-action-column': 'actions',
            'x-decorator': 'TableV2.Column.ActionBar',
            'x-component': 'TableV2.Column',
            'x-designer': 'TableV2.ActionColumnDesigner',
            'x-initializer': 'TableActionColumnInitializers',
            properties: {
              actions: {
                type: 'void',
                'x-decorator': 'DndContext',
                'x-component': 'Space',
                'x-component-props': {
                  split: '|',
                },
                properties: {},
              },
            },
          },
        },
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createTableSelectorSchema = (options) => {
  const { collection, resource, rowKey, ...others } = options;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resource || collection}:list`,
    'x-decorator': 'TableSelectorProvider',
    'x-decorator-props': {
      collection,
      resource: resource || collection,
      action: 'list',
      params: {
        pageSize: 20,
      },
      rowKey,
      ...others,
    },
    'x-designer': 'TableSelectorDesigner',
    'x-component': 'BlockItem',
    properties: {
      actions: {
        type: 'void',
        'x-initializer': 'TableActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16,
          },
        },
        properties: {},
      },
      value: {
        type: 'array',
        'x-initializer': 'TableColumnInitializers',
        'x-component': 'TableV2.Selector',
        'x-component-props': {
          rowSelection: {
            type: 'checkbox',
          },
          useProps: '{{ useTableSelectorProps }}',
        },
        properties: {},
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createCalendarBlockSchema = (options) => {
  const { collection, resource, fieldNames, ...others } = options;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resource || collection}:list`,
    'x-decorator': 'CalendarBlockProvider',
    'x-decorator-props': {
      collection: collection,
      resource: resource || collection,
      action: 'list',
      fieldNames: {
        id: 'id',
        ...fieldNames,
      },
      params: {
        paginate: false,
      },
      ...others,
    },
    'x-designer': 'CalendarV2.Designer',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'CalendarV2',
        'x-component-props': {
          useProps: '{{ useCalendarBlockProps }}',
        },
        properties: {
          toolBar: {
            type: 'void',
            'x-component': 'CalendarV2.ActionBar',
            'x-component-props': {
              style: {
                marginBottom: 24,
              },
            },
            'x-initializer': 'CalendarActionInitializers',
            properties: {},
          },
          event: {
            type: 'void',
            'x-component': 'CalendarV2.Event',
            properties: {
              drawer: {
                type: 'void',
                'x-component': 'Action.Drawer',
                'x-component-props': {
                  className: 'nb-action-popup',
                },
                title: '{{ t("View record") }}',
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
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const createKanbanBlockSchema = (options) => {
  const { collection, resource, groupField, ...others } = options;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resource || collection}:list`,
    'x-decorator': 'KanbanBlockProvider',
    'x-decorator-props': {
      collection: collection,
      resource: resource || collection,
      action: 'list',
      groupField,
      params: {
        paginate: false,
      },
      ...others,
    },
    'x-designer': 'KanbanV2.Designer',
    'x-component': 'CardItem',
    properties: {
      actions: {
        type: 'void',
        'x-initializer': 'KanbanActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16,
          },
        },
        properties: {},
      },
      [uid()]: {
        type: 'array',
        'x-component': 'KanbanV2',
        'x-component-props': {
          useProps: '{{ useKanbanBlockProps }}',
        },
        properties: {
          card: {
            type: 'void',
            'x-read-pretty': true,
            'x-decorator': 'BlockItem',
            'x-component': 'KanbanV2.Card',
            'x-designer': 'KanbanV2.Card.Designer',
            properties: {
              grid: {
                type: 'void',
                'x-component': 'Grid',
                'x-component-props': { dndContext: false },
              },
            },
          },
          cardViewer: {
            type: 'void',
            title: '{{ t("View") }}',
            'x-designer': 'Action.Designer',
            'x-component': 'KanbanV2.CardViewer',
            'x-component-props': {
              openMode: 'drawer',
            },
            properties: {
              drawer: {
                type: 'void',
                title: '{{ t("View record") }}',
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
      },
    },
  };
  return schema;
};
