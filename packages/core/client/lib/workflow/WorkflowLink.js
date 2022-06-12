"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkflowLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _reactRouterDom = require("react-router-dom");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkflowLink = function WorkflowLink() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useRecord = (0, _.useRecord)(),
      id = _useRecord.id;

  var _useActionContext = (0, _.useActionContext)(),
      setVisible = _useActionContext.setVisible;

  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/admin/plugins/workflows/".concat(id),
    onClick: function onClick() {
      return setVisible(false);
    }
  }, t('View'));
};

exports.WorkflowLink = WorkflowLink;