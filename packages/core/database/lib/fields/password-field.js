"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordField = void 0;

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PasswordField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.STRING;
  }

  verify(password, hash) {
    var _this = this;

    return _asyncToGenerator(function* () {
      password = password || '';
      hash = hash || '';
      const _this$options = _this.options,
            _this$options$length = _this$options.length,
            length = _this$options$length === void 0 ? 64 : _this$options$length,
            _this$options$randomB = _this$options.randomBytesSize,
            randomBytesSize = _this$options$randomB === void 0 ? 8 : _this$options$randomB;
      return new Promise((resolve, reject) => {
        const salt = hash.substring(0, randomBytesSize * 2);
        const key = hash.substring(randomBytesSize * 2);

        _crypto().default.scrypt(password, salt, length / 2 - randomBytesSize, (err, derivedKey) => {
          if (err) reject(err);
          resolve(key == derivedKey.toString('hex'));
        });
      });
    })();
  }

  hash(password) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const _this2$options = _this2.options,
            _this2$options$length = _this2$options.length,
            length = _this2$options$length === void 0 ? 64 : _this2$options$length,
            _this2$options$random = _this2$options.randomBytesSize,
            randomBytesSize = _this2$options$random === void 0 ? 8 : _this2$options$random;
      return new Promise((resolve, reject) => {
        const salt = _crypto().default.randomBytes(randomBytesSize).toString('hex');

        _crypto().default.scrypt(password, salt, length / 2 - randomBytesSize, (err, derivedKey) => {
          if (err) reject(err);
          resolve(salt + derivedKey.toString('hex'));
        });
      });
    })();
  }

  init() {
    var _this3 = this;

    const name = this.options.name;

    this.listener = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (model) {
        if (!model.changed(name)) {
          return;
        }

        const value = model.get(name);

        if (value) {
          const hash = yield _this3.hash(value);
          model.set(name, hash);
        } else {
          model.set(name, null);
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  bind() {
    super.bind();
    this.on('beforeCreate', this.listener);
    this.on('beforeUpdate', this.listener);
  }

  unbind() {
    super.unbind();
    this.off('beforeCreate', this.listener);
    this.off('beforeUpdate', this.listener);
  }

}

exports.PasswordField = PasswordField;