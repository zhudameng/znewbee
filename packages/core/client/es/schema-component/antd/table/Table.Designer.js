import React from 'react';
import { useCollection } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
export var TableDesigner = function TableDesigner() {
  var _useCollection = useCollection(),
      name = _useCollection.name,
      title = _useCollection.title;

  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};