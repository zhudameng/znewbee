import get from 'lodash/get';
import { useContext } from 'react';
import { RouteContext, RouteSwitchContext } from './context';
export function useRouteComponent(name) {
  if (!name) {
    return function () {
      return null;
    };
  }

  if (typeof name !== 'string') {
    return name;
  }

  var _useContext = useContext(RouteSwitchContext),
      components = _useContext.components;

  return get(components, name) || function () {
    return null;
  };
}
export function useRoute() {
  return useContext(RouteContext);
}
export function useRoutes() {
  var _useContext2 = useContext(RouteSwitchContext),
      routes = _useContext2.routes;

  return routes || [];
}