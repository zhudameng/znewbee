"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSourceIdFromRecord = exports.useSourceIdFromParentRecord = exports.useResourceAction = exports.useParamsFromRecord = exports.useFilterByTk = exports.useBlockResource = exports.useBlockRequestContext = exports.useBlockAssociationContext = exports.RecordLink = exports.BlockResourceContext = exports.BlockProvider = exports.BlockAssociationContext = void 0;

var _react = require("@formily/react");

var _ahooks = require("ahooks");

var _template = _interopRequireDefault(require("lodash/template"));

var _react2 = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("../");

var _collectionManager = require("../collection-manager");

var _recordProvider = require("../record-provider");

var _excluded = ["title", "to"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BlockResourceContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.BlockResourceContext = BlockResourceContext;
var BlockAssociationContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.BlockAssociationContext = BlockAssociationContext;
var BlockRequestContext = /*#__PURE__*/(0, _react2.createContext)(null);

var useBlockResource = function useBlockResource() {
  return (0, _react2.useContext)(BlockResourceContext);
};

exports.useBlockResource = useBlockResource;

var useAssociation = function useAssociation(props) {
  var association = props.association;

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
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
  var record = (0, _.useRecord)();
  var api = (0, _.useAPIClient)();
  var association = useAssociation(props);
  var sourceId = useSourceId === null || useSourceId === void 0 ? void 0 : useSourceId();
  var field = (0, _react.useField)();

  if (block === 'TableField') {
    var options = {
      field: field,
      api: api,
      resource: resource,
      sourceId: sourceId || record[(association === null || association === void 0 ? void 0 : association.sourceKey) || 'id']
    };
    return new _.TableFieldResource(options);
  }

  var __parent = (0, _react2.useContext)(BlockRequestContext);

  if ((__parent === null || __parent === void 0 ? void 0 : __parent.block) === 'TableField' && (__parent === null || __parent === void 0 ? void 0 : __parent.resource) instanceof _.TableFieldResource) {
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

var useResourceAction = function useResourceAction(props) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var resource = props.resource,
      action = props.action;

  var _useCollection = (0, _collectionManager.useCollection)(),
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

  var result = (0, _ahooks.useRequest)(function (params) {
    return action ? resource[action](params).then(function (res) {
      return res.data;
    }) : Promise.resolve({});
  }, _objectSpread(_objectSpread({}, opts), {}, {
    defaultParams: [params]
  }));
  return result;
};

exports.useResourceAction = useResourceAction;

var MaybeCollectionProvider = function MaybeCollectionProvider(props) {
  var collection = props.collection;
  return collection ? /*#__PURE__*/_react2.default.createElement(_collectionManager.CollectionProvider, {
    collection: collection
  }, /*#__PURE__*/_react2.default.createElement(_.ACLCollectionProvider, null, props.children)) : /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
};

var BlockRequestProvider = function BlockRequestProvider(props) {
  var field = (0, _react.useField)();
  var resource = useBlockResource();
  var service = useResourceAction(_objectSpread(_objectSpread({}, props), {}, {
    resource: resource
  }), _objectSpread({}, props.requestOptions));

  var __parent = (0, _react2.useContext)(BlockRequestContext);

  return /*#__PURE__*/_react2.default.createElement(BlockRequestContext.Provider, {
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

var useBlockRequestContext = function useBlockRequestContext() {
  return (0, _react2.useContext)(BlockRequestContext);
};

exports.useBlockRequestContext = useBlockRequestContext;

var BlockProvider = function BlockProvider(props) {
  var collection = props.collection,
      association = props.association;
  var resource = useReousrce(props);
  return /*#__PURE__*/_react2.default.createElement(MaybeCollectionProvider, {
    collection: collection
  }, /*#__PURE__*/_react2.default.createElement(BlockAssociationContext.Provider, {
    value: association
  }, /*#__PURE__*/_react2.default.createElement(BlockResourceContext.Provider, {
    value: resource
  }, /*#__PURE__*/_react2.default.createElement(BlockRequestProvider, _objectSpread({}, props), props.children))));
};

exports.BlockProvider = BlockProvider;

var useBlockAssociationContext = function useBlockAssociationContext() {
  return (0, _react2.useContext)(BlockAssociationContext);
};

exports.useBlockAssociationContext = useBlockAssociationContext;

var useFilterByTk = function useFilterByTk() {
  var _useContext = (0, _react2.useContext)(BlockRequestContext),
      resource = _useContext.resource,
      __parent = _useContext.__parent;

  var recordIndex = (0, _recordProvider.useRecordIndex)();
  var record = (0, _.useRecord)();
  var collection = (0, _collectionManager.useCollection)();

  var _useCollectionManager2 = (0, _collectionManager.useCollectionManager)(),
      getCollectionField = _useCollectionManager2.getCollectionField;

  var assoc = (0, _react2.useContext)(BlockAssociationContext);

  if (resource instanceof _.TableFieldResource || (__parent === null || __parent === void 0 ? void 0 : __parent.block) === 'TableField') {
    return recordIndex;
  }

  if (assoc) {
    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : record[association.targetKey || 'id'];
  }

  return record === null || record === void 0 ? void 0 : record[collection.filterTargetKey || 'id'];
};

exports.useFilterByTk = useFilterByTk;

var useSourceIdFromRecord = function useSourceIdFromRecord() {
  var record = (0, _.useRecord)();

  var _useCollectionManager3 = (0, _collectionManager.useCollectionManager)(),
      getCollectionField = _useCollectionManager3.getCollectionField;

  var assoc = (0, _react2.useContext)(BlockAssociationContext);

  if (assoc) {
    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : record[association.sourceKey || 'id'];
  }
};

exports.useSourceIdFromRecord = useSourceIdFromRecord;

var useSourceIdFromParentRecord = function useSourceIdFromParentRecord() {
  var record = (0, _.useRecord)();

  var _useCollectionManager4 = (0, _collectionManager.useCollectionManager)(),
      getCollectionField = _useCollectionManager4.getCollectionField;

  var assoc = (0, _react2.useContext)(BlockAssociationContext);

  if (assoc) {
    var _record$__parent;

    var association = getCollectionField(assoc);
    return record === null || record === void 0 ? void 0 : (_record$__parent = record.__parent) === null || _record$__parent === void 0 ? void 0 : _record$__parent[association.sourceKey || 'id'];
  }
};

exports.useSourceIdFromParentRecord = useSourceIdFromParentRecord;

var useParamsFromRecord = function useParamsFromRecord() {
  var filterByTk = useFilterByTk();
  return {
    filterByTk: filterByTk
  };
};

exports.useParamsFromRecord = useParamsFromRecord;

var RecordLink = function RecordLink(props) {
  var field = (0, _react.useField)();
  var record = (0, _.useRecord)();

  var title = props.title,
      to = props.to,
      others = _objectWithoutProperties(props, _excluded);

  var compiled = (0, _template.default)(to || '');
  return /*#__PURE__*/_react2.default.createElement(_reactRouterDom.Link, _objectSpread(_objectSpread({}, others), {}, {
    to: compiled({
      record: record || {}
    })
  }), field.title);
};

exports.RecordLink = RecordLink;