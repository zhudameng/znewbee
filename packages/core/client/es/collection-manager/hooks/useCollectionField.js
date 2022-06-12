function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useContext } from 'react';
import { useAPIClient } from '../../api-client';
import { useRecord } from '../../record-provider';
import { useCompile } from '../../schema-component';
import { CollectionFieldContext } from '../context';
import { useCollection } from './useCollection';
export var useCollectionField = function useCollectionField() {
  var collection = useCollection();
  var record = useRecord();
  var api = useAPIClient();
  var compile = useCompile();
  var ctx = useContext(CollectionFieldContext);

  if (!ctx) {
    return {};
  }

  var resourceName = "".concat((ctx === null || ctx === void 0 ? void 0 : ctx.collectionName) || (collection === null || collection === void 0 ? void 0 : collection.name), ".").concat(ctx.name);
  var resource = api === null || api === void 0 ? void 0 : api.resource(resourceName, record[ctx.sourceKey]);
  return _objectSpread(_objectSpread({}, ctx), {}, {
    uiSchema: compile(ctx.uiSchema),
    resource: resource
  });
};