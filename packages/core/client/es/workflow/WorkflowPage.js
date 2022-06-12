function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { cx } from '@emotion/css';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { SchemaComponent } from '..';
import { workflowPageClass } from './style';
import { WorkflowCanvas } from './WorkflowCanvas';
export var WorkflowPage = function WorkflowPage() {
  var _useRouteMatch = useRouteMatch(),
      params = _useRouteMatch.params;

  return /*#__PURE__*/React.createElement("div", {
    className: cx(workflowPageClass)
  }, /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: {
      type: 'void',
      properties: _defineProperty({}, "provider_".concat(params.id), {
        type: 'void',
        'x-decorator': 'ResourceActionProvider',
        'x-decorator-props': {
          collection: {
            name: 'workflows',
            fields: []
          },
          resourceName: 'workflows',
          request: {
            resource: 'workflows',
            action: 'get',
            params: {
              filter: params,
              appends: ['nodes', 'revisions.id', 'revisions.createdAt', 'revisions.current', 'revisions.executed']
            }
          }
        },
        'x-component': 'WorkflowCanvas'
      })
    },
    components: {
      WorkflowCanvas: WorkflowCanvas
    }
  }));
};