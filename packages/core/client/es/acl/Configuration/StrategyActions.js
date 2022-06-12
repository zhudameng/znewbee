function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { connect, useField } from '@formily/react';
import { Checkbox, Select, Table, Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCompile } from '../..';
import { useAvailableActions } from './RoleTable';

var toScopes = function toScopes(value) {
  var _value$forEach;

  if (!value) {
    return {};
  }

  var scopes = {};
  value === null || value === void 0 ? void 0 : (_value$forEach = value.forEach) === null || _value$forEach === void 0 ? void 0 : _value$forEach.call(value, function (item) {
    var _item$split = item.split(':'),
        _item$split2 = _slicedToArray(_item$split, 2),
        name = _item$split2[0],
        scope = _item$split2[1];

    scopes[name] = scope || 'all';
  });
  return scopes;
};

var toFieldValue = function toFieldValue(scopes) {
  var values = [];

  for (var name in scopes) {
    if (Object.prototype.hasOwnProperty.call(scopes, name)) {
      var scope = scopes[name];

      if (scope === 'all') {
        values.push(name);
      } else {
        values.push("".concat(name, ":").concat(scope));
      }
    }
  }

  return values;
};

export var StrategyActions = connect(function (props) {
  var _onChange = props.onChange;
  var availableActions = useAvailableActions();
  var compile = useCompile();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var field = useField();
  var scopes = toScopes(field.value);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Table, {
    size: 'small',
    pagination: false,
    columns: [{
      dataIndex: 'displayName',
      title: t('Action display name'),
      render: function render(value) {
        return compile(value);
      }
    }, {
      dataIndex: 'onNewRecord',
      title: t('Action type'),
      render: function render(onNewRecord) {
        return onNewRecord ? /*#__PURE__*/React.createElement(Tag, {
          color: 'green'
        }, t('Action on new records')) : /*#__PURE__*/React.createElement(Tag, {
          color: 'geekblue'
        }, t('Action on existing records'));
      }
    }, {
      dataIndex: 'enabled',
      title: t('Allow'),
      render: function render(enabled, action) {
        return /*#__PURE__*/React.createElement(Checkbox, {
          checked: enabled,
          onChange: function onChange(e) {
            if (enabled) {
              delete scopes[action.name];
            } else {
              scopes[action.name] = 'all';
            }

            _onChange(toFieldValue(scopes));
          }
        });
      }
    }, {
      dataIndex: 'scope',
      title: t('Data scope'),
      render: function render(scope, action) {
        return !action.onNewRecord && /*#__PURE__*/React.createElement(Select, {
          size: 'small',
          value: scope,
          options: [{
            label: t('All records'),
            value: 'all'
          }, {
            label: t('Own records'),
            value: 'own'
          }],
          onChange: function onChange(value) {
            scopes[action.name] = value;

            _onChange(toFieldValue(scopes));
          }
        });
      }
    }],
    dataSource: availableActions === null || availableActions === void 0 ? void 0 : availableActions.map(function (item) {
      var scope = 'all';
      var enabled = false;

      if (scopes[item.name]) {
        enabled = true;
        scope = scopes[item.name];
      }

      return _objectSpread(_objectSpread({}, item), {}, {
        enabled: enabled,
        scope: scope
      });
    })
  }));
});