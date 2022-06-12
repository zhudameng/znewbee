var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NodeDefaultView } from ".";
import { Branch, useFlowContext } from "../WorkflowCanvas";
import { branchBlockClass, nodeSubtreeClass } from "../style";
import { Button, Tooltip } from "antd";
import { i18n } from "../../i18n";
import { useTranslation } from "react-i18next"; // import { SchemaComponent } from "../../schema-component";

export default {
  title: '{{t("Parallel branch")}}',
  type: 'parallel',
  group: 'control',
  fieldset: {
    'config.mode': {
      type: 'string',
      name: 'config.mode',
      title: '{{t("Mode")}}',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {},
      enum: [{
        value: 'all',
        label: /*#__PURE__*/React.createElement(Tooltip, {
          title: i18n.t('Continue after all branches succeeded'),
          placement: "bottom"
        }, i18n.t('All succeeded'), " ", /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
          style: {
            color: '#999'
          }
        }))
      }, {
        value: 'any',
        label: /*#__PURE__*/React.createElement(Tooltip, {
          title: i18n.t('Continue after any branch succeeded'),
          placement: "bottom"
        }, i18n.t('Any succeeded'), " ", /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
          style: {
            color: '#999'
          }
        }))
      } // { value: 'race', label: '任意退出' },
      ],
      default: 'all'
    }
  },
  view: {},
  render: function render(data) {
    var id = data.id,
        mode = data.config.mode;

    var _useTranslation = useTranslation(),
        t = _useTranslation.t;

    var _useFlowContext = useFlowContext(),
        nodes = _useFlowContext.nodes;

    var branches = nodes.reduce(function (result, node) {
      if (node.upstreamId === id && node.branchIndex != null) {
        return result.concat(node);
      }

      return result;
    }, []).sort(function (a, b) {
      return a.branchIndex - b.branchIndex;
    });

    var _useState = useState(Math.max(2, branches.length)),
        _useState2 = _slicedToArray(_useState, 2),
        branchCount = _useState2[0],
        setBranchCount = _useState2[1];

    var tempBranches = Array(Math.max(0, branchCount - branches.length)).fill(null);
    var lastBranchHead = branches[branches.length - 1];
    return /*#__PURE__*/React.createElement(NodeDefaultView, {
      data: data
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(nodeSubtreeClass)
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(branchBlockClass)
    }, branches.map(function (branch) {
      return /*#__PURE__*/React.createElement(Branch, {
        key: branch.id,
        from: data,
        entry: branch,
        branchIndex: branch.branchIndex
      });
    }), tempBranches.map(function (_, i) {
      return /*#__PURE__*/React.createElement(Branch, {
        key: "temp_".concat(branches.length + i),
        from: data,
        branchIndex: (lastBranchHead ? lastBranchHead.branchIndex : 0) + i + 1,
        controller: branches.length + i > 1 ? /*#__PURE__*/React.createElement("div", {
          className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                        padding-top: 2em;\n\n                        > button{\n                          .anticon{\n                            transform: rotate(45deg)\n                          }\n                        }\n                      "])))
        }, /*#__PURE__*/React.createElement(Button, {
          shape: "circle",
          icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
          onClick: function onClick() {
            return setBranchCount(branchCount - 1);
          }
        })) : null
      });
    })), /*#__PURE__*/React.createElement("div", {
      className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n              position: relative;\n              height: 2em;\n            "])))
    }, /*#__PURE__*/React.createElement(Tooltip, {
      title: t('Add branch')
    }, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
      className: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n                  position: absolute;\n                  top: calc(50% - 1px);\n                  transform: translateX(-50%) rotate(45deg);\n\n                  .anticon{\n                    transform: rotate(-45deg);\n                  }\n                "]))),
      onClick: function onClick() {
        return setBranchCount(branchCount + 1);
      }
    })))));
  }
};