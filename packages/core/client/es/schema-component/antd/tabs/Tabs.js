var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { Tabs as AntdTabs } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useSchemaInitializer } from '../../../schema-initializer';
import { DndContext, SortableItem } from '../../common';
import { useDesigner } from '../../hooks/useDesigner';
import { TabsDesigner } from './Tabs.Designer';
export var Tabs = observer(function (props) {
  var fieldSchema = useFieldSchema();

  var _useSchemaInitializer = useSchemaInitializer(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  return /*#__PURE__*/React.createElement(DndContext, null, /*#__PURE__*/React.createElement(AntdTabs, {
    tabBarExtraContent: {
      right: render()
    }
  }, fieldSchema.mapProperties(function (schema, key) {
    return /*#__PURE__*/React.createElement(AntdTabs.TabPane, {
      tab: /*#__PURE__*/React.createElement(RecursionField, {
        name: key,
        schema: schema,
        onlyRenderSelf: true
      }),
      key: key
    }, /*#__PURE__*/React.createElement(RecursionField, {
      name: key,
      schema: schema,
      onlyRenderProperties: true
    }));
  })));
});
var designerCss = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    color:#44a85d;\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    color:#31b989;\n    font:16px bold;\n    > .general-schema-designer {\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06);\n    border: 0;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: green;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
Tabs.TabPane = observer(function (props) {
  var Designer = useDesigner();
  var field = useField();
  return /*#__PURE__*/React.createElement(SortableItem, {
    className: classNames('nb-action-link', designerCss, props.className)
  }, props.tab || field.title, /*#__PURE__*/React.createElement(Designer, null));
});
Tabs.Designer = TabsDesigner;