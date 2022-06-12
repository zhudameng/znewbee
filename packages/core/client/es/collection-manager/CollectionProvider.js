import React from 'react';
import { CollectionContext } from './context';
import { useCollectionManager } from './hooks';
export var CollectionProvider = function CollectionProvider(props) {
  var allowNull = props.allowNull,
      name = props.name,
      collection = props.collection,
      children = props.children;

  var _useCollectionManager = useCollectionManager(),
      getCollection = _useCollectionManager.getCollection;

  var value = getCollection(collection || name);

  if (!value && !allowNull) {
    return null;
  }

  return /*#__PURE__*/React.createElement(CollectionContext.Provider, {
    value: value
  }, children);
};