import { CollectionOptions } from '@znewbee/database';

export default {
  name: 'fields',
  autoGenId: false,
  model: 'FieldModel',
  timestamps: false,
  sortable: {
    name: 'sort',
    scopeKey: 'parentKey',
  },
  indexes: [
    {
      type: 'UNIQUE',
      fields: ['collectionName', 'name'],
    },
  ],
  fields: [
    {
      type: 'uid',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'uid',
      name: 'name',
      prefix: 'f_',
    },
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'string',
      name: 'interface',
      allowNull: true,
    },
    {
      type: 'belongsTo',
      name: 'collection',
      target: 'collections',
      foreignKey: 'collectionName',
      targetKey: 'name',
      onDelete: 'CASCADE',
    },
    {
      type: 'hasMany',
      name: 'children',
      target: 'fields',
      sourceKey: 'key',
      foreignKey: 'parentKey',
    },
    {
      type: 'hasOne',
      name: 'reverseField',
      target: 'fields',
      sourceKey: 'key',
      foreignKey: 'reverseKey',
    },
    {
      type: 'belongsTo',
      name: 'uiSchema',
      target: 'uiSchemas',
      foreignKey: 'uiSchemaUid',
    },
    {
      type: 'json',
      name: 'options',
      defaultValue: {},
    },
  ],
} as CollectionOptions;
