var _templateObject, _templateObject2;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { css, cx } from '@emotion/css';
import isHotkey from 'is-hotkey';
import React, { useCallback, useMemo } from 'react';
import { createEditor, Editor, Element as SlateElement, Node, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, useSlate, withReact } from 'slate-react';
import { EllipsisWithTooltip } from '../schema-component/antd/input/EllipsisWithTooltip';
import { Button, Icon, Toolbar } from './components';
var HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};
var LIST_TYPES = ['numbered-list', 'bulleted-list'];
var TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
var DEFAULT_VALUE = [{
  type: 'paragraph',
  children: [{
    text: ''
  }]
}];
export var RichText = function RichText(props) {
  var value = props.value,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
      className = props.className,
      readOnly = props.readOnly,
      _props$autop = props.autop,
      autop = _props$autop === void 0 ? true : _props$autop,
      ellipsis = props.ellipsis,
      onChange = props.onChange;
  var renderElement = useCallback(function (props) {
    return /*#__PURE__*/React.createElement(Element, _objectSpread({}, props));
  }, []);
  var renderLeaf = useCallback(function (props) {
    return /*#__PURE__*/React.createElement(Leaf, _objectSpread({}, props));
  }, []);
  var editor = useMemo(function () {
    return withHistory(withReact(createEditor()));
  }, []);
  var slateValue = useMemo(function () {
    editor.children = JSON.parse(JSON.stringify(value || DEFAULT_VALUE));
    Editor.normalize(editor, {
      force: true
    });
    return editor.children;
  }, [editor, value]);

  if (readOnly) {
    var slateContent = /*#__PURE__*/React.createElement(Slate, {
      editor: editor,
      value: slateValue
    }, /*#__PURE__*/React.createElement(Editable, {
      renderElement: renderElement,
      renderLeaf: renderLeaf,
      spellCheck: true,
      autoFocus: true,
      readOnly: readOnly
    }));
    var slatePlainText = serialize(slateValue);
    var content = /*#__PURE__*/React.createElement(EllipsisWithTooltip, {
      ellipsis: ellipsis,
      popoverContent: autop ? slateContent : slatePlainText
    }, ellipsis ? slatePlainText : slateContent);
    return content;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(className, 'slate', css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          border: solid 1px #d2d2d2;\n          border-radius: 2px;\n        "]))))
  }, /*#__PURE__*/React.createElement(Slate, {
    editor: editor,
    value: slateValue,
    onChange: onChange
  }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(MarkButton, {
    format: "bold",
    icon: "format_bold"
  }), /*#__PURE__*/React.createElement(MarkButton, {
    format: "italic",
    icon: "format_italic"
  }), /*#__PURE__*/React.createElement(MarkButton, {
    format: "underline",
    icon: "format_underlined"
  }), /*#__PURE__*/React.createElement(MarkButton, {
    format: "code",
    icon: "code"
  }), /*#__PURE__*/React.createElement(BlockButton, {
    format: "block-quote",
    icon: "format_quote"
  }), /*#__PURE__*/React.createElement(BlockButton, {
    format: "numbered-list",
    icon: "format_list_numbered"
  }), /*#__PURE__*/React.createElement(BlockButton, {
    format: "bulleted-list",
    icon: "format_list_bulleted"
  })), /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            padding: 5px 11px;\n          "])))
  }, /*#__PURE__*/React.createElement(Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    placeholder: placeholder,
    spellCheck: true,
    style: {
      minHeight: '10em'
    },
    readOnly: readOnly,
    onKeyDown: function onKeyDown(event) {
      for (var hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          var mark = HOTKEYS[hotkey];
          toggleMark(editor, mark);
        }
      }
    }
  }))));
};

var serialize = function serialize(nodes) {
  return nodes.map(function (n) {
    return Node.string(n);
  }).join('\n');
};

var toggleBlock = function toggleBlock(editor, format) {
  var isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
  var isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type) && !TEXT_ALIGN_TYPES.includes(format);
    },
    split: true
  });
  var newProperties;

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    };
  }

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    var block = {
      type: format,
      children: []
    };
    Transforms.wrapNodes(editor, block);
  }
};

var toggleMark = function toggleMark(editor, format) {
  var isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

var isBlockActive = function isBlockActive(editor, format) {
  var blockType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';
  var selection = editor.selection;
  if (!selection) return false;

  var _Array$from = Array.from(Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: function match(n) {
      return !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format;
    }
  })),
      _Array$from2 = _slicedToArray(_Array$from, 1),
      match = _Array$from2[0];

  return !!match;
};

var isMarkActive = function isMarkActive(editor, format) {
  var marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
  var style = {
    textAlign: element.align
  };

  switch (element.type) {
    case 'block-quote':
      return /*#__PURE__*/React.createElement("blockquote", _objectSpread({
        style: style
      }, attributes), children);

    case 'bulleted-list':
      return /*#__PURE__*/React.createElement("ul", _objectSpread({
        style: style
      }, attributes), children);

    case 'heading-one':
      return /*#__PURE__*/React.createElement("h1", _objectSpread({
        style: style
      }, attributes), children);

    case 'heading-two':
      return /*#__PURE__*/React.createElement("h2", _objectSpread({
        style: style
      }, attributes), children);

    case 'list-item':
      return /*#__PURE__*/React.createElement("li", _objectSpread({
        style: style
      }, attributes), children);

    case 'numbered-list':
      return /*#__PURE__*/React.createElement("ol", _objectSpread({
        style: style
      }, attributes), children);

    default:
      return /*#__PURE__*/React.createElement("p", _objectSpread({
        style: style
      }, attributes), children);
  }
};

var Leaf = function Leaf(_ref2) {
  var attributes = _ref2.attributes,
      children = _ref2.children,
      leaf = _ref2.leaf;

  if (leaf.bold) {
    children = /*#__PURE__*/React.createElement("strong", null, children);
  }

  if (leaf.code) {
    children = /*#__PURE__*/React.createElement("code", null, children);
  }

  if (leaf.italic) {
    children = /*#__PURE__*/React.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = /*#__PURE__*/React.createElement("u", null, children);
  }

  return /*#__PURE__*/React.createElement("span", _objectSpread({}, attributes), children);
};

var BlockButton = function BlockButton(_ref3) {
  var format = _ref3.format,
      icon = _ref3.icon;
  var editor = useSlate();
  return /*#__PURE__*/React.createElement(Button, {
    active: isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'),
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, /*#__PURE__*/React.createElement(Icon, null, icon));
};

var MarkButton = function MarkButton(_ref4) {
  var format = _ref4.format,
      icon = _ref4.icon;
  var editor = useSlate();
  return /*#__PURE__*/React.createElement(Button, {
    active: isMarkActive(editor, format),
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, /*#__PURE__*/React.createElement(Icon, null, icon));
};