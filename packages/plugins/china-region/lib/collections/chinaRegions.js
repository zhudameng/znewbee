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
  name: 'chinaRegions',
  title: '中国行政区划',
  autoGenId: false,
  fields: [// 如使用代码作为 id 可能更节省，但由于代码数字最长为 12 字节，除非使用 bigint(64) 才够放置
  {
    name: 'code',
    type: 'string',
    // unique: true,
    primaryKey: true
  }, {
    name: 'name',
    type: 'string'
  }, {
    name: 'parent',
    type: 'belongsTo',
    target: 'chinaRegions',
    targetKey: 'code',
    foreignKey: 'parentCode'
  }, {
    name: 'children',
    type: 'hasMany',
    target: 'chinaRegions',
    sourceKey: 'code',
    foreignKey: 'parentCode'
  }, {
    name: 'level',
    type: 'integer'
  }]
});

exports.default = _default;
