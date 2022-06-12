"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudFilenameGetter = void 0;
exports.getFilename = getFilename;

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFilename(req, file, cb) {
  _crypto().default.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : `${raw.toString('hex')}${_path().default.extname(file.originalname)}`);
  });
}

const cloudFilenameGetter = storage => (req, file, cb) => {
  getFilename(req, file, (err, filename) => {
    if (err) {
      return cb(err);
    }

    cb(null, `${storage.path ? `${storage.path}/` : ''}${filename}`);
  });
};

exports.cloudFilenameGetter = cloudFilenameGetter;