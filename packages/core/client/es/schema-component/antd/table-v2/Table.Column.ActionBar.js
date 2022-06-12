var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import { observer } from '@formily/react';
import React from 'react';
import { SortableItem, useDesigner } from '../..';
export var designerCss = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    color:green;\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06) !important;\n    border: 0 !important;\n    top: -16px !important;\n    bottom: -16px !important;\n    left: -16px !important;\n    right: -16px !important;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: green;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
export var TableColumnActionBar = observer(function (props) {
  var Designer = useDesigner();
  return /*#__PURE__*/React.createElement(SortableItem, {
    className: designerCss
  }, /*#__PURE__*/React.createElement(Designer, null), props.children);
});