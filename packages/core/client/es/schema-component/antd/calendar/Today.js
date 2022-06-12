import { observer } from '@formily/react';
import { Button } from 'antd';
import React, { useContext } from 'react';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../../hooks';
import { CalendarToolbarContext } from './context';
export var Today = observer(function (props) {
  var _useDesignable = useDesignable(),
      DesignableBar = _useDesignable.DesignableBar;

  var _useContext = useContext(CalendarToolbarContext),
      onNavigate = _useContext.onNavigate;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      onNavigate(navigate.TODAY);
    }
  }, t('Today'), /*#__PURE__*/React.createElement(DesignableBar, null));
});