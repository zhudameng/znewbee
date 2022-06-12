var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { css } from '@emotion/css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calculation } from '../calculators';
export default {
  title: '{{t("Calculation")}}',
  type: 'calculation',
  group: 'control',
  fieldset: {
    'config.calculation': {
      type: 'object',
      title: '{{t("Configure calculation")}}',
      name: 'config.calculation',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'CalculationConfig'
    }
  },
  view: {},
  components: {
    CalculationConfig: function CalculationConfig(_ref) {
      var value = _ref.value,
          onChange = _ref.onChange;
      return /*#__PURE__*/React.createElement(Calculation, _objectSpread(_objectSpread({}, value), {}, {
        onChange: onChange
      }));
    }
  },
  getter: function getter() {
    var _useTranslation = useTranslation(),
        t = _useTranslation.t;

    return /*#__PURE__*/React.createElement("div", {
      className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["flex-shrink: 0"])))
    }, t('Calculation result'));
  }
};