"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _css = require("@emotion/css");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _reactI18next = require("react-i18next");

var _ = require(".");

var _WorkflowCanvas = require("../WorkflowCanvas");

var _style = require("../style");

var _calculators = require("../calculators");

var _i18n = require("../../i18n");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import { SchemaComponent } from "../../schema-component";
function CalculationItem(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange,
      onRemove = _ref.onRemove;

  if (!value) {
    return null;
  }

  var calculator = value.calculator,
      _value$operands = value.operands,
      operands = _value$operands === void 0 ? [] : _value$operands;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      display: flex;\n      position: relative;\n      margin: .5em 0;\n    "])))
  }, value.group ? /*#__PURE__*/_react.default.createElement(CalculationGroup, {
    value: value.group,
    onChange: function onChange(group) {
      return _onChange(_objectSpread(_objectSpread({}, value), {}, {
        group: group
      }));
    }
  }) : /*#__PURE__*/_react.default.createElement(_calculators.Calculation, {
    operands: operands,
    calculator: calculator,
    onChange: _onChange
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: onRemove,
    type: "link",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CloseCircleOutlined, null)
  }));
}

function CalculationGroup(_ref2) {
  var _this = this;

  var value = _ref2.value,
      _onChange2 = _ref2.onChange;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _value$type = value.type,
      type = _value$type === void 0 ? 'and' : _value$type,
      _value$calculations = value.calculations,
      calculations = _value$calculations === void 0 ? [] : _value$calculations;

  function onAddSingle() {
    _onChange2(_objectSpread(_objectSpread({}, value), {}, {
      calculations: [].concat(_toConsumableArray(calculations), [{
        not: false,
        calculator: 'equal'
      }])
    }));
  }

  function onAddGroup() {
    _onChange2(_objectSpread(_objectSpread({}, value), {}, {
      calculations: [].concat(_toConsumableArray(calculations), [{
        not: false,
        group: {
          type: 'and',
          calculations: []
        }
      }])
    }));
  }

  function _onRemove(i) {
    calculations.splice(i, 1);

    _onChange2(_objectSpread(_objectSpread({}, value), {}, {
      calculations: _toConsumableArray(calculations)
    }));
  }

  function onItemChange(i, v) {
    calculations.splice(i, 1, v);

    _onChange2(_objectSpread(_objectSpread({}, value), {}, {
      calculations: _toConsumableArray(calculations)
    }));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)('node-type-condition-group', (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      position: relative;\n      width: 100%;\n\n      .node-type-condition-group{\n        padding: .5em 1em;\n        border: 1px dashed #ddd;\n      }\n\n      + button{\n        position: absolute;\n        right: 0;\n      }\n    "]))))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        display: flex;\n        align-items: center;\n        gap: .5em;\n\n        .ant-select{\n          width: auto;\n        }\n      "])))
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, null, 'Meet ', /*#__PURE__*/_react.default.createElement(_antd.Select, {
    value: type,
    onChange: function onChange(t) {
      return _onChange2(_objectSpread(_objectSpread({}, value), {}, {
        type: t
      }));
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "and"
  }, "All"), /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: "or"
  }, "Any")), ' conditions in the group')), /*#__PURE__*/_react.default.createElement("div", {
    className: "calculation-items"
  }, calculations.map(function (calculation, i) {
    return /*#__PURE__*/_react.default.createElement(CalculationItem, {
      key: "".concat(calculation.calculator, "_").concat(i),
      value: calculation,
      onChange: onItemChange.bind(_this, i),
      onRemove: function onRemove() {
        return _onRemove(i);
      }
    });
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        button{\n          padding: 0;\n\n          &:not(:last-child){\n            margin-right: 1em;\n          }\n        }\n      "])))
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onAddSingle
  }, t('Add condition')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: onAddGroup
  }, t('Add condition group'))));
}

function CalculationConfig(_ref3) {
  var value = _ref3.value,
      _onChange3 = _ref3.onChange;
  var rule = value && Object.keys(value).length ? value : {
    group: {
      type: 'and',
      calculations: []
    }
  };
  return /*#__PURE__*/_react.default.createElement(CalculationGroup, {
    value: rule.group,
    onChange: function onChange(group) {
      return _onChange3(_objectSpread(_objectSpread({}, rule), {}, {
        group: group
      }));
    }
  });
}

var _default = {
  title: '{{t("Condition")}}',
  type: 'condition',
  group: 'control',
  fieldset: {
    'config.rejectOnFalse': {
      type: 'boolean',
      name: 'config.rejectOnFalse',
      title: '{{t("Mode")}}',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        disabled: true
      },
      enum: [{
        value: true,
        label: _i18n.i18n.t('Continue when "Yes"')
      }, {
        value: false,
        label: _i18n.i18n.t('Branch into "Yes" and "No"')
      }]
    },
    'config.calculation': {
      type: 'string',
      name: 'config.calculation',
      title: '{{t("Conditions")}}',
      'x-decorator': 'FormItem',
      'x-component': 'CalculationConfig'
    }
  },
  view: {},
  options: [{
    label: _i18n.i18n.t('Continue when "Yes"'),
    key: 'rejectOnFalse',
    value: {
      rejectOnFalse: true
    }
  }, {
    label: _i18n.i18n.t('Branch into "Yes" and "No"'),
    key: 'branch',
    value: {
      rejectOnFalse: false
    }
  }],
  render: function render(data) {
    var id = data.id,
        rejectOnFalse = data.config.rejectOnFalse;

    var _useFlowContext = (0, _WorkflowCanvas.useFlowContext)(),
        nodes = _useFlowContext.nodes;

    var trueEntry = nodes.find(function (item) {
      return item.upstreamId === id && item.branchIndex === 1;
    });
    var falseEntry = nodes.find(function (item) {
      return item.upstreamId === id && item.branchIndex === 0;
    });
    return /*#__PURE__*/_react.default.createElement(_.NodeDefaultView, {
      data: data
    }, rejectOnFalse ? null : /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _css.cx)(_style.nodeSubtreeClass)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _css.cx)(_style.branchBlockClass, (0, _css.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n                > * > .workflow-branch-lines{\n                  > button{\n                    display: none;\n                  }\n                }\n              "]))))
    }, /*#__PURE__*/_react.default.createElement(_WorkflowCanvas.Branch, {
      from: data,
      entry: falseEntry,
      branchIndex: 0
    }), /*#__PURE__*/_react.default.createElement(_WorkflowCanvas.Branch, {
      from: data,
      entry: trueEntry,
      branchIndex: 1
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _css.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n                position: relative;\n                height: 2em;\n                overflow: visible;\n\n                > span{\n                  position: absolute;\n                  top: calc(1.5em - 1px);\n                  line-height: 1em;\n                  color: #999;\n                  background-color: green;\n                  padding: 1px;\n                }\n              "])))
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _css.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["right: 4em;"])))
    }, _i18n.i18n.t('No')), /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _css.css)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["left: 4em;"])))
    }, _i18n.i18n.t('Yes')))));
  },
  components: {
    CalculationConfig: CalculationConfig
  }
};
exports.default = _default;