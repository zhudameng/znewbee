"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteSchemaComponent = RouteSchemaComponent;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("../../../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RouteSchemaComponent(props) {
  var match = (0, _reactRouterDom.useRouteMatch)();
  return /*#__PURE__*/_react.default.createElement(_.RemoteSchemaComponent, {
    onlyRenderProperties: true,
    uid: match.params.name
  });
}