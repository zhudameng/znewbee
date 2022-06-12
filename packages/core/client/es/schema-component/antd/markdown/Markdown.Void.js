function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { observer, useField, useFieldSchema } from '@formily/react';
import { Button, Input as AntdInput, Space } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../../hooks/useDesignable';
import { MarkdownVoidDesigner } from './Markdown.Void.Designer';
import { markdown } from './util';

var MarkdownEditor = function MarkdownEditor(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(props.defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    className: 'mb-markdown',
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(AntdInput.TextArea, _objectSpread(_objectSpread({
    autoSize: {
      minRows: 3
    }
  }, props), {}, {
    value: value,
    onChange: function onChange(e) {
      setValue(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Space, {
    style: {
      position: 'absolute',
      bottom: 5,
      right: 5
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      var _props$onCancel;

      (_props$onCancel = props.onCancel) === null || _props$onCancel === void 0 ? void 0 : _props$onCancel.call(props, e);
    }
  }, t('Cancel')), /*#__PURE__*/React.createElement(Button, {
    type: 'primary',
    onClick: function onClick() {
      var _props$onSubmit;

      (_props$onSubmit = props.onSubmit) === null || _props$onSubmit === void 0 ? void 0 : _props$onSubmit.call(props, value);
    }
  }, t('Save'))));
};

export var MarkdownVoid = observer(function (props) {
  var content = props.content;
  var field = useField();
  var schema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var onSave = props.onSave,
      _onCancel = props.onCancel;
  return (field === null || field === void 0 ? void 0 : field.editable) ? /*#__PURE__*/React.createElement(MarkdownEditor, _objectSpread(_objectSpread({}, props), {}, {
    defaultValue: content,
    onCancel: function onCancel() {
      field.editable = false;
      _onCancel === null || _onCancel === void 0 ? void 0 : _onCancel();
    },
    onSubmit: function () {
      var _onSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var _schema$xComponentP;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                field.editable = false;
                (_schema$xComponentP = schema['x-component-props']) !== null && _schema$xComponentP !== void 0 ? _schema$xComponentP : schema['x-component-props'] = {};
                schema['x-component-props']['content'] = value;
                field.componentProps.content = value;
                onSave === null || onSave === void 0 ? void 0 : onSave(schema);
                dn.emit('patch', {
                  schema: {
                    'x-uid': schema['x-uid'],
                    'x-component-props': {
                      content: value
                    }
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onSubmit(_x) {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }()
  })) : /*#__PURE__*/React.createElement("div", {
    className: 'nb-markdown',
    dangerouslySetInnerHTML: {
      __html: markdown(content)
    }
  });
});
MarkdownVoid.Designer = MarkdownVoidDesigner;