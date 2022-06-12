"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtService = void 0;

function _jsonwebtoken() {
  const data = _interopRequireDefault(require("jsonwebtoken"));

  _jsonwebtoken = function _jsonwebtoken() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JwtService {
  constructor(options) {
    this.options = void 0;
    this.options = options;
  }

  expiresIn() {
    return this.options.expiresIn || '7d';
  }

  secret() {
    return this.options.secret || process.env.APP_KEY;
  }

  sign(payload) {
    return _jsonwebtoken().default.sign(payload, this.secret(), {
      expiresIn: this.expiresIn()
    });
  }

  decode(token) {
    return new Promise((resolve, reject) => {
      _jsonwebtoken().default.verify(token, this.secret(), (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded);
      });
    });
  }

}

exports.JwtService = JwtService;