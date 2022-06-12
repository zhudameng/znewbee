import { observer } from '@formily/react';
import { Select } from 'antd';
import React, { useContext } from 'react';
import { useDesignable } from '../../hooks';
import { CalendarToolbarContext } from './context';
export var ViewSelect = observer(function (props) {
  var _useDesignable = useDesignable(),
      DesignableBar = _useDesignable.DesignableBar;

  var _useContext = useContext(CalendarToolbarContext),
      views = _useContext.views,
      view = _useContext.view,
      onView = _useContext.onView,
      messages = _useContext.localizer.messages;

  return /*#__PURE__*/React.createElement("div", {
    className: "ant-btn-group"
  }, /*#__PURE__*/React.createElement(Select, {
    value: view,
    onChange: onView
  }, views.map(function (name) {
    return /*#__PURE__*/React.createElement(Select.Option, {
      value: name
    }, messages[name]);
  })), /*#__PURE__*/React.createElement(DesignableBar, null));
});