function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useField, useFieldSchema } from '@formily/react';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import { useBlockRequestContext } from '../../../block-provider';
import { useCollection, useCollectionManager } from '../../../collection-manager';
export var useFilterOptions = function useFilterOptions(collectionName) {
  var _fieldSchema$xCompon;

  var fieldSchema = useFieldSchema();
  var nonfilterable = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon.nonfilterable) || [];

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields,
      getInterface = _useCollectionManager.getInterface;

  var fields = getCollectionFields(collectionName);

  var field2option = function field2option(field, depth) {
    var _field$uiSchema, _operators$filter;

    if (nonfilterable.length && depth === 1 && nonfilterable.includes(field.name)) {
      return;
    }

    if (!field.interface) {
      return;
    }

    var fieldInterface = getInterface(field.interface);

    if (!fieldInterface.filterable) {
      return;
    }

    var _fieldInterface$filte = fieldInterface.filterable,
        nested = _fieldInterface$filte.nested,
        children = _fieldInterface$filte.children,
        operators = _fieldInterface$filte.operators;
    var option = {
      name: field.name,
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name,
      schema: field === null || field === void 0 ? void 0 : field.uiSchema,
      operators: (operators === null || operators === void 0 ? void 0 : (_operators$filter = operators.filter) === null || _operators$filter === void 0 ? void 0 : _operators$filter.call(operators, function (operator) {
        return !(operator === null || operator === void 0 ? void 0 : operator.visible) || operator.visible(field);
      })) || []
    };

    if (field.target && depth > 2) {
      return;
    }

    if (depth > 2) {
      return option;
    }

    if (children === null || children === void 0 ? void 0 : children.length) {
      option['children'] = children;
    }

    if (nested) {
      var _option$children;

      var targetFields = getCollectionFields(field.target);
      var options = getOptions(targetFields, depth + 1).filter(Boolean);
      option['children'] = option['children'] || [];

      (_option$children = option['children']).push.apply(_option$children, _toConsumableArray(options));
    }

    return option;
  };

  var getOptions = function getOptions(fields, depth) {
    var options = [];
    fields.forEach(function (field) {
      var option = field2option(field, depth);

      if (option) {
        options.push(option);
      }
    });
    return options;
  };

  return getOptions(fields, 1);
};

var isEmpty = function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

var removeNullCondition = function removeNullCondition(filter) {
  var items = flat(filter || {});
  var values = {};

  for (var key in items) {
    var value = items[key];

    if (value !== null && !isEmpty(value)) {
      values[key] = value;
    }
  }

  return flat.unflatten(values);
};

export var mergeFilter = function mergeFilter(filter1, filter2) {
  if (filter1 && filter2) {
    return {
      $and: [filter1, filter2]
    };
  }

  if (!filter1 && filter2) {
    return filter2;
  }

  if (filter1 && !filter2) {
    return filter1;
  }

  return {};
};
export var useFilterActionProps = function useFilterActionProps() {
  var _useCollection = useCollection(),
      name = _useCollection.name;

  var options = useFilterOptions(name);

  var _useBlockRequestConte = useBlockRequestContext(),
      service = _useBlockRequestConte.service,
      props = _useBlockRequestConte.props;

  var field = useField();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return {
    options: options,
    onSubmit: function onSubmit(values) {
      var _service$params;

      // filter parameter for the block
      var defaultFilter = removeNullCondition(props.params.filter); // filter parameter for the filter action

      var filter = removeNullCondition(values === null || values === void 0 ? void 0 : values.filter);
      service.run(_objectSpread(_objectSpread({}, (_service$params = service.params) === null || _service$params === void 0 ? void 0 : _service$params[0]), {}, {
        page: 1,
        filter: mergeFilter(defaultFilter, filter)
      }));
      var items = (filter === null || filter === void 0 ? void 0 : filter.$and) || (filter === null || filter === void 0 ? void 0 : filter.$or);

      if (items === null || items === void 0 ? void 0 : items.length) {
        field.title = t('{{count}} filter items', {
          count: (items === null || items === void 0 ? void 0 : items.length) || 0
        });
      } else {
        field.title = t('Filter');
      }
    },
    onReset: function onReset() {
      var _service$params2;

      var filter = removeNullCondition(props.params.filter);
      service.run(_objectSpread(_objectSpread({}, (_service$params2 = service.params) === null || _service$params2 === void 0 ? void 0 : _service$params2[0]), {}, {
        filter: filter,
        page: 1
      }));
      field.title = t('Filter');
    }
  };
};