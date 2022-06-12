function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { TableOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../schema-initializer';
export var ActionLogBlockInitializer = function ActionLogBlockInitializer(props) {
  var insert = props.insert;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/React.createElement(TableOutlined, null),
    onClick: function onClick(_ref) {
      var item = _ref.item;
      insert({
        type: 'void',
        'x-component': 'ActionLog',
        'x-component-props': {}
      });
    },
    items: [{
      type: 'item',
      name: 'ActionLog',
      title: t('Action Logs')
    }]
  }));
};