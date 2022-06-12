var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import cls from 'classnames';
import React from 'react';
import { SortableItem } from '../../common';
import { useDesigner } from '../../hooks';
export var BlockItem = function BlockItem(props) {
  var Designer = useDesigner();
  return /*#__PURE__*/React.createElement(SortableItem, {
    className: cls('nb-block-item', props.className, css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          position: relative;\n          &:hover {\n           color:green;\n            > .general-schema-designer {\n              display: block;\n            }\n          }\n          &.nb-form-item:hover {\n            color:green;\n            > .general-schema-designer {\n              background: rgba(241, 139, 98, 0.06) !important;\n              border: 0 !important;\n              top: -5px !important;\n              bottom: -5px !important;\n              left: -5px !important;\n              right: -5px !important;\n            }\n          }\n          > .general-schema-designer {\n            position: absolute;\n            z-index: 999;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            display: none;\n            border: 2px solid rgba(241, 139, 98, 0.3);\n            pointer-events: none;\n            > .general-schema-designer-icons {\n              position: absolute;\n              right: 2px;\n              top: 2px;\n              line-height: 16px;\n              pointer-events: all;\n              .ant-space-item {\n                background-color: #f18b62;\n                color: #fff;\n                line-height: 16px;\n                width: 16px;\n                padding-left: 1px;\n              }\n            }\n          }\n        "]))))
  }, /*#__PURE__*/React.createElement(Designer, null), props.children);
};