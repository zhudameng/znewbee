"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require("../..");

var _calculators = require("../calculators");

var _collection = require("../schemas/collection");

var _default = {
  title: '{{t("Delete record")}}',
  type: 'destroy',
  group: 'collection',
  fieldset: {
    'config.collection': _collection.collection,
    'config.params': {
      type: 'object',
      name: 'config.params',
      title: '',
      'x-decorator': 'FormItem',
      properties: {
        filter: _collection.filter
      }
    }
  },
  view: {},
  scope: {
    useCollectionDataSource: _.useCollectionDataSource
  },
  components: {
    VariableComponent: _calculators.VariableComponent
  }
};
exports.default = _default;