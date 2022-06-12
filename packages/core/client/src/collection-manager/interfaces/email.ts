import { defaultProps, operators } from './properties';
import { IField } from './types';

export const email: IField = {
  name: 'email',
  type: 'object',
  group: 'basic',
  order: 4,
  title: '{{t("Email")}}',
  sortable: true,
  default: {
    type: 'string',
    // name,
    uiSchema: {
      type: 'string',
      // title,
      'x-component': 'Input',
      'x-validator': 'email',
    },
  },
  properties: {
    ...defaultProps,
  },
  filterable: {
    operators: operators.string,
  },
};
