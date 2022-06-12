"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workflowVersionDropdownClass = exports.workflowPageClass = exports.nodeTitleClass = exports.nodeSubtreeClass = exports.nodeMetaClass = exports.nodeHeaderClass = exports.nodeClass = exports.nodeCardClass = exports.nodeBlockClass = exports.branchClass = exports.branchBlockClass = exports.addButtonClass = void 0;

var _css = require("@emotion/css");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var workflowPageClass = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  overflow: auto;\n\n  .workflow-toolbar{\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.5rem 1rem;\n    background: #fff;\n\n    header{\n      display: flex;\n      align-items: center;\n      gap: .5em;\n    }\n\n    aside{\n      display: flex;\n      align-items: center;\n      gap: .5em;\n    }\n  }\n\n  .workflow-canvas{\n    width: min-content;\n    min-width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: 2em;\n  }\n"])));
exports.workflowPageClass = workflowPageClass;
var workflowVersionDropdownClass = (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  .ant-dropdown-menu-item{\n\n    &.unexecuted{\n      font-style: italic;\n    }\n\n    .ant-dropdown-menu-title-content{\n      text-align: right;\n\n      time{\n        margin-left: 0.5rem;\n        color: #999;\n        font-size: 80%;\n      }\n    }\n  }\n"])));
exports.workflowVersionDropdownClass = workflowVersionDropdownClass;
var branchBlockClass = (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  position: relative;\n\n  :before{\n    content: \"\";\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: calc(50% - .5px);\n    width: 1px;\n    background-color: #f0f2f5;\n  }\n"])));
exports.branchBlockClass = branchBlockClass;
var branchClass = (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  padding: 0 2em;\n\n  .workflow-node-list{\n    flex-grow: 1;\n    min-width: 20em;\n  }\n\n  .workflow-branch-lines{\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 1px;\n    background-color: #ddd;\n  }\n\n  :before,:after{\n    content: \"\";\n    position: absolute;\n    height: 1px;\n    background-color: #ddd;\n  }\n\n  :before{\n    top: 0;\n  }\n\n  :after{\n    bottom: 0;\n  }\n\n  :not(:first-child):not(:last-child){\n    :before,:after{\n      left: 0;\n      width: 100%;\n    }\n  }\n\n  :last-child:not(:first-child){\n    :before,:after{\n      right: 50%;\n      width: 50%;\n    }\n  }\n\n  :first-child:not(:last-child){\n    :before,:after{\n      left: 50%;\n      width: 50%;\n    }\n  }\n"])));
exports.branchClass = branchClass;
var nodeBlockClass = (0, _css.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n"])));
exports.nodeBlockClass = nodeBlockClass;
var nodeClass = (0, _css.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
exports.nodeClass = nodeClass;
var nodeCardClass = (0, _css.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 20em;\n  background: #fff;\n  padding: 1em;\n  box-shadow: 0 .25em .5em rgba(0, 0, 0, .1);\n\n  .workflow-node-remove-button{\n    position: absolute;\n    right: -.5em;\n    top: -.5em;\n    color: #999;\n    opacity: 0;\n    transition: opacity .3s ease;\n\n    &[disabled]{\n      display: none;\n    }\n\n    &:hover {\n      color: red;\n    }\n  }\n\n  &:hover{\n    .workflow-node-remove-button{\n      opacity: 1;\n    }\n  }\n"])));
exports.nodeCardClass = nodeCardClass;
var nodeHeaderClass = (0, _css.css)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  position: relative;\n"])));
exports.nodeHeaderClass = nodeHeaderClass;
var nodeMetaClass = (0, _css.css)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  margin-bottom: .5em;\n"])));
exports.nodeMetaClass = nodeMetaClass;
var nodeTitleClass = (0, _css.css)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  font-weight: normal;\n\n  .workflow-node-id{\n    color: #999;\n  }\n"])));
exports.nodeTitleClass = nodeTitleClass;
var nodeSubtreeClass = (0, _css.css)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n"])));
exports.nodeSubtreeClass = nodeSubtreeClass;
var addButtonClass = (0, _css.css)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  padding: 2em 0;\n"])));
exports.addButtonClass = addButtonClass;