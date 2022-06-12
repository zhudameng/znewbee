import { usePrefixCls } from '@formily/antd/lib/__builtins__';
import { observer, useField } from '@formily/react';
import { isArr } from '@formily/shared';
import { Tag } from 'antd';
import cls from 'classnames';
import React from 'react';
export var ReadPretty = observer(function (props) {
  var _field$dataSource, _props$treeData;

  var field = useField();
  var placeholder = props.placeholder;
  var prefixCls = usePrefixCls('description-tree-select', props);
  var dataSource = (field === null || field === void 0 ? void 0 : (_field$dataSource = field.dataSource) === null || _field$dataSource === void 0 ? void 0 : _field$dataSource.length) ? field.dataSource : (props === null || props === void 0 ? void 0 : (_props$treeData = props.treeData) === null || _props$treeData === void 0 ? void 0 : _props$treeData.length) ? props.treeData : [];

  var getSelected = function getSelected() {
    var value = props.value;

    if (props.multiple) {
      if (props.labelInValue) {
        return isArr(value) ? value : [];
      } else {
        return isArr(value) ? value.map(function (val) {
          return {
            label: val,
            value: val
          };
        }) : [];
      }
    } else {
      if (props.labelInValue) {
        return value ? [value] : [];
      } else {
        return value ? [{
          label: value,
          value: value
        }] : [];
      }
    }
  };

  var findLabel = function findLabel(value, dataSource) {
    for (var i = 0; i < (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length); i++) {
      var item = dataSource[i];

      if ((item === null || item === void 0 ? void 0 : item.value) === value) {
        return item === null || item === void 0 ? void 0 : item.label;
      } else {
        var childLabel = findLabel(value, item === null || item === void 0 ? void 0 : item.children);
        if (childLabel) return childLabel;
      }
    }
  };

  var getLabels = function getLabels() {
    var selected = getSelected();
    if (!(selected === null || selected === void 0 ? void 0 : selected.length)) return /*#__PURE__*/React.createElement(Tag, null, placeholder);
    return selected.map(function (_ref, key) {
      var value = _ref.value,
          label = _ref.label;
      return /*#__PURE__*/React.createElement(Tag, {
        key: key
      }, findLabel(value, dataSource) || label || placeholder);
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefixCls, props.className),
    style: props.style
  }, getLabels());
});