"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollectionDataSource = useCollectionDataSource;

var _reactive = require("@formily/reactive");

var _ = require(".");

var _schemaComponent = require("../../schema-component");

function useCollectionDataSource() {
  return function (field) {
    var compile = (0, _schemaComponent.useCompile)();

    var _useCollectionManager = (0, _.useCollectionManager)(),
        _useCollectionManager2 = _useCollectionManager.collections,
        collections = _useCollectionManager2 === void 0 ? [] : _useCollectionManager2;

    _reactive.action.bound(function (data) {
      field.dataSource = data.map(function (item) {
        return {
          label: compile(item.title),
          value: item.name
        };
      });
    })(collections);
  };
}