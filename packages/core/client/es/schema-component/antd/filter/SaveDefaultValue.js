var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import { useFieldSchema, useForm } from '@formily/react';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../../hooks';
export var SaveDefaultValue = function SaveDefaultValue(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useDesignable = useDesignable(),
      designable = _useDesignable.designable,
      dn = _useDesignable.dn,
      refresh = _useDesignable.refresh;

  var fieldSchema = useFieldSchema();
  var form = useForm();

  if (!designable) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Button, {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        border-color: rgb(241, 139, 98);\n        color: rgb(241, 139, 98);\n      "]))),
    type: 'dashed',
    onClick: function onClick() {
      var _fieldSchema$parent, _fieldSchema$parent$p, _fieldSchema$parent$p2, _fieldSchema$parent$p3;

      var filterSchema = fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$parent = fieldSchema.parent) === null || _fieldSchema$parent === void 0 ? void 0 : (_fieldSchema$parent$p = _fieldSchema$parent.parent) === null || _fieldSchema$parent$p === void 0 ? void 0 : (_fieldSchema$parent$p2 = _fieldSchema$parent$p.parent) === null || _fieldSchema$parent$p2 === void 0 ? void 0 : (_fieldSchema$parent$p3 = _fieldSchema$parent$p2.properties) === null || _fieldSchema$parent$p3 === void 0 ? void 0 : _fieldSchema$parent$p3.filter;

      if (!filterSchema) {
        return;
      }

      var defaultValue = form.values.filter;
      dn.emit('patch', {
        schema: {
          'x-uid': filterSchema['x-uid'],
          default: defaultValue
        }
      });
      dn.refresh();
      filterSchema.default = defaultValue;
      console.log('filterSchema', defaultValue);
    }
  }, t('Save conditions'));
};