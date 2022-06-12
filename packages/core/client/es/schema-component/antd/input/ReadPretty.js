import { usePrefixCls } from '@formily/antd/lib/__builtins__';
import cls from 'classnames';
import React from 'react';
import { useCompile } from '../..';
import { EllipsisWithTooltip } from './EllipsisWithTooltip';
import { HTMLEncode } from './shared';
export var ReadPretty = function ReadPretty() {
  return null;
};

ReadPretty.Input = function (props) {
  var prefixCls = usePrefixCls('description-input', props);
  var compile = useCompile();
  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, /*#__PURE__*/React.createElement(EllipsisWithTooltip, {
    ellipsis: props.ellipsis
  }, compile(props.value)), props.suffix, props.addonAfter);
};

ReadPretty.TextArea = function (props) {
  var _props$value;

  var prefixCls = usePrefixCls('description-textarea', props);
  var compile = useCompile();
  var value = compile((_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : '');
  var _props$autop = props.autop,
      autop = _props$autop === void 0 ? true : _props$autop,
      ellipsis = props.ellipsis,
      text = props.text;
  var html = /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: HTMLEncode(value).split('\n').join('<br/>')
    }
  });
  console.log('value', value);
  var content = /*#__PURE__*/React.createElement(EllipsisWithTooltip, {
    ellipsis: ellipsis,
    popoverContent: autop ? html : value
  }, ellipsis ? text || value : html);
  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};

function convertToText(html) {
  var temp = document.createElement('div');
  temp.innerHTML = html;
  var text = temp.innerText;
  temp = null;
  return text.replace(/[\n\r]/g, '');
}

ReadPretty.Html = function (props) {
  var _props$value2;

  var prefixCls = usePrefixCls('description-textarea', props);
  var compile = useCompile();
  var value = compile((_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : '');
  var _props$autop2 = props.autop,
      autop = _props$autop2 === void 0 ? true : _props$autop2,
      ellipsis = props.ellipsis;
  var html = /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: value
    }
  });
  var text = convertToText(value);
  var content = /*#__PURE__*/React.createElement(EllipsisWithTooltip, {
    ellipsis: ellipsis,
    popoverContent: autop ? html : value
  }, ellipsis ? text : html);
  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};

ReadPretty.URL = function (props) {
  var prefixCls = usePrefixCls('description-url', props);
  var content = props.value && /*#__PURE__*/React.createElement("a", {
    target: '_blank',
    href: props.value
  }, props.value);
  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};