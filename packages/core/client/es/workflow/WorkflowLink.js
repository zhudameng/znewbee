import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useActionContext, useRecord } from '..';
export var WorkflowLink = function WorkflowLink() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useRecord = useRecord(),
      id = _useRecord.id;

  var _useActionContext = useActionContext(),
      setVisible = _useActionContext.setVisible;

  return /*#__PURE__*/React.createElement(Link, {
    to: "/admin/plugins/workflows/".concat(id),
    onClick: function onClick() {
      return setVisible(false);
    }
  }, t('View'));
};