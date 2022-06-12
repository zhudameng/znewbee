"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.recordPickerViewer = exports.recordPickerSelector = exports.operators = exports.defaultProps = exports.dateTimeProps = exports.dataSource = void 0;

var _operators = _interopRequireWildcard(require("./operators"));

exports.operators = _operators;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var type = {
  type: 'string',
  title: '{{t("Storage type")}}',
  required: true,
  'x-disabled': true,
  'x-decorator': 'FormItem',
  'x-component': 'Select',
  enum: [{
    label: 'Boolean',
    value: 'boolean'
  }, {
    label: 'String',
    value: 'string'
  }, {
    label: 'Text',
    value: 'text'
  }, {
    label: 'Integer',
    value: 'integer'
  }, {
    label: 'Float',
    value: 'float'
  }, {
    label: 'Decimal',
    value: 'decimal'
  }, {
    label: 'Date',
    value: 'date'
  }, {
    label: 'DateOnly',
    value: 'dateonly'
  }, {
    label: 'Time',
    value: 'time'
  }, {
    label: 'Virtual',
    value: 'virtual'
  }, {
    label: 'JSON',
    value: 'json'
  }, {
    label: 'Password',
    value: 'password'
  }, {
    label: 'One to one',
    value: 'hasOne'
  }, {
    label: 'One to many',
    value: 'hasMany'
  }, {
    label: 'Many to one',
    value: 'belongsTo'
  }, {
    label: 'Many to many',
    value: 'belongsToMany'
  }]
};
exports.type = type;
var dateTimeProps = {
  'uiSchema.x-component-props.dateFormat': {
    type: 'string',
    title: '{{t("Date format")}}',
    'x-component': 'Radio.Group',
    'x-decorator': 'FormItem',
    default: 'YYYY-MM-DD',
    enum: [{
      label: '{{t("Year/Month/Day")}}',
      value: 'YYYY/MM/DD'
    }, {
      label: '{{t("Year-Month-Day")}}',
      value: 'YYYY-MM-DD'
    }, {
      label: '{{t("Day/Month/Year")}}',
      value: 'DD/MM/YYYY'
    }]
  },
  'uiSchema.x-component-props.showTime': {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Checkbox',
    'x-content': '{{t("Show time")}}',
    'x-reactions': ["{{(field) => {\n        field.query('..[].timeFormat').take(f => {\n          f.display = field.value ? 'visible' : 'none';\n        });\n      }}}"]
  },
  'uiSchema.x-component-props.timeFormat': {
    type: 'string',
    title: '{{t("Time format")}}',
    'x-component': 'Radio.Group',
    'x-decorator': 'FormItem',
    default: 'HH:mm:ss',
    enum: [{
      label: '{{t("12 hour")}}',
      value: 'hh:mm:ss a'
    }, {
      label: '{{t("24 hour")}}',
      value: 'HH:mm:ss'
    }]
  }
};
exports.dateTimeProps = dateTimeProps;
var dataSource = {
  type: 'array',
  title: '{{t("Options")}}',
  'x-decorator': 'FormItem',
  'x-component': 'ArrayTable',
  'x-component-props': {
    pagination: {
      pageSize: 1000
    } // scroll: { x: '100%' },

  },
  items: {
    type: 'object',
    properties: {
      column1: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          width: 50,
          title: '',
          align: 'center'
        },
        properties: {
          sort: {
            type: 'void',
            'x-component': 'ArrayTable.SortHandle'
          }
        }
      },
      column2: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: '{{t("Option value")}}'
        },
        'x-hidden': true,
        properties: {
          value: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          }
        }
      },
      column3: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: '{{t("Option label")}}'
        },
        properties: {
          label: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          }
        }
      },
      column4: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: '{{t("Color")}}'
        },
        properties: {
          color: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'ColorSelect'
          }
        }
      },
      column5: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: '',
          dataIndex: 'operations',
          fixed: 'right'
        },
        properties: {
          item: {
            type: 'void',
            'x-component': 'FormItem',
            properties: {
              remove: {
                type: 'void',
                'x-component': 'ArrayTable.Remove'
              }
            }
          }
        }
      }
    }
  },
  properties: {
    add: {
      type: 'void',
      'x-component': 'ArrayTable.Addition',
      'x-component-props': {
        randomValue: true
      },
      title: "{{t('Add option')}}"
    }
  }
};
exports.dataSource = dataSource;
var defaultProps = {
  'uiSchema.title': {
    type: 'string',
    title: '{{t("Field display name")}}',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  name: {
    type: 'string',
    title: '{{t("Field name")}}',
    required: true,
    'x-disabled': '{{ !createOnly }}',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    description: "{{t('Randomly generated and can be modified. Support letters, numbers and underscores, must start with an letter.')}}"
  },
  type: type
};
exports.defaultProps = defaultProps;
var recordPickerSelector = {
  type: 'void',
  title: '{{ t("Select record") }}',
  'x-component': 'RecordPicker.Selector',
  'x-component-props': {
    className: 'nb-record-picker-selector'
  },
  properties: {
    grid: {
      type: 'void',
      'x-component': 'Grid',
      'x-initializer': 'TableSelectorInitializers',
      properties: {}
    },
    footer: {
      'x-component': 'Action.Container.Footer',
      'x-component-props': {},
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {},
          properties: {
            submit: {
              title: '{{ t("Submit") }}',
              'x-action': 'submit',
              'x-component': 'Action',
              'x-designer': 'Action.Designer',
              'x-component-props': {
                type: 'primary',
                htmlType: 'submit',
                useProps: '{{ usePickActionProps }}'
              }
            }
          }
        }
      }
    }
  }
};
exports.recordPickerSelector = recordPickerSelector;
var recordPickerViewer = {
  type: 'void',
  title: '{{ t("View record") }}',
  'x-component': 'RecordPicker.Viewer',
  'x-component-props': {
    className: 'nb-action-popup'
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
              properties: {}
            }
          }
        }
      }
    }
  }
};
exports.recordPickerViewer = recordPickerViewer;