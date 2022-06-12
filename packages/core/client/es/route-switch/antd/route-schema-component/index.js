import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { RemoteSchemaComponent } from '../../../';
export function RouteSchemaComponent(props) {
  var match = useRouteMatch();
  return /*#__PURE__*/React.createElement(RemoteSchemaComponent, {
    onlyRenderProperties: true,
    uid: match.params.name
  });
}