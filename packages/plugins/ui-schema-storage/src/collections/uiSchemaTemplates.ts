import { defineCollection } from '@znewbee/database';

export default defineCollection({
  name: 'uiSchemaTemplates',
  autoGenId: false,
  fields: [
    {
      type: 'uid',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'string',
      name: 'componentName',
    },
    {
      type: 'string',
      name: 'associationName',
    },
    {
      type: 'belongsTo',
      name: 'uiSchema',
      target: 'uiSchemas',
      foreignKey: 'uid',
      onDelete: 'CASCADE',
    },
    {
      type: 'belongsTo',
      name: 'collection',
      target: 'collections',
      foreignKey: 'collectionName',
      targetKey: 'name',
    },
  ],
});
