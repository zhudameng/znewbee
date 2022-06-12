import { CollectionOptions } from '@znewbee/database';

export default {
  name: 'uiSchemas',
  title: '字段配置',
  autoGenId: false,
  timestamps: false,
  repository: 'UiSchemaRepository',
  model: 'UiSchemaModel',
  magicAttribute: 'schema',
  fields: [
    {
      type: 'uid',
      name: 'x-uid',
      primaryKey: true,
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'hasMany',
      name: 'serverHooks',
      target: 'uiSchemaServerHooks',
      foreignKey: 'uid',
    },
    {
      type: 'json',
      name: 'schema',
      defaultValue: {},
    },
  ],
} as CollectionOptions;
