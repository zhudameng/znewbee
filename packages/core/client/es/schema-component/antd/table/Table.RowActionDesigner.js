import { DragOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import { Space } from 'antd';
import React from 'react';
import { DragHandler } from '../../../schema-component';
import { useSchemaInitializer } from '../../../schema-initializer';
export var TableRowActionDesigner = function TableRowActionDesigner(props) {
  var fieldSchema = useFieldSchema();

  var _useSchemaInitializer = useSchemaInitializer(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  return /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer'
  }, /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/React.createElement(Space, {
    size: 2,
    align: 'center'
  }, /*#__PURE__*/React.createElement(DragHandler, null, /*#__PURE__*/React.createElement(DragOutlined, null)), render())));
};