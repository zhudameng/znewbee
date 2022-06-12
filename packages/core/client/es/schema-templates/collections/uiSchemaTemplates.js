export var uiSchemaTemplatesCollection = {
  name: 'uiSchemaTemplates',
  filterTargetKey: 'key',
  targetKey: 'key',
  fields: [{
    type: 'integer',
    name: 'name',
    interface: 'input',
    uiSchema: {
      title: '{{ t("Template name") }}',
      type: 'number',
      'x-component': 'Input',
      required: true
    }
  }]
};