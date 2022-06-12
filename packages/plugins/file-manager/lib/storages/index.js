"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorageConfig = getStorageConfig;

var _local = _interopRequireDefault(require("./local"));

var _aliOss = _interopRequireDefault(require("./ali-oss"));

var _s = _interopRequireDefault(require("./s3"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const map = new Map();
map.set(_constants.STORAGE_TYPE_LOCAL, _local.default);
map.set(_constants.STORAGE_TYPE_ALI_OSS, _aliOss.default);
map.set(_constants.STORAGE_TYPE_S3, _s.default);

function getStorageConfig(key) {
  return map.get(key);
}