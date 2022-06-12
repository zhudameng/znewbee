function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { TreeSelect } from '@formily/antd';
import { onFieldChange } from '@formily/core';
import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { findByUid } from '.';
import { createDesignable } from '../..';
import { GeneralSchemaDesigner, SchemaSettings, useAPIClient, useDesignable } from '../../../';

var toItems = function toItems() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var items = [];

  for (var key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      var element = properties[key];
      var item = {
        label: element.title,
        value: "".concat(element['x-uid'], "||").concat(element['x-component'])
      };

      if (element.properties) {
        var children = toItems(element.properties);

        if (children === null || children === void 0 ? void 0 : children.length) {
          item['children'] = children;
        }
      }

      items.push(item);
    }
  }

  return items;
};

var findMenuSchema = function findMenuSchema(fieldSchema) {
  var parent = fieldSchema.parent;

  while (parent) {
    if (parent['x-component'] === 'Menu') {
      return parent;
    }

    parent = parent.parent;
  }
};

var InsertMenuItems = function InsertMenuItems(props) {
  var eventKey = props.eventKey,
      title = props.title,
      insertPosition = props.insertPosition;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var fieldSchema = useFieldSchema();
  var isSubMenu = fieldSchema['x-component'] === 'Menu.SubMenu';

  if (!isSubMenu && insertPosition === 'beforeEnd') {
    return null;
  }

  return /*#__PURE__*/React.createElement(SchemaSettings.SubMenu, {
    eventKey: eventKey,
    title: title
  }, /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    eventKey: "".concat(insertPosition, "group"),
    title: t('Group'),
    schema: {
      type: 'object',
      title: t('Add group'),
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: t('Menu item title'),
          required: true,
          'x-component-props': {} // description: `原字段标题：${collectionField?.uiSchema?.title}`,

        },
        icon: {
          title: t('Icon'),
          'x-component': 'IconPicker',
          'x-decorator': 'FormItem'
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title,
          icon = _ref.icon;
      dn.insertAdjacent(insertPosition, {
        type: 'void',
        title: title,
        'x-component': 'Menu.SubMenu',
        'x-decorator': 'ACLMenuItemProvider',
        'x-component-props': {
          icon: icon
        },
        'x-server-hooks': [{
          type: 'onSelfCreate',
          method: 'bindMenuToRole'
        }]
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    eventKey: "".concat(insertPosition, "page"),
    title: t('Page'),
    schema: {
      type: 'object',
      title: t('Add page'),
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: t('Menu item title'),
          required: true,
          'x-component-props': {}
        },
        icon: {
          title: t('Icon'),
          'x-component': 'IconPicker',
          'x-decorator': 'FormItem'
        }
      }
    },
    onSubmit: function onSubmit(_ref2) {
      var title = _ref2.title,
          icon = _ref2.icon;
      dn.insertAdjacent(insertPosition, {
        type: 'void',
        title: title,
        'x-component': 'Menu.Item',
        'x-decorator': 'ACLMenuItemProvider',
        'x-component-props': {
          icon: icon
        },
        'x-server-hooks': [{
          type: 'onSelfCreate',
          method: 'bindMenuToRole'
        }],
        properties: {
          page: {
            type: 'void',
            'x-component': 'Page',
            'x-async': true,
            properties: {
              grid: {
                type: 'void',
                'x-component': 'Grid',
                'x-initializer': 'BlockInitializers',
                properties: {}
              }
            }
          }
        }
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    eventKey: "".concat(insertPosition, "link"),
    title: t('Link'),
    schema: {
      type: 'object',
      title: t('Add link'),
      properties: {
        title: {
          title: t('Menu item title'),
          required: true,
          'x-component': 'Input',
          'x-decorator': 'FormItem'
        },
        icon: {
          title: t('Icon'),
          'x-component': 'IconPicker',
          'x-decorator': 'FormItem'
        },
        href: {
          title: t('Link'),
          'x-component': 'Input',
          'x-decorator': 'FormItem'
        }
      }
    },
    onSubmit: function onSubmit(_ref3) {
      var title = _ref3.title,
          icon = _ref3.icon,
          href = _ref3.href;
      dn.insertAdjacent(insertPosition, {
        type: 'void',
        title: title,
        'x-component': 'Menu.URL',
        'x-decorator': 'ACLMenuItemProvider',
        'x-component-props': {
          icon: icon,
          href: href
        },
        'x-server-hooks': [{
          type: 'onSelfCreate',
          method: 'bindMenuToRole'
        }]
      });
    }
  }));
};

export var MenuDesigner = function MenuDesigner() {
  var field = useField();
  var fieldSchema = useFieldSchema();
  var api = useAPIClient();

  var _useDesignable2 = useDesignable(),
      dn = _useDesignable2.dn,
      refresh = _useDesignable2.refresh;

  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var menuSchema = findMenuSchema(fieldSchema);
  var items = toItems(menuSchema === null || menuSchema === void 0 ? void 0 : menuSchema.properties);

  var effects = function effects(form) {
    onFieldChange('target', function (field) {
      var _field$value, _field$value$split;

      var _ref4 = (field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : (_field$value$split = _field$value.split) === null || _field$value$split === void 0 ? void 0 : _field$value$split.call(_field$value, '||')) || [],
          _ref5 = _slicedToArray(_ref4, 2),
          component = _ref5[1];

      field.query('position').take(function (f) {
        f.dataSource = component === 'Menu.SubMenu' ? [{
          label: t('Before'),
          value: 'beforeBegin'
        }, {
          label: t('After'),
          value: 'afterEnd'
        }, {
          label: t('Inner'),
          value: 'beforeEnd'
        }] : [{
          label: t('Before'),
          value: 'beforeBegin'
        }, {
          label: t('After'),
          value: 'afterEnd'
        }];
      });
    });
  };

  var schema = {
    type: 'object',
    title: t('Edit menu item'),
    properties: {
      title: {
        title: t('Menu item title'),
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {}
      },
      icon: {
        title: t('Menu item icon'),
        'x-component': 'IconPicker',
        'x-decorator': 'FormItem'
      }
    }
  };
  var initialValues = {
    title: field.title,
    icon: field.componentProps.icon
  };

  if (fieldSchema['x-component'] === 'Menu.URL') {
    schema.properties['href'] = {
      title: t('Link'),
      'x-component': 'Input',
      'x-decorator': 'FormItem'
    };
    initialValues['href'] = field.componentProps.href;
  }

  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, null, /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit'),
    schema: schema,
    initialValues: initialValues,
    onSubmit: function onSubmit(_ref6) {
      var title = _ref6.title,
          icon = _ref6.icon,
          href = _ref6.href;

      var schema = _defineProperty({}, 'x-uid', fieldSchema['x-uid']);

      if (title) {
        fieldSchema.title = title;
        field.title = title;
        schema['title'] = title;
        refresh();
      }

      field.componentProps.icon = icon;
      field.componentProps.href = href;
      schema['x-component-props'] = {
        icon: icon,
        href: href
      };
      fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
      fieldSchema['x-component-props']['icon'] = icon;
      fieldSchema['x-component-props']['href'] = href;
      dn.emit('patch', {
        schema: schema
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Move to'),
    components: {
      TreeSelect: TreeSelect
    },
    effects: effects,
    schema: {
      type: 'object',
      title: t('Move to'),
      properties: {
        target: {
          title: t('Target'),
          enum: items,
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'TreeSelect',
          'x-component-props': {}
        },
        position: {
          title: t('Position'),
          required: true,
          enum: [{
            label: t('Before'),
            value: 'beforeBegin'
          }, {
            label: t('After'),
            value: 'afterEnd'
          }],
          default: 'afterEnd',
          'x-component': 'Radio.Group',
          'x-decorator': 'FormItem'
        }
      }
    },
    onSubmit: function onSubmit(_ref7) {
      var _target$split;

      var target = _ref7.target,
          position = _ref7.position;

      var _ref8 = (target === null || target === void 0 ? void 0 : (_target$split = target.split) === null || _target$split === void 0 ? void 0 : _target$split.call(target, '||')) || [],
          _ref9 = _slicedToArray(_ref8, 1),
          uid = _ref9[0];

      if (!uid) {
        return;
      }

      var current = findByUid(menuSchema, uid);
      var dn = createDesignable({
        t: t,
        api: api,
        refresh: refresh,
        current: current
      });
      dn.loadAPIClientEvents();
      dn.insertAdjacent(position, fieldSchema);
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(InsertMenuItems, {
    eventKey: 'insertbeforeBegin',
    title: t('Insert before'),
    insertPosition: 'beforeBegin'
  }), /*#__PURE__*/React.createElement(InsertMenuItems, {
    eventKey: 'insertafterEnd',
    title: t('Insert after'),
    insertPosition: 'afterEnd'
  }), /*#__PURE__*/React.createElement(InsertMenuItems, {
    eventKey: 'insertbeforeEnd',
    title: t('Insert inner'),
    insertPosition: 'beforeEnd'
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    confirm: {
      title: t('Delete menu item')
    }
  }));
};