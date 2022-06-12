import { connect, mapProps, mapReadPretty, useField } from '@formily/react';
import { isValid } from '@formily/shared';
import { Radio as AntdRadio, Tag } from 'antd';
import React from 'react';
export var Radio = connect(AntdRadio, mapProps({
  value: 'checked',
  onInput: 'onChange'
}));
Radio.__ANT_RADIO = true;
Radio.Group = connect(AntdRadio.Group, mapProps({
  dataSource: 'options'
}), mapReadPretty(function (props) {
  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      value = props.value;
  var field = useField();
  var dataSource = field.dataSource || [];
  return /*#__PURE__*/React.createElement("div", null, dataSource.filter(function (option) {
    return option.value === value;
  }).map(function (option, key) {
    return /*#__PURE__*/React.createElement(Tag, {
      key: key,
      color: option.color
    }, option.label);
  }));
}));
export default Radio;