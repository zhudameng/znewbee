var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import React from 'react';
import { useSystemSettings } from '../../../system-settings';
export function AuthLayout(props) {
  var _useSystemSettings = useSystemSettings(),
      data = _useSystemSettings.data;

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundImage: "url('http://zhudameng.natapp1.cc/storage/uploads/login-bg.png')",
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      margin: 'auto',
      maxWidth: 400,
      marginRight: '15%',
      paddingTop: '55vh'
    }
  }, props.children, /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          position: absolute;\n          left:0,\n          right:0,\n          bottom:0,\n          top:0,\n          margin:'auto',\n        "])))
  })));
}