import React from 'react';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
export var TableArrayDesigner = function TableArrayDesigner() {
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, null, /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};