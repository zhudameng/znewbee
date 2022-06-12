import { formatMomentValue, usePrefixCls } from '@formily/antd/lib/__builtins__';
import { isArr } from '@formily/shared';
import cls from 'classnames';
import moment from 'moment';
import React from 'react';
import { getDefaultFormat } from './util';
export var ReadPretty = function ReadPretty() {
  return null;
};

ReadPretty.DatePicker = function (props) {
  if (!props.value) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var prefixCls = usePrefixCls('description-date-picker', props);

  var getLabels = function getLabels() {
    var d = moment(props.value);
    var labels = formatMomentValue(d.isValid() ? d : null, getDefaultFormat(props), props.placeholder);
    return isArr(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className)
  }, getLabels());
};

ReadPretty.DateRangePicker = function (props) {
  var prefixCls = usePrefixCls('description-text', props);

  var getLabels = function getLabels() {
    var labels = formatMomentValue(props.value, props.format, props.placeholder);
    return isArr(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, getLabels());
};