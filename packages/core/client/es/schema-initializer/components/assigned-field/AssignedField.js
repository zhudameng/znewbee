function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useField, useFieldSchema } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CollectionField, useCollection } from '../../../collection-manager';
import { useCompile, useFilterOptions } from '../../../schema-component';
export var AssignedField = function AssignedField(props) {
  var _field$value$value, _field$value;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var compile = useCompile();
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useState = useState('constantValue'),
      _useState2 = _slicedToArray(_useState, 2),
      type = _useState2[0],
      setType = _useState2[1];

  var _useState3 = useState((_field$value$value = field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.value) !== null && _field$value$value !== void 0 ? _field$value$value : ''),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      options = _useState6[0],
      setOptions = _useState6[1];

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var collectionField = getField(fieldSchema.name);
  var uiSchema = collectionField.uiSchema;
  var currentUser = useFilterOptions('users');
  var currentRecord = useFilterOptions(collectionField.collectionName);
  useEffect(function () {
    var opt = [{
      name: 'currentUser',
      title: t('Current user'),
      children: _toConsumableArray(currentUser)
    }, {
      name: 'currentRecord',
      title: t('Current record'),
      children: _toConsumableArray(currentRecord)
    }];
    setOptions(compile(opt));
  }, []);

  var valueChangeHandler = function valueChangeHandler(val) {
    setValue(val);
  };

  return /*#__PURE__*/React.createElement(CollectionField, _objectSpread(_objectSpread({}, props), {}, {
    value: field.value,
    onChange: valueChangeHandler
  })); // return (
  //   <Space>
  //     <Select defaultValue={type} value={type} style={{ width: 120 }} onChange={typeChangeHandler}>
  //       <Select.Option value="constantValue">{t('Constant value')}</Select.Option>
  //       <Select.Option value="dynamicValue">{t('Dynamic value')}</Select.Option>
  //     </Select>
  //     {type === 'constantValue' ? (
  //       <CollectionField {...props} onChange={valueChangeHandler} />
  //     ) : (
  //       <Cascader
  //         fieldNames={{
  //           label: 'title',
  //           value: 'name',
  //           children: 'children',
  //         }}
  //         style={{
  //           width: 150,
  //         }}
  //         options={options}
  //         onChange={valueChangeHandler}
  //         defaultValue={value}
  //       />
  //     )}
  //   </Space>
  // );
};