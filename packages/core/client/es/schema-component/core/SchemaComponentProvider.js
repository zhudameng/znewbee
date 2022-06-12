function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createForm } from '@formily/core';
import { FormProvider, Schema } from '@formily/react';
import { uid } from '@formily/shared';
import { useCookieState } from 'ahooks';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaComponentContext } from '../context';
import { SchemaComponentOptions } from './SchemaComponentOptions';

var randomString = function randomString() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(prefix).concat(uid());
};

Schema.silent(true);
var Registry = {
  silent: true,
  compile: function compile(expression) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (Registry.silent) {
      try {
        return new Function('$root', "with($root) { return (".concat(expression, "); }"))(scope);
      } catch (_unused) {
        return "{{".concat(expression, "}}");
      }
    } else {
      return new Function('$root', "with($root) { return (".concat(expression, "); }"))(scope);
    }
  }
};
Schema.registerCompiler(Registry.compile);
export var SchemaComponentProvider = function SchemaComponentProvider(props) {
  var designable = props.designable,
      components = props.components,
      children = props.children;

  var _useState = useState(uid()),
      _useState2 = _slicedToArray(_useState, 2),
      setUid = _useState2[1];

  var _useState3 = useState(uid()),
      _useState4 = _slicedToArray(_useState3, 2),
      formId = _useState4[0],
      setFormId = _useState4[1];

  var form = props.form || useMemo(function () {
    return createForm();
  }, [formId]);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var scope = _objectSpread(_objectSpread({}, props.scope), {}, {
    t: t,
    randomString: randomString
  });

  var _useCookieState = useCookieState('useCookieDesignable', {
    defaultValue: designable ? 'true' : 'false'
  }),
      _useCookieState2 = _slicedToArray(_useCookieState, 2),
      active = _useCookieState2[0],
      setActive = _useCookieState2[1];

  return /*#__PURE__*/React.createElement(SchemaComponentContext.Provider, {
    value: {
      scope: scope,
      components: components,
      reset: function reset() {
        return setFormId(uid());
      },
      refresh: function refresh() {
        return setUid(uid());
      },
      designable: active === 'true',
      setDesignable: function setDesignable(value) {
        setActive(value ? 'true' : 'false');
      }
    }
  }, /*#__PURE__*/React.createElement(FormProvider, {
    form: form
  }, /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    inherit: true,
    scope: scope,
    components: components
  }, children)));
};