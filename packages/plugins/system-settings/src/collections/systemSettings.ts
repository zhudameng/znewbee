import { defineCollection } from '@znewbee/database';

export default defineCollection({
  name: 'systemSettings',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'boolean',
      name: 'showLogoOnly',
    },
    {
      type: 'boolean',
      name: 'allowSignUp',
      defaultValue: true,
    },
    {
      type: 'belongsTo',
      name: 'logo',
      target: 'attachments',
    },
    {
      type: 'string',
      name: 'appLang',
    },
  ],
});

