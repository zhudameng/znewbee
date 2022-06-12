"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _css = require("@emotion/css");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _calculators = require("../calculators");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
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
      return /*#__PURE__*/_react.default.createElement(_calculators.Calculation, _objectSpread(_objectSpread({}, value), {}, {
        onChange: onChange
      }));
    }
  },
  getter: function getter() {
    var _useTranslation = (0, _reactI18next.useTranslation)(),
        t = _useTranslation.t;

    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["flex-shrink: 0"])))
    }, t('Calculation result'));
  }
};
exports.default = _default;