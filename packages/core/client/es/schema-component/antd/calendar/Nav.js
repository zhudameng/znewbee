import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import { Button } from 'antd';
import React, { useContext } from 'react';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { useDesignable } from '../../hooks';
import { CalendarToolbarContext } from './context';
export var Nav = observer(function (props) {
  var _useDesignable = useDesignable(),
      DesignableBar = _useDesignable.DesignableBar;

  var _useContext = useContext(CalendarToolbarContext),
      onNavigate = _useContext.onNavigate;

  return /*#__PURE__*/React.createElement("div", {
    className: "ant-btn-group"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(LeftOutlined, null),
    onClick: function onClick() {
      return onNavigate(navigate.PREVIOUS);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(RightOutlined, null),
    onClick: function onClick() {
      return onNavigate(navigate.NEXT);
    }
  }), /*#__PURE__*/React.createElement(DesignableBar, null));
});