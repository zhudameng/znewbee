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

import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useFormLayout } from '@formily/antd';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { isValid } from '@formily/shared';
import { Button, Input, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hasIcon, Icon, icons } from '../../../icon';

function IconField(props) {
  var layout = useFormLayout();
  var value = props.value,
      onChange = props.onChange,
      disabled = props.disabled;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input.Group, {
    compact: true
  }, /*#__PURE__*/React.createElement(Popover, {
    placement: 'bottom',
    visible: visible,
    onVisibleChange: function onVisibleChange(val) {
      if (disabled) {
        return;
      }

      setVisible(val);
    },
    content: /*#__PURE__*/React.createElement("div", {
      style: {
        width: '26em',
        maxHeight: '20em',
        overflowY: 'auto'
      }
    }, _toConsumableArray(icons.keys()).map(function (key) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18,
          marginRight: 10,
          cursor: 'pointer'
        },
        onClick: function onClick() {
          onChange(key);
          setVisible(false);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        type: key
      }));
    })),
    title: t('Icon'),
    trigger: "click"
  }, /*#__PURE__*/React.createElement(Button, {
    size: layout.size,
    disabled: disabled
  }, hasIcon(value) ? /*#__PURE__*/React.createElement(Icon, {
    type: value
  }) : t('Select icon'))), value && !disabled && /*#__PURE__*/React.createElement(Button, {
    size: layout.size,
    icon: /*#__PURE__*/React.createElement(CloseOutlined, null),
    onClick: function onClick(e) {
      onChange(null);
    }
  })));
}

export var IconPicker = connect(IconField, mapProps(function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    suffix: /*#__PURE__*/React.createElement("span", null, (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : props.suffix)
  });
}), mapReadPretty(function (props) {
  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  return /*#__PURE__*/React.createElement(Icon, {
    type: props.value
  });
}));
export default IconPicker;