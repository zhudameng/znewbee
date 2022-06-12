"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkflowPage = void 0;

var _css = require("@emotion/css");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("..");

var _style = require("./style");

var _WorkflowCanvas = require("./WorkflowCanvas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WorkflowPage = function WorkflowPage() {
  var _useRouteMatch = (0, _reactRouterDom.useRouteMatch)(),
      params = _useRouteMatch.params;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.workflowPageClass)
  }, /*#__PURE__*/_react.default.createElement(_.SchemaComponent, {
    schema: {
      type: 'void',
      properties: _defineProperty({}, "provider_".concat(params.id), {
        type: 'void',
        'x-decorator': 'ResourceActionProvider',
        'x-decorator-props': {
          collection: {
            name: 'workflows',
            fields: []
          },
          resourceName: 'workflows',
          request: {
            resource: 'workflows',
            action: 'get',
            params: {
              filter: params,
              appends: ['nodes', 'revisions.id', 'revisions.createdAt', 'revisions.current', 'revisions.executed']
            }
          }
        },
        'x-component': 'WorkflowCanvas'
      })
    },
    components: {
      WorkflowCanvas: _WorkflowCanvas.WorkflowCanvas
    }
  }));
};

exports.WorkflowPage = WorkflowPage;