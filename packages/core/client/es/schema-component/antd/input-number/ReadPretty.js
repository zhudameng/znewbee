import { isValid } from '@formily/shared';
import { toFixed } from 'rc-input-number/lib/utils/MiniDecimal';
import { getNumberPrecision } from 'rc-input-number/lib/utils/numberUtil';
import React from 'react';
export var ReadPretty = function ReadPretty(props) {
  var step = props.step,
      value = props.value,
      addonBefore = props.addonBefore,
      addonAfter = props.addonAfter;

  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var precision = Math.max(getNumberPrecision(String(value)), getNumberPrecision(step));
  return /*#__PURE__*/React.createElement("div", {
    className: 'nb-read-pretty-input-number'
  }, addonBefore, toFixed(String(value), '.', precision), addonAfter);
};