import { HighlightOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '..';
import { PluginManager } from '../../plugin-manager';
export var DesignableSwitch = function DesignableSwitch() {
  var _useDesignable = useDesignable(),
      designable = _useDesignable.designable,
      setDesignable = _useDesignable.setDesignable;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var style = {};

  if (designable) {
    style['backgroundColor'] = '#f18b62';
  }

  return /*#__PURE__*/React.createElement(PluginManager.Toolbar.Item, {
    selected: designable,
    icon: /*#__PURE__*/React.createElement(HighlightOutlined, null),
    title: t('UI Editor'),
    style: style,
    onClick: function onClick() {
      setDesignable(!designable);
    }
  });
};