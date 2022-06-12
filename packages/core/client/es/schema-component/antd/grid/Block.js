import { observer, useFieldSchema } from '@formily/react';
import React from 'react';
import { DragHandler } from '../../';
export var Block = observer(function (props) {
  var fieldSchema = useFieldSchema();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20,
      padding: '0 20px',
      height: 50,
      lineHeight: '50px',
      background: '#f1f1f1'
    }
  }, "Block ", fieldSchema.title, /*#__PURE__*/React.createElement(DragHandler, null));
});