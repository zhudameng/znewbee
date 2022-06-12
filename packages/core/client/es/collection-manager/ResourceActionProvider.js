function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField } from '@formily/react';
import React, { createContext, useContext, useEffect } from 'react';
import { useCollectionManager } from '.';
import { CollectionProvider, useRecord } from '..';
import { useAPIClient, useRequest } from '../api-client';
export var ResourceActionContext = /*#__PURE__*/createContext(null);
var ResourceContext = /*#__PURE__*/createContext(null);

var CollectionResourceActionProvider = function CollectionResourceActionProvider(props) {
  var _request$params, _collection$fields, _collection$fields$fi, _request$params2;

  var collection = props.collection,
      request = props.request,
      uid = props.uid,
      dragSort = props.dragSort;
  var api = useAPIClient();
  var record = useRecord();
  var actionName = request === null || request === void 0 ? void 0 : request.action;
  var others = {};

  if (actionName === 'get') {
    others['filterByTk'] = record[collection.targetKey || collection.filterTargetKey || 'id'];
  }

  var appends = (request === null || request === void 0 ? void 0 : (_request$params = request.params) === null || _request$params === void 0 ? void 0 : _request$params.appends) || [];
  var service = useRequest(_objectSpread(_objectSpread({}, request), {}, {
    params: _objectSpread(_objectSpread(_objectSpread({}, others), request === null || request === void 0 ? void 0 : request.params), {}, {
      appends: [].concat(_toConsumableArray(collection === null || collection === void 0 ? void 0 : (_collection$fields = collection.fields) === null || _collection$fields === void 0 ? void 0 : (_collection$fields$fi = _collection$fields.filter) === null || _collection$fields$fi === void 0 ? void 0 : _collection$fields$fi.call(_collection$fields, function (field) {
        return field.target;
      }).map(function (field) {
        return field.name;
      })), _toConsumableArray(appends)),
      sort: dragSort ? [collection.sortable === true ? 'sort' : collection.sortable] : request === null || request === void 0 ? void 0 : (_request$params2 = request.params) === null || _request$params2 === void 0 ? void 0 : _request$params2.sort
    })
  }), {
    uid: uid
  });
  var resource = api.resource(request.resource);
  return /*#__PURE__*/React.createElement(ResourceContext.Provider, {
    value: {
      type: 'collection',
      resource: resource,
      collection: collection
    }
  }, /*#__PURE__*/React.createElement(ResourceActionContext.Provider, {
    value: _objectSpread(_objectSpread({}, service), {}, {
      defaultRequest: request,
      dragSort: dragSort
    })
  }, /*#__PURE__*/React.createElement(CollectionProvider, {
    collection: collection
  }, props.children)));
};

var AssociationResourceActionProvider = function AssociationResourceActionProvider(props) {
  var _request$params3, _collection$fields2, _collection$fields2$f;

  var collection = props.collection,
      association = props.association,
      request = props.request,
      uid = props.uid,
      dragSort = props.dragSort;
  var api = useAPIClient();
  var record = useRecord();
  var resourceOf = record[association.sourceKey];
  var appends = (request === null || request === void 0 ? void 0 : (_request$params3 = request.params) === null || _request$params3 === void 0 ? void 0 : _request$params3.appends) || [];
  var service = useRequest(_objectSpread(_objectSpread({
    resourceOf: resourceOf
  }, request), {}, {
    params: _objectSpread(_objectSpread({}, request === null || request === void 0 ? void 0 : request.params), {}, {
      appends: [].concat(_toConsumableArray(collection === null || collection === void 0 ? void 0 : (_collection$fields2 = collection.fields) === null || _collection$fields2 === void 0 ? void 0 : (_collection$fields2$f = _collection$fields2.filter) === null || _collection$fields2$f === void 0 ? void 0 : _collection$fields2$f.call(_collection$fields2, function (field) {
        return field.target;
      }).map(function (field) {
        return field.name;
      })), _toConsumableArray(appends))
    })
  }), {
    uid: uid
  });
  var resource = api.resource(request.resource, resourceOf);
  return /*#__PURE__*/React.createElement(ResourceContext.Provider, {
    value: {
      type: 'association',
      resource: resource,
      association: association
    }
  }, /*#__PURE__*/React.createElement(ResourceActionContext.Provider, {
    value: _objectSpread(_objectSpread({}, service), {}, {
      defaultRequest: request,
      dragSort: dragSort
    })
  }, /*#__PURE__*/React.createElement(CollectionProvider, {
    collection: collection
  }, props.children)));
};

export var ResourceActionProvider = function ResourceActionProvider(props) {
  var _request$resource;

  var collection = props.collection,
      request = props.request;

  var _useCollectionManager = useCollectionManager(),
      getCollection = _useCollectionManager.getCollection;

  if (typeof collection === 'string') {
    collection = getCollection(collection);
  }

  if (!collection) {
    return null;
  }

  if (request === null || request === void 0 ? void 0 : (_request$resource = request.resource) === null || _request$resource === void 0 ? void 0 : _request$resource.includes('.')) {
    return /*#__PURE__*/React.createElement(AssociationResourceActionProvider, _objectSpread(_objectSpread({}, props), {}, {
      collection: collection
    }));
  }

  return /*#__PURE__*/React.createElement(CollectionResourceActionProvider, _objectSpread(_objectSpread({}, props), {}, {
    collection: collection
  }));
};
export var useResourceActionContext = function useResourceActionContext() {
  return useContext(ResourceActionContext);
};
export var useDataSourceFromRAC = function useDataSourceFromRAC(options) {
  var service = useContext(ResourceActionContext);
  var field = useField();
  useEffect(function () {
    if (!service.loading) {
      options === null || options === void 0 ? void 0 : options.onSuccess(service.data);
      field.componentProps.dragSort = !!service.dragSort;
    }
  }, [service.loading]);
  return service;
};
export var useResourceContext = function useResourceContext() {
  var _useContext = useContext(ResourceContext),
      type = _useContext.type,
      resource = _useContext.resource,
      collection = _useContext.collection,
      association = _useContext.association;

  return {
    type: type,
    resource: resource,
    collection: collection,
    association: association,
    targetKey: (association === null || association === void 0 ? void 0 : association.targetKey) || (collection === null || collection === void 0 ? void 0 : collection.targetKey) || 'id'
  };
};