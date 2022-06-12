function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { FormLayout } from '@formily/antd';
import { observer, RecursionField, Schema, useField, useForm } from '@formily/react';
import React, { useEffect, useState } from 'react';
var schema = {
  local: {
    properties: {
      documentRoot: {
        title: '{{t("Destination")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: 'uploads'
      },
      serve: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox',
        'x-content': '{{t("Use the built-in static file server")}}',
        default: true
      }
    }
  },
  'ali-oss': {
    properties: {
      region: {
        title: '{{t("Region")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      },
      accessKeyId: {
        title: '{{t("AccessKey ID")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      },
      accessKeySecret: {
        title: '{{t("AccessKey Secret")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        required: true
      },
      bucket: {
        title: '{{t("Bucket")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      }
    }
  },
  s3: {
    properties: {
      region: {
        title: '{{t("Region")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      },
      accessKeyId: {
        title: '{{t("AccessKey ID")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      },
      secretAccessKey: {
        title: '{{t("AccessKey Secret")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        required: true
      },
      bucket: {
        title: '{{t("Bucket")}}',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      }
    }
  }
};
export var StorageOptions = observer(function (props) {
  var form = useForm();
  var field = useField();

  var _useState = useState(new Schema({})),
      _useState2 = _slicedToArray(_useState, 2),
      s = _useState2[0],
      setSchema = _useState2[1];

  useEffect(function () {
    form.clearFormGraph('options.*');
    setSchema(new Schema(schema[form.values.type] || {}));
  }, [form.values.type]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormLayout, {
    layout: 'vertical'
  }, /*#__PURE__*/React.createElement(RecursionField, {
    key: form.values.type || 'local',
    basePath: field.address,
    onlyRenderProperties: true,
    schema: s
  })));
});