"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableActionColumnInitializers = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _apiClient = require("../../api-client");

var _schemaComponent = require("../../schema-component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableActionColumnInitializers = function TableActionColumnInitializers(props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  var api = (0, _apiClient.useAPIClient)();

  var _useDesignable = (0, _schemaComponent.useDesignable)(),
      refresh = _useDesignable.refresh;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react2.default.createElement(_.SchemaInitializer.Button, {
    insertPosition: 'beforeEnd',
    insert: function insert(schema) {
      var spaceSchema = fieldSchema.reduceProperties(function (buf, schema) {
        if (schema['x-component'] === 'Space') {
          return schema;
        }

        return buf;
      }, null);

      if (!spaceSchema) {
        return;
      }

      var dn = (0, _schemaComponent.createDesignable)({
        t: t,
        api: api,
        refresh: refresh,
        current: spaceSchema
      });
      dn.loadAPIClientEvents();
      dn.insertBeforeEnd(schema);
    },
    items: [{
      type: 'itemGroup',
      title: t('Enable actions'),
      children: [{
        type: 'item',
        title: t('View'),
        component: 'ViewActionInitializer',
        schema: {
          'x-component': 'Action.Link',
          'x-action': 'view',
          'x-decorator': 'ACLActionProvider'
        }
      }, {
        type: 'item',
        title: t('Edit'),
        component: 'UpdateActionInitializer',
        schema: {
          'x-component': 'Action.Link',
          'x-action': 'update',
          'x-decorator': 'ACLActionProvider'
        }
      }, {
        type: 'item',
        title: t('Delete'),
        component: 'DestroyActionInitializer',
        schema: {
          'x-component': 'Action.Link',
          'x-action': 'destroy',
          'x-decorator': 'ACLActionProvider'
        }
      }]
    }, {
      type: 'divider'
    }, {
      type: 'subMenu',
      title: '{{t("Customize")}}',
      children: [{
        type: 'item',
        title: '{{t("Popup")}}',
        component: 'CustomizeActionInitializer',
        schema: {
          type: 'void',
          title: '{{ t("Popup") }}',
          'x-action': 'customize:popup',
          'x-designer': 'Action.Designer',
          'x-component': 'Action.Link',
          'x-component-props': {
            openMode: 'drawer'
          },
          properties: {
            drawer: {
              type: 'void',
              title: '{{ t("Popup") }}',
              'x-component': 'Action.Container',
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
            }
          }
        }
      }, {
        type: 'item',
        title: '{{t("Update record")}}',
        component: 'CustomizeActionInitializer',
        schema: {
          title: '{{ t("Update record") }}',
          'x-component': 'Action.Link',
          'x-action': 'customize:update',
          'x-designer': 'Action.Designer',
          'x-action-settings': {
            assignedValues: {},
            onSuccess: {
              manualClose: true,
              redirecting: false,
              successMessage: '{{t("Updated successfully")}}'
            }
          },
          'x-component-props': {
            useProps: '{{ useCustomizeUpdateActionProps }}'
          }
        }
      }]
    }],
    component: /*#__PURE__*/_react2.default.createElement(_icons.MenuOutlined, {
      style: {
        cursor: 'pointer'
      }
    })
  });
};

exports.TableActionColumnInitializers = TableActionColumnInitializers;