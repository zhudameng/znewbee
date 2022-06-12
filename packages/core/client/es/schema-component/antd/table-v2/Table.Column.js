import { useField } from '@formily/react';
import React from 'react';
export var TableColumn = function TableColumn(props) {
  var field = useField();
  return /*#__PURE__*/React.createElement("div", null, field.title);
};