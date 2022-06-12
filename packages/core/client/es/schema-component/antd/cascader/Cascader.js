var _excluded = ["value", "onChange", "labelInValue", "useDataSource", "useLoadData", "changeOnSelectLast", "changeOnSelect", "maxLevel"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { LoadingOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty, useField } from '@formily/react';
import { toArr } from '@formily/shared';
import { Cascader as AntdCascader, Space } from 'antd';
import { isBoolean, omit } from 'lodash';
import React from 'react';
import { useRequest } from '../../../api-client';
import { defaultFieldNames } from './defaultFieldNames';
import { ReadPretty } from './ReadPretty';

var useDefDataSource = function useDefDataSource(options) {
  var field = useField();
  return useRequest(function () {
    return Promise.resolve({
      data: field.dataSource || []
    });
  }, options);
};

var useDefLoadData = function useDefLoadData(props) {
  return props === null || props === void 0 ? void 0 : props.loadData;
};

export var Cascader = connect(function (props) {
  var field = useField();

  var value = props.value,
      _onChange = props.onChange,
      labelInValue = props.labelInValue,
      _props$useDataSource = props.useDataSource,
      useDataSource = _props$useDataSource === void 0 ? useDefDataSource : _props$useDataSource,
      _props$useLoadData = props.useLoadData,
      useLoadData = _props$useLoadData === void 0 ? useDefLoadData : _props$useLoadData,
      changeOnSelectLast = props.changeOnSelectLast,
      changeOnSelect = props.changeOnSelect,
      maxLevel = props.maxLevel,
      others = _objectWithoutProperties(props, _excluded);

  var fieldNames = _objectSpread(_objectSpread({}, defaultFieldNames), props.fieldNames);

  var loadData = useLoadData(props);

  var _useDataSource = useDataSource({
    onSuccess: function onSuccess(data) {
      field.dataSource = (data === null || data === void 0 ? void 0 : data.data) || [];
    }
  }),
      loading = _useDataSource.loading; // 兼容值为 object[] 的情况


  var toValue = function toValue() {
    return toArr(value).map(function (item) {
      if (_typeof(item) === 'object') {
        return item[fieldNames.value];
      }

      return item;
    });
  };

  var displayRender = function displayRender(labels, selectedOptions) {
    return /*#__PURE__*/React.createElement(Space, {
      split: '/'
    }, labels.map(function (label, index) {
      if (selectedOptions[index]) {
        return /*#__PURE__*/React.createElement("span", {
          key: label
        }, label);
      }

      var item = toArr(value).find(function (item) {
        return item[fieldNames.value] === label;
      });
      return /*#__PURE__*/React.createElement("span", {
        key: label
      }, (item === null || item === void 0 ? void 0 : item[fieldNames.label]) || label);
    }));
  };

  return /*#__PURE__*/React.createElement(AntdCascader, _objectSpread(_objectSpread({
    loading: loading
  }, others), {}, {
    options: field.dataSource,
    loadData: loadData,
    changeOnSelect: isBoolean(changeOnSelectLast) ? !changeOnSelectLast : changeOnSelect,
    value: toValue(),
    fieldNames: fieldNames,
    displayRender: displayRender,
    onChange: function onChange(value, selectedOptions) {
      if (labelInValue) {
        _onChange(selectedOptions.map(function (option) {
          return omit(option, [fieldNames.children]);
        }));
      } else {
        _onChange(value);
      }
    }
  }));
}, mapProps({
  dataSource: 'options'
}, function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    suffixIcon: (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : props.suffixIcon
  });
}), mapReadPretty(ReadPretty));
export default Cascader;