"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

var _default = (0, _database().defineCollection)({
  name: 'uiSchemaTemplates',
  autoGenId: false,
  fields: [{
    type: 'uid',
    name: 'key',
    primaryKey: true
  }, {
    type: 'string',
    name: 'name'
  }, {
    type: 'string',
    name: 'componentName'
  }, {
    type: 'string',
    name: 'associationName'
  }, {
    type: 'belongsTo',
    name: 'uiSchema',
    target: 'uiSchemas',
    foreignKey: 'uid',
    onDelete: 'CASCADE'
  }, {
    type: 'belongsTo',
    name: 'collection',
    target: 'collections',
    foreignKey: 'collectionName',
    targetKey: 'name'
  }]
});

exports.default = _default;
