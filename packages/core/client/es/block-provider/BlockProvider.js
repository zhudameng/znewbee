var _excluded = ["title", "to"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField } from '@formily/react';
import { useRequest } from 'ahooks';
import template from 'lodash/template';
import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ACLCollectionProvider, TableFieldResource, useAPIClient, useRecord } from '../';
import { CollectionProvider, useCollection, useCollectionManager } from '../collection-manager';
import { useRecordIndex } from '../record-provider';
export var BlockResourceContext = /*#__PURE__*/createContext(null);
export var BlockAssociationContext = /*#__PURE__*/createContext(null);
var BlockRequestContext = /*#__PURE__*/createContext(null);
export var useBlockResource = function useBlockResource() {
  return useContext(BlockResourceContext);
};

var useAssociation = function useAssociation(props) {
  var association = props.association;

  var _useCollectionManager = useCollectionManager(),
      getCollectionField = _useCollectionManager.getCollectionField;

  if (typeof association === 'string') {
    return getCollectionField(association);
  } else if ((association === null || association === void 0 ? void 0 : association.collectionName) && (association === null || association === void 0 ? void 0 : association.name)) {
    return getCollectionField("".concat(association === null || association === void 0 ? void 0 : association.collectionName, ".").concat(association === null || association === void 0 ? void 0 : association.name));
  }
};

var useReousrce = function useReousrce(props) {
  var block = props.block,
      resource = props.resource,
      useSourceId = props.useSourceId;
  var record = useRecord();
  var api = useAPIClient();
  var association = useAssociation(props);
  var sourceId = useSourceId === null || useSourceId === void 0 ? void 0 : useSourceId();
  var field = useField();

  if (block === 'TableField') {
    var options = {
      field: field,
      api: api,
      resource: resource,
      sourceId: sourceId || record[(association === null || association === void 0 ? void 0 : association.sourceKey) || 'id']
    };
    return new TableFieldResource(options);
  }

  var __parent = useContext(BlockRequestContext);

  if ((__parent === null || __parent === void 0 ? void 0 : __parent.block) === 'TableField' && (__parent === null || __parent === void 0 ? void 0 : __parent.resource) instanceof TableFieldResource) {
    return __parent.resource;
  }

  if (!association) {
    return api.resource(resource);
  }

  if (sourceId) {
    return api.resource(resource, sourceId);
  }

  return api.resource(resource, record[(association === null || association === void 0 ? void 0 : association.sourceKey) || 'id']);
};

var useActionParams = function useActionParams(props) {
  var useParams = props.useParams;
  var params = (useParams === null || useParams === void 0 ? void 0 : useParams()) || {};
  return _objectSpread(_objectSpread({}, props.params), params);
};

export var useResourceAction = function useResourceAction(props) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var resource = props.resource,
      action = props.action;

  var _useCollection = useCollection(),
      fields = _useCollection.fields;

  var appends = fields === null || fields === void 0 ? void 0 : fields.filter(function (field) {
    return field.target;
  }).map(function (field) {
    return field.name;
  });
  var params = useActionParams(props);

  if (appends === null || appends === void 0 ? void 0 : appends.length) {
    params['appends'] = appends;
  }

  var result = useRequest(function (params) {
    return action ? resource[action](params).then(function (res) {
      return res.data;
    }) : Promise.resolve({});
  }, _objectSpread(_objectSpread({}, opts), {}, {
    defaultParams: [params]
  }));
  return result;
};

var MaybeCollectionProvider = function MaybeCollectionProvider(props) {
  var collection = props.collection;
  return collection ? /*#__PURE__*/React.createElement(CollectionProvider, {
    collection: collection
  }, /*#__PURE__*/React.createElement(ACLCollectionProvider, null, props.children)) : /*#__PURE__*/React.createElement(React.Fragment, null, props.children);
};

var BlockRequestProvider = function BlockRequestProvider(props) {
  var field = useField();
  var resource = useBlockResource();
  var service = useResourceAction(_objectSpread(_objectSpread({}, props), {}, {
    resource: resource
  }), _objectSpread({}, props.requestOptions));

  var __parent = useContext(BlockRequestContext);

  return /*#__PURE__*/React.createElement(BlockRequestContext.Provider, {
    value: {
      block: props.block,
      props: props,
      field: field,
      service: service,
      resource: resource,
      __parent: __parent
    }
  }, props.children);
};

export var useBlockRequestContext = function useBlockRequestContext() {
  return useContext(BlockRequestContext);
};
export var BlockProvider = function BlockProvider(props) {
  var collection = props.collection,
      association = props.association;
  var resource = useReousrce(props);
  return /*#__PURE__*/React.createElement(MaybeCollectionProvider, {
    collection: collection
  }, /*#__PURE__*/React.createElement(BlockAssociationContext.Provider, {
    value: association
  }, /*#__PURE__*/React.createElement(BlockResourceContext.Provider, {
    value: resource
  }, /*#__PURE__*/React.createElement(BlockRequestProvider, _objectSpread({}, props), props.children))));
};
export var useBlockAssociationContext = function useBlockAssociationContext() {
  return useContext(BlockAssociationContext);
};
export var useFilterByTk = function useFilterByTk() {
  var _useContext = useContext(BlockRequestContext),
      resource = _useContext.resource,
      __parent = _useContext.__parent;

  var recordIndex = useRecordIndex();
  var record = useRecord();
  var collection = useCollection();

  var _useCollectionManager2 = useCollectionManager(),
      getCollectionField = _useCollectionManager2.getCollectionField;

  var assoc = useContext(BlockAssociationContext);

  if (resource instanceof TableFieldResource || (__parent === null || __parent === void 0 ? void 0 : __parent.block) === 'TableField') {
    return recordIndex;
  }

  if (assoc) {
    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : record[association.targetKey || 'id'];
  }

  return record === null || record === void 0 ? void 0 : record[collection.filterTargetKey || 'id'];
};
export var useSourceIdFromRecord = function useSourceIdFromRecord() {
  var record = useRecord();

  var _useCollectionManager3 = useCollectionManager(),
      getCollectionField = _useCollectionManager3.getCollectionField;

  var assoc = useContext(BlockAssociationContext);

  if (assoc) {
    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : record[association.sourceKey || 'id'];
  }
};
export var useSourceIdFromParentRecord = function useSourceIdFromParentRecord() {
  var record = useRecord();

  var _useCollectionManager4 = useCollectionManager(),
      getCollectionField = _useCollectionManager4.getCollectionField;

  var assoc = useContext(BlockAssociationContext);

  if (assoc) {
    var _record$__parent;

    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : (_record$__parent = record.__parent) === null || _record$__parent === void 0 ? void 0 : _record$__parent[association.sourceKey || 'id'];
  }
};
export var useParamsFromRecord = function useParamsFromRecord() {
  var filterByTk = useFilterByTk();
  return {
    filterByTk: filterByTk
  };
};
export var RecordLink = function RecordLink(props) {
  var field = useField();
  var record = useRecord();

  var title = props.title,
      to = props.to,
      others = _objectWithoutProperties(props, _excluded);

  var compiled = template(to || '');
  return /*#__PURE__*/React.createElement(Link, _objectSpread(_objectSpread({}, others), {}, {
    to: compiled({
      record: record || {}
    })
  }), field.title);
};