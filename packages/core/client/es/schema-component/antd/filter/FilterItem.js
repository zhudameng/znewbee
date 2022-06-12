import { CloseCircleOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import { Cascader, Select, Space } from 'antd';
import React, { useContext } from 'react';
import { useCompile } from '../..';
import { RemoveConditionContext } from './context';
import { DynamicComponent } from './DynamicComponent';
import { useValues } from './useValues';
export var FilterItem = observer(function (props) {
  var compile = useCompile();
  var remove = useContext(RemoveConditionContext);

  var _useValues = useValues(),
      schema = _useValues.schema,
      fields = _useValues.fields,
      operators = _useValues.operators,
      dataIndex = _useValues.dataIndex,
      operator = _useValues.operator,
      setDataIndex = _useValues.setDataIndex,
      setOperator = _useValues.setOperator,
      value = _useValues.value,
      setValue = _useValues.setValue;

  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement(Cascader, {
    fieldNames: {
      label: 'title',
      value: 'name',
      children: 'children'
    },
    style: {
      width: 150
    },
    changeOnSelect: false,
    value: dataIndex,
    options: compile(fields),
    onChange: function onChange(value) {
      setDataIndex(value);
    }
  }), /*#__PURE__*/React.createElement(Select, {
    value: operator === null || operator === void 0 ? void 0 : operator.value,
    options: compile(operators),
    onChange: function onChange(value) {
      setOperator(value);
    },
    style: {
      minWidth: 100
    }
  }), !(operator === null || operator === void 0 ? void 0 : operator.noValue) && /*#__PURE__*/React.createElement(DynamicComponent, {
    value: value,
    schema: schema,
    onChange: function onChange(value) {
      setValue(value);
    }
  }), /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement(CloseCircleOutlined, {
    onClick: function onClick() {
      return remove();
    },
    style: {
      color: '#bfbfbf'
    }
  }))));
});