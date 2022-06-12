function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../SchemaInitializer';
import { itemsMerge, useTableColumnInitializerFields } from '../utils'; // 表格列配置

export var TableColumnInitializers = function TableColumnInitializers(props) {
  var _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    insertPosition: 'beforeEnd',
    icon: 'SettingOutlined',
    wrap: function wrap(s) {
      if (s['x-action-column']) {
        return s;
      }

      return {
        type: 'void',
        'x-decorator': 'TableV2.Column.Decorator',
        'x-designer': 'TableV2.Column.Designer',
        'x-component': 'TableV2.Column',
        properties: _defineProperty({}, s.name, _objectSpread({}, s))
      };
    },
    items: itemsMerge([{
      type: 'itemGroup',
      title: t('Display fields'),
      children: useTableColumnInitializerFields()
    }, {
      type: 'divider'
    }, {
      type: 'item',
      title: t('Action column'),
      component: 'TableActionColumnInitializer'
    }], items)
  }, t('Configure columns'));
};