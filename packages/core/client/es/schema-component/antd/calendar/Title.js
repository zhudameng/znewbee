import { observer } from '@formily/react';
import React, { useContext } from 'react';
import { useDesignable } from '../../hooks';
import { CalendarToolbarContext } from './context';
export var Title = observer(function () {
  var _useDesignable = useDesignable(),
      DesignableBar = _useDesignable.DesignableBar;

  var _useContext = useContext(CalendarToolbarContext),
      label = _useContext.label;

  return /*#__PURE__*/React.createElement("div", {
    className: "ant-btn-group",
    style: {
      fontSize: '1.75em',
      fontWeight: 300
    }
  }, label, /*#__PURE__*/React.createElement(DesignableBar, null));
});