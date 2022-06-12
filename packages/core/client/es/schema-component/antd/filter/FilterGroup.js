function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { CloseCircleOutlined } from '@ant-design/icons';
import { ArrayField, connect, useField } from '@formily/react';
import { Select, Space } from 'antd';
import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FilterLogicContext, RemoveConditionContext } from './context';
import { FilterItems } from './FilterItems';
export var FilterGroup = connect(function (props) {
  var _props$bordered = props.bordered,
      bordered = _props$bordered === void 0 ? true : _props$bordered;
  var field = useField();
  var remove = useContext(RemoveConditionContext);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var keys = Object.keys(field.value || {});
  var logic = keys.includes('$or') ? '$or' : '$and';

  var setLogic = function setLogic(value) {
    var obj = field.value || {};
    field.value = _defineProperty({}, value, _toConsumableArray(obj[logic] || []));
  };

  return /*#__PURE__*/React.createElement(FilterLogicContext.Provider, {
    value: logic
  }, /*#__PURE__*/React.createElement("div", {
    style: bordered ? {
      position: 'relative',
      border: '1px dashed #dedede',
      padding: 14,
      marginBottom: 8
    } : {
      position: 'relative',
      marginBottom: 8
    }
  }, remove && /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement(CloseCircleOutlined, {
    style: {
      position: 'absolute',
      right: 10,
      top: 10,
      color: '#bfbfbf'
    },
    onClick: function onClick() {
      return remove();
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Trans, null, 'Meet ', /*#__PURE__*/React.createElement(Select, {
    style: {
      width: 'auto'
    },
    value: logic,
    onChange: function onChange(value) {
      setLogic(value);
    }
  }, /*#__PURE__*/React.createElement(Select.Option, {
    value: '$and'
  }, "All"), /*#__PURE__*/React.createElement(Select.Option, {
    value: '$or'
  }, "Any")), ' conditions in the group')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrayField, {
    name: logic,
    component: [FilterItems]
  })), /*#__PURE__*/React.createElement(Space, {
    size: 16,
    style: {
      marginTop: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      var value = field.value || {};
      var items = value[logic] || [];
      items.push({});
      field.value = _defineProperty({}, logic, items);
    }
  }, t('Add condition')), /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      var value = field.value || {};
      var items = value[logic] || [];
      items.push({
        $and: [{}]
      });
      field.value = _defineProperty({}, logic, items);
    }
  }, t('Add condition group')))));
});