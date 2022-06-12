import React from 'react';
import { ISchema } from '@formily/react';
import { Page, DocumentTitleProvider, SchemaComponent, SchemaComponentProvider } from '@znewbee/client';

const schema: ISchema = {
  type: 'object',
  properties: {
    page1: {
      type: 'void',
      'x-component': 'Page',
      title: 'Page Title',
      properties: {
        content: {
          type: 'void',
          'x-component': 'div',
          'x-content': 'Page Content',
        },
      },
    },
  },
};

export default () => {
  return (
    <SchemaComponentProvider components={{ Page }}>
      <DocumentTitleProvider addonAfter={'znewbee'}>
        <SchemaComponent schema={schema} />
      </DocumentTitleProvider>
    </SchemaComponentProvider>
  );
};
