import React from 'react';
import { CollectionFieldContext } from './context';
import { useCollection } from './hooks';
export var CollectionFieldProvider = function CollectionFieldProvider(props) {
  var name = props.name,
      field = props.field,
      children = props.children;

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var value = field || getField((field === null || field === void 0 ? void 0 : field.name) || name);

  if (!value) {
    return null;
  }

  return /*#__PURE__*/React.createElement(CollectionFieldContext.Provider, {
    value: value
  }, children);
};