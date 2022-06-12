import React from 'react';
import { DragHandler } from '../../common';
import { useDesignable } from '../../hooks';
export var TestDesigner = function TestDesigner() {
  var _useDesignable = useDesignable(),
      remove = _useDesignable.remove;

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      remove();
    }
  }, "\u5220\u9664"), /*#__PURE__*/React.createElement(DragHandler, null));
};