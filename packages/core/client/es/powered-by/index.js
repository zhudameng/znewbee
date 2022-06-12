var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import React from 'react';
import { useTranslation } from 'react-i18next';
export var PoweredBy = function PoweredBy() {
  var _useTranslation = useTranslation(),
      i18n = _useTranslation.i18n;

  var urls = {
    'en-US': 'https://www.znewbee.com',
    'zh-CN': 'https://cn.znewbee.com'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        text-align: center;\n        color: rgba(0, 0, 0, 0.45);\n        a {\n          color: rgba(0, 0, 0, 0.45);\n          &:hover {\n            color: rgba(0, 0, 0, 0.85);\n          }\n        }\n      "])))
  }, "\u7531\u4E91\u679C\u4EA7\u4E1A\u5927\u8111\u63D0\u4F9B\u6280\u672F\u652F\u6301\u3002");
};
