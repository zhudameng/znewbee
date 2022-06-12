import { useFieldSchema } from '@formily/react';
import { useComponent, useDesignable } from '.';

var Def = function Def() {
  return null;
};

export var useDesigner = function useDesigner() {
  var _useDesignable = useDesignable(),
      designable = _useDesignable.designable;

  var fieldSchema = useFieldSchema();
  var component = useComponent(fieldSchema['x-designer'], Def);
  return designable ? component : Def;
};