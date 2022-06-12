"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _utils = require("../utils");

var _default = {
  make(storage) {
    const createAliOssStorage = require('multer-aliyun-oss');

    return new createAliOssStorage({
      config: storage.options,
      filename: (0, _utils.cloudFilenameGetter)(storage)
    });
  },

  defaults() {
    return {
      title: '阿里云对象存储',
      type: _constants.STORAGE_TYPE_ALI_OSS,
      name: 'ali-oss-1',
      baseUrl: process.env.ALI_OSS_STORAGE_BASE_URL,
      options: {
        region: process.env.ALI_OSS_REGION,
        accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
        bucket: process.env.ALI_OSS_BUCKET
      }
    };
  }

};
exports.default = _default;