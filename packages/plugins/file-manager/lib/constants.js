"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORAGE_TYPE_S3 = exports.STORAGE_TYPE_LOCAL = exports.STORAGE_TYPE_ALI_OSS = exports.LIMIT_MAX_FILE_SIZE = exports.LIMIT_FILES = exports.FILE_FIELD_NAME = void 0;
const FILE_FIELD_NAME = 'file';
exports.FILE_FIELD_NAME = FILE_FIELD_NAME;
const LIMIT_FILES = 1;
exports.LIMIT_FILES = LIMIT_FILES;
const LIMIT_MAX_FILE_SIZE = 1024 * 1024 * 1024;
exports.LIMIT_MAX_FILE_SIZE = LIMIT_MAX_FILE_SIZE;
const STORAGE_TYPE_LOCAL = 'local';
exports.STORAGE_TYPE_LOCAL = STORAGE_TYPE_LOCAL;
const STORAGE_TYPE_ALI_OSS = 'ali-oss';
exports.STORAGE_TYPE_ALI_OSS = STORAGE_TYPE_ALI_OSS;
const STORAGE_TYPE_S3 = 's3';
exports.STORAGE_TYPE_S3 = STORAGE_TYPE_S3;