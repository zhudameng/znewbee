var _templateObject;

var _excluded = ["footerNodeName"];

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { css } from '@emotion/css';
import { observer, RecursionField, SchemaExpressionScopeContext, useField, useFieldSchema } from '@formily/react';
import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useActionContext } from '.';

var useScope = function useScope(key) {
  var scope = useContext(SchemaExpressionScopeContext);
  return scope[key];
};

export var ActionPage = observer(function (props) {
  var _props$footerNodeName = props.footerNodeName,
      footerNodeName = _props$footerNodeName === void 0 ? 'Action.Page.Footer' : _props$footerNodeName,
      others = _objectWithoutProperties(props, _excluded);

  var _useActionContext = useActionContext(),
      containerRefKey = _useActionContext.containerRefKey,
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  var containerRef = useScope(containerRefKey);
  var schema = useFieldSchema();
  var field = useField();
  var footerSchema = schema.reduceProperties(function (buf, s) {
    if (s['x-component'] === footerNodeName) {
      return s;
    }

    return buf;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) && visible && /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] !== footerNodeName;
    }
  }), footerSchema && /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                  display: flex;\n                  /* justify-content: flex-end; */\n                  /* flex-direction: row-reverse; */\n                  width: 100%;\n                  .ant-btn {\n                    margin-right: 8px;\n                  }\n                "])))
  }, /*#__PURE__*/React.createElement(RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] === footerNodeName;
    }
  }))), containerRef === null || containerRef === void 0 ? void 0 : containerRef.current));
});
ActionPage.Footer = observer(function () {
  var field = useField();
  var schema = useFieldSchema();
  return /*#__PURE__*/React.createElement(RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
export default ActionPage;