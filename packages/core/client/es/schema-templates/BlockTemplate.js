import { observer, useField, useFieldSchema } from '@formily/react';
import React, { createContext, useContext, useMemo } from 'react';
import { RemoteSchemaComponent, useDesignable } from '..';
import { useSchemaTemplateManager } from './SchemaTemplateManagerProvider';
var BlockTemplateContext = /*#__PURE__*/createContext({});
export var useBlockTemplateContext = function useBlockTemplateContext() {
  return useContext(BlockTemplateContext);
};
export var BlockTemplate = observer(function (props) {
  var templateId = props.templateId;

  var _useSchemaTemplateMan = useSchemaTemplateManager(),
      getTemplateById = _useSchemaTemplateMan.getTemplateById;

  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var template = useMemo(function () {
    return getTemplateById(templateId);
  }, [templateId]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BlockTemplateContext.Provider, {
    value: {
      dn: dn,
      field: field,
      fieldSchema: fieldSchema,
      template: template
    }
  }, /*#__PURE__*/React.createElement(RemoteSchemaComponent, {
    noForm: true,
    uid: template === null || template === void 0 ? void 0 : template.uid
  })));
});