var _templateObject;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import { Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient } from '../../../api-client';
import { createDesignable, useDesignable } from '../../../schema-component';
import { SchemaInitializer } from '../../../schema-initializer';
import { useFormItemInitializerFields } from '../../../schema-initializer/utils';
var titleCss = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  pointer-events: none;\n  position: absolute;\n  font-size: 12px;\n  background: #f18b62;\n  color: #fff;\n  padding: 0 5px;\n  line-height: 16px;\n  height: 16px;\n  border-bottom-right-radius: 2px;\n  border-radius: 2px;\n  top: 2px;\n  left: 2px;\n"])));

var gridRowColWrap = function gridRowColWrap(schema) {
  schema['x-read-pretty'] = true;
  return {
    type: 'void',
    'x-component': 'Grid.Row',
    properties: _defineProperty({}, uid(), {
      type: 'void',
      'x-component': 'Grid.Col',
      properties: _defineProperty({}, schema.name || uid(), schema)
    })
  };
}; // export const removeGridFormItem = (schema, cb) => {
//   cb(schema, {
//     removeParentsIfNoChildren: true,
//     breakRemoveOn: {
//       'x-component': 'Kanban.Card',
//     },
//   });
// };


export var KanbanCardDesigner = function KanbanCardDesigner(props) {
  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn,
      designable = _useDesignable.designable;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var api = useAPIClient();

  var _useDesignable2 = useDesignable(),
      refresh = _useDesignable2.refresh;

  var field = useField();
  var fieldSchema = useFieldSchema();
  var fields = useFormItemInitializerFields({
    readPretty: true,
    block: 'KanbanV2'
  });

  if (!designable) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer'
  }, /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/React.createElement(Space, {
    size: 2,
    align: 'center'
  }, /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    insert: function insert(schema) {
      var gridSchema = fieldSchema.reduceProperties(function (buf, schema) {
        if (schema['x-component'] === 'Grid') {
          return schema;
        }

        return buf;
      }, null);

      if (!gridSchema) {
        return;
      }

      var dn = createDesignable({
        t: t,
        api: api,
        refresh: refresh,
        current: gridSchema
      });
      dn.loadAPIClientEvents();
      dn.insertBeforeEnd(schema);
    },
    items: [{
      type: 'itemGroup',
      title: t('Display fields'),
      children: fields
    }],
    component: /*#__PURE__*/React.createElement(MenuOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 12
      }
    })
  }))));
};