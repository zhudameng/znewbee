import { ObjectField, observer, useField } from '@formily/react';
import React from 'react';
import { RemoveConditionContext } from './context';
import { FilterGroup } from './FilterGroup';
import { FilterItem } from './FilterItem';
export var FilterItems = observer(function (props) {
  var _field$value;

  var field = useField();
  return /*#__PURE__*/React.createElement("div", null, field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.map(function (item, index) {
    return /*#__PURE__*/React.createElement(RemoveConditionContext.Provider, {
      value: function value() {
        return field.remove(index);
      }
    }, /*#__PURE__*/React.createElement(ObjectField, {
      name: index,
      component: [item.$and || item.$or ? FilterGroup : FilterItem]
    }));
  }));
});