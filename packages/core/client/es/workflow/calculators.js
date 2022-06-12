function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from "react";
import { observer, useForm } from "@formily/react";
import { Button, Cascader, Dropdown, Input, InputNumber, Menu, Select, Form } from "antd";
import { css } from "@emotion/css";
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { instructions, useNodeContext } from "./nodes";
import { useFlowContext } from "./WorkflowCanvas";
import { triggers } from "./triggers";
import { SchemaComponent, useCollectionManager, useCompile } from "..";
import { useTranslation } from "react-i18next";

function NullRender() {
  return null;
}

export var calculators = [{
  value: 'boolean',
  title: '{{t("Comparison")}}',
  children: [{
    value: 'equal',
    name: '='
  }, {
    value: 'notEqual',
    name: '≠'
  }, {
    value: 'gt',
    name: '>'
  }, {
    value: 'gte',
    name: '≥'
  }, {
    value: 'lt',
    name: '<'
  }, {
    value: 'lte',
    name: '≤'
  }]
}, {
  value: 'number',
  title: '{{t("Arithmetic calculation")}}',
  children: [{
    value: 'add',
    name: '+'
  }, {
    value: 'minus',
    name: '-'
  }, {
    value: 'multiple',
    name: '*'
  }, {
    value: 'divide',
    name: '/'
  }, {
    value: 'mod',
    name: '%'
  }]
}, {
  value: 'string',
  title: '{{t("String operation")}}',
  children: [{
    value: 'includes',
    name: '{{t("contains")}}'
  }, {
    value: 'notIncludes',
    name: '{{t("does not contain")}}'
  }, {
    value: 'startsWith',
    name: '{{t("starts with")}}'
  }, {
    value: 'notStartsWith',
    name: '{{t("not starts with")}}'
  }, {
    value: 'endsWith',
    name: '{{t("ends with")}}'
  }, {
    value: 'notEndsWith',
    name: '{{t("not ends with")}}'
  }]
}, {
  value: 'date',
  title: '{{t("Date")}}',
  children: []
}];
var JT_VALUE_RE = /^\s*\{\{([\s\S]*)\}\}\s*$/;
export function parseStringValue(value, Types) {
  var _type;

  var matcher = value.match(JT_VALUE_RE);

  if (!matcher) {
    return {
      type: 'constant',
      value: value,
      options: {
        type: 'string'
      }
    };
  }

  var _matcher$1$split = matcher[1].split('.'),
      _matcher$1$split2 = _toArray(_matcher$1$split),
      type = _matcher$1$split2[0],
      paths = _matcher$1$split2.slice(1);

  return {
    type: type,
    options: paths.length ? (_type = (Types || VariableTypes)[type]) === null || _type === void 0 ? void 0 : _type.parse(paths) : {}
  };
}
export var BaseTypeSet = new Set(['boolean', 'number', 'string', 'date']);
var ConstantTypes = {
  string: {
    title: '{{t("String")}}',
    value: 'string',
    component: function component(_ref) {
      var _onChange = _ref.onChange,
          type = _ref.type,
          options = _ref.options,
          value = _ref.value;
      return /*#__PURE__*/React.createElement(Input, {
        value: value,
        onChange: function onChange(ev) {
          return _onChange({
            value: ev.target.value,
            type: type,
            options: options
          });
        }
      });
    },
    default: ''
  },
  number: {
    title: '{{t("Number")}}',
    value: 'number',
    component: function component(_ref2) {
      var _onChange2 = _ref2.onChange,
          type = _ref2.type,
          options = _ref2.options,
          value = _ref2.value;
      return /*#__PURE__*/React.createElement(InputNumber, {
        value: value,
        onChange: function onChange(v) {
          return _onChange2({
            value: v,
            type: type,
            options: options
          });
        }
      });
    },
    default: 0
  },
  boolean: {
    title: '{{t("Boolean")}}',
    value: 'boolean',
    component: function component(_ref3) {
      var _onChange3 = _ref3.onChange,
          type = _ref3.type,
          options = _ref3.options,
          value = _ref3.value;

      var _useTranslation = useTranslation(),
          t = _useTranslation.t;

      return /*#__PURE__*/React.createElement(Select, {
        value: value,
        onChange: function onChange(v) {
          return _onChange3({
            value: v,
            type: type,
            options: options
          });
        }
      }, /*#__PURE__*/React.createElement(Select.Option, {
        value: true
      }, t('True')), /*#__PURE__*/React.createElement(Select.Option, {
        value: false
      }, t('False')));
    },
    default: false
  } // date: {
  //   title: '日期',
  //   value: 'date',
  //   component({ onChange, type, options, value }) {
  //     return <DatePicker value={value} onChange={v => onChange({ value: v, type, options })}/>;
  //   },
  //   default: new Date()
  // }

};
export var VariableTypes = {
  constant: {
    title: '{{t("Constant")}}',
    value: 'constant',
    options: Object.values(ConstantTypes).map(function (item) {
      return {
        value: item.value,
        label: item.title
      };
    }),
    component: function component(_ref4) {
      var _ConstantTypes$option, _ConstantTypes$option2;

      var _ref4$options = _ref4.options,
          options = _ref4$options === void 0 ? {
        type: 'string'
      } : _ref4$options;
      return (_ConstantTypes$option = (_ConstantTypes$option2 = ConstantTypes[options.type]) === null || _ConstantTypes$option2 === void 0 ? void 0 : _ConstantTypes$option2.component) !== null && _ConstantTypes$option !== void 0 ? _ConstantTypes$option : NullRender;
    },
    appendTypeValue: function appendTypeValue(_ref5) {
      var _ref5$options = _ref5.options,
          options = _ref5$options === void 0 ? {
        type: 'string'
      } : _ref5$options;
      return (options === null || options === void 0 ? void 0 : options.type) ? [options.type] : [];
    },
    onTypeChange: function onTypeChange(old, _ref6, onChange) {
      var _old$options;

      var _ref7 = _slicedToArray(_ref6, 2),
          type = _ref7[0],
          optionsType = _ref7[1];

      if ((old === null || old === void 0 ? void 0 : (_old$options = old.options) === null || _old$options === void 0 ? void 0 : _old$options.type) === optionsType) {
        return;
      }

      var value = ConstantTypes[optionsType].default;
      onChange({
        value: value,
        type: type,
        options: _objectSpread(_objectSpread({}, old.options), {}, {
          type: optionsType
        })
      });
    },
    parse: function parse(path) {
      return {
        path: path
      };
    }
  },
  $jobsMapByNodeId: {
    title: '{{t("Node result")}}',
    value: '$jobsMapByNodeId',
    options: function options() {
      var node = useNodeContext();
      var stack = [];

      for (var current = node.upstream; current; current = current.upstream) {
        var _instructions$get = instructions.get(current.type),
            getter = _instructions$get.getter; // Note: consider `getter` as the key of a value available node


        if (getter) {
          var _current$title;

          stack.push({
            value: current.id,
            label: (_current$title = current.title) !== null && _current$title !== void 0 ? _current$title : "#".concat(current.id)
          });
        }
      }

      return stack;
    },
    component: function component(_ref8) {
      var _instruction$getter;

      var options = _ref8.options;

      var _useFlowContext = useFlowContext(),
          nodes = _useFlowContext.nodes;

      if (!(options === null || options === void 0 ? void 0 : options.nodeId)) {
        return NullRender;
      }

      var node = nodes.find(function (n) {
        return n.id == options.nodeId;
      });

      if (!node) {
        return NullRender;
      }

      var instruction = instructions.get(node.type);
      return (_instruction$getter = instruction === null || instruction === void 0 ? void 0 : instruction.getter) !== null && _instruction$getter !== void 0 ? _instruction$getter : NullRender;
    },
    appendTypeValue: function appendTypeValue(_ref9) {
      var _ref9$options = _ref9.options,
          options = _ref9$options === void 0 ? {} : _ref9$options;
      return options.nodeId ? [Number.parseInt(options.nodeId, 10)] : [];
    },
    onTypeChange: function onTypeChange(old, _ref10, onChange) {
      var _ref11 = _slicedToArray(_ref10, 2),
          type = _ref11[0],
          nodeId = _ref11[1];

      onChange({
        // ...old,
        type: type,
        options: {
          nodeId: nodeId
        }
      });
    },
    parse: function parse(_ref12) {
      var _ref13 = _toArray(_ref12),
          nodeId = _ref13[0],
          path = _ref13.slice(1);

      return {
        nodeId: nodeId,
        path: path.join('.')
      };
    },
    stringify: function stringify(_ref14) {
      var options = _ref14.options;
      var stack = ['$jobsMapByNodeId'];

      if (options.nodeId) {
        stack.push(options.nodeId);

        if (options.path) {
          stack.push(options.path);
        }
      }

      return "{{".concat(stack.join('.'), "}}");
    }
  },
  $context: {
    title: '{{t("Trigger context")}}',
    value: '$context',
    component: function component() {
      var _trigger$getter;

      var _useFlowContext2 = useFlowContext(),
          workflow = _useFlowContext2.workflow;

      var trigger = triggers.get(workflow.type);
      return (_trigger$getter = trigger === null || trigger === void 0 ? void 0 : trigger.getter) !== null && _trigger$getter !== void 0 ? _trigger$getter : NullRender;
    },
    parse: function parse(_ref15) {
      var _ref16 = _toArray(_ref15),
          prefix = _ref16[0],
          path = _ref16.slice(1);

      return {
        path: path.join('.')
      };
    },
    stringify: function stringify(_ref17) {
      var options = _ref17.options;
      var stack = ['$context'];

      if (options === null || options === void 0 ? void 0 : options.path) {
        stack.push(options.path);
      }

      return "{{".concat(stack.join('.'), "}}");
    }
  } // calculation: Calculation

};
export var VariableTypesContext = /*#__PURE__*/React.createContext(null);
export function useVariableTypes() {
  return React.useContext(VariableTypesContext);
}
export function Operand(_ref18) {
  var _ref18$value = _ref18.value,
      operand = _ref18$value === void 0 ? {
    type: 'constant',
    value: '',
    options: {
      type: 'string'
    }
  } : _ref18$value,
      _onChange4 = _ref18.onChange,
      children = _ref18.children;
  var compile = useCompile();
  var Types = useVariableTypes();
  var type = operand.type;

  var _ref19 = Types[type] || {},
      component = _ref19.component,
      appendTypeValue = _ref19.appendTypeValue;

  var VariableComponent = typeof component === 'function' ? component(operand) : NullRender;
  return /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      display: flex;\n      gap: .5em;\n      align-items: center;\n\n      .ant-select,\n      .ant-cascader-picker,\n      .ant-picker,\n      .ant-input-number,\n      .ant-input-affix-wrapper{\n        width: auto;\n      }\n    "])))
  }, /*#__PURE__*/React.createElement(Cascader, {
    allowClear: false,
    value: [type].concat(_toConsumableArray(appendTypeValue ? appendTypeValue(operand) : [])),
    options: Object.values(Types).map(function (item) {
      var options = typeof item.options === 'function' ? item.options() : item.options;
      return {
        label: compile(item.title),
        value: item.value,
        children: compile(options),
        disabled: options && !options.length,
        isLeaf: !options
      };
    }),
    onChange: function onChange(next) {
      var onTypeChange = Types[next[0]].onTypeChange;

      if (typeof onTypeChange === 'function') {
        onTypeChange(operand, next, _onChange4);
      } else {
        if (next[0] !== type) {
          _onChange4({
            type: next[0],
            value: null
          });
        }
      }
    }
  }), children !== null && children !== void 0 ? children : /*#__PURE__*/React.createElement(VariableComponent, _objectSpread(_objectSpread({}, operand), {}, {
    onChange: function onChange(op) {
      return _onChange4(_objectSpread({}, op));
    }
  })));
}
export function Calculation(_ref20) {
  var calculator = _ref20.calculator,
      _ref20$operands = _ref20.operands,
      operands = _ref20$operands === void 0 ? [] : _ref20$operands,
      _onChange5 = _ref20.onChange;
  var compile = useCompile();
  return /*#__PURE__*/React.createElement(VariableTypesContext.Provider, {
    value: VariableTypes
  }, /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        display: flex;\n        gap: .5em;\n        align-items: center;\n\n        .ant-select{\n          width: auto;\n          min-width: 6em;\n        }\n      "])))
  }, /*#__PURE__*/React.createElement(Operand, {
    value: operands[0],
    onChange: function onChange(v) {
      return _onChange5({
        calculator: calculator,
        operands: [v, operands[1]]
      });
    }
  }), operands[0] ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
    value: calculator,
    onChange: function onChange(v) {
      return _onChange5({
        operands: operands,
        calculator: v
      });
    }
  }, calculators.map(function (group) {
    return /*#__PURE__*/React.createElement(Select.OptGroup, {
      key: group.value,
      label: compile(group.title)
    }, group.children.map(function (item) {
      return /*#__PURE__*/React.createElement(Select.Option, {
        key: item.value,
        value: item.value
      }, compile(item.name));
    }));
  })), /*#__PURE__*/React.createElement(Operand, {
    value: operands[1],
    onChange: function onChange(v) {
      return _onChange5({
        calculator: calculator,
        operands: [operands[0], v]
      });
    }
  })) : null));
}
export function VariableComponent(_ref21) {
  var value = _ref21.value,
      _onChange6 = _ref21.onChange,
      renderSchemaComponent = _ref21.renderSchemaComponent;

  var VTypes = _objectSpread(_objectSpread({}, VariableTypes), {}, {
    constant: {
      title: '{{t("Constant")}}',
      value: 'constant',
      options: undefined
    }
  });

  var operand = typeof value === 'string' ? parseStringValue(value, VTypes) : {
    type: 'constant',
    value: value
  };
  return /*#__PURE__*/React.createElement(VariableTypesContext.Provider, {
    value: VTypes
  }, /*#__PURE__*/React.createElement(Operand, {
    value: operand,
    onChange: function onChange(next) {
      if (next.type !== operand.type && next.type === 'constant') {
        _onChange6(null);
      } else {
        var stringify = VTypes[next.type].stringify;

        _onChange6(stringify(next));
      }
    }
  }, operand.type === 'constant' ? renderSchemaComponent() : null));
} // NOTE: observer for watching useProps

export var CollectionFieldset = observer(function (_ref22) {
  var _data$config;

  var value = _ref22.value,
      _onChange7 = _ref22.onChange;

  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var compile = useCompile();

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var _useForm = useForm(),
      data = _useForm.values;

  var fields = getCollectionFields(data === null || data === void 0 ? void 0 : (_data$config = data.config) === null || _data$config === void 0 ? void 0 : _data$config.collection).filter(function (field) {
    return !field.hidden && (field.uiSchema ? !field.uiSchema['x-read-pretty'] : false);
  });

  var VTypes = _objectSpread(_objectSpread({}, VariableTypes), {}, {
    constant: {
      title: '{{t("Constant")}}',
      value: 'constant',
      options: undefined
    }
  });

  return /*#__PURE__*/React.createElement("fieldset", {
    className: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      margin-top: .5em;\n\n      > .ant-formily-item{\n        flex-direction: column;\n\n        > .ant-formily-item-label{\n          line-height: 32px;\n        }\n      }\n    "])))
  }, fields.length ? /*#__PURE__*/React.createElement(React.Fragment, null, fields.filter(function (field) {
    return field.name in value;
  }).map(function (field) {
    var _field$uiSchema$title, _field$uiSchema;

    var operand = typeof value[field.name] === 'string' ? parseStringValue(value[field.name], VTypes) : {
      type: 'constant',
      value: value[field.name]
    }; // TODO: try to use <ObjectField> to replace this map

    return /*#__PURE__*/React.createElement(Form.Item, {
      key: field.name,
      label: compile((_field$uiSchema$title = (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) !== null && _field$uiSchema$title !== void 0 ? _field$uiSchema$title : field.name),
      labelAlign: "left",
      className: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n                  .ant-form-item-control-input-content{\n                    display: flex;\n                  }\n                "])))
    }, /*#__PURE__*/React.createElement(VariableTypesContext.Provider, {
      value: VTypes
    }, /*#__PURE__*/React.createElement(Operand, {
      value: operand,
      onChange: function onChange(next) {
        if (next.type !== operand.type && next.type === 'constant') {
          _onChange7(_objectSpread(_objectSpread({}, value), {}, _defineProperty({}, field.name, null)));
        } else {
          var stringify = VTypes[next.type].stringify;

          _onChange7(_objectSpread(_objectSpread({}, value), {}, _defineProperty({}, field.name, stringify(next))));
        }
      }
    }, operand.type === 'constant' ? /*#__PURE__*/React.createElement(SchemaComponent, {
      schema: _objectSpread(_objectSpread({}, field.uiSchema), {}, {
        name: field.name
      })
    }) : null), /*#__PURE__*/React.createElement(Button, {
      type: "link",
      icon: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
      onClick: function onClick() {
        var _field$name = field.name,
            _ = value[_field$name],
            rest = _objectWithoutProperties(value, [_field$name].map(_toPropertyKey));

        _onChange7(rest);
      }
    })));
  }), Object.keys(value).length < fields.length ? /*#__PURE__*/React.createElement(Dropdown, {
    overlay: /*#__PURE__*/React.createElement(Menu, {
      onClick: function onClick(_ref23) {
        var key = _ref23.key;
        return _onChange7(_objectSpread(_objectSpread({}, value), {}, _defineProperty({}, key, null)));
      },
      className: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n                    max-height: 300px;\n                    overflow-y: auto;\n                  "])))
    }, fields.filter(function (field) {
      return !(field.name in value);
    }).map(function (field) {
      var _field$uiSchema$title2, _field$uiSchema2;

      return /*#__PURE__*/React.createElement(Menu.Item, {
        key: field.name
      }, compile((_field$uiSchema$title2 = (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.title) !== null && _field$uiSchema$title2 !== void 0 ? _field$uiSchema$title2 : field.name));
    }))
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(PlusOutlined, null)
  }, t('Add field'))) : null) : /*#__PURE__*/React.createElement("p", null, t('Please select collection first')));
});