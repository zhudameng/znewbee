import { formatMomentValue, usePrefixCls } from '@formily/antd/lib/__builtins__';
import { isArr } from '@formily/shared';
import cls from 'classnames';
import React from 'react';
export var ReadPretty = function ReadPretty(props) {
  var placeholder = props.placeholder;
  var prefixCls = usePrefixCls('description-text', props);

  var getLabels = function getLabels() {
    var labels = formatMomentValue(props.value, props.format, placeholder);
    return isArr(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, getLabels());
};