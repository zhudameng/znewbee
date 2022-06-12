"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Middleware = void 0;

var _utils = require("./utils");

class Middleware {
  constructor(options) {
    this.options = void 0;
    options = (0, _utils.requireModule)(options);

    if (typeof options === 'function') {
      this.options = {
        handler: options
      };
    } else {
      this.options = options;
    }
  }

  getHandler() {
    const handler = (0, _utils.requireModule)(this.options.handler);

    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function!');
    }

    return handler;
  }

  canAccess(name) {
    const _this$options = this.options,
          _this$options$only = _this$options.only,
          only = _this$options$only === void 0 ? [] : _this$options$only,
          _this$options$except = _this$options.except,
          except = _this$options$except === void 0 ? [] : _this$options$except;

    if (only.length > 0) {
      return only.includes(name);
    }

    if (except.length > 0) {
      return !except.includes(name);
    }

    return true;
  }

  static toInstanceArray(middlewares) {
    if (!middlewares) {
      return [];
    }

    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }

    return middlewares.map(middleware => {
      if (middleware instanceof Middleware) {
        return middleware;
      }

      if (typeof middleware === 'object') {
        return new Middleware(middleware);
      }

      if (typeof middleware === 'function') {
        return new Middleware({
          handler: middleware
        });
      }
    });
  }

}

exports.Middleware = Middleware;
var _default = Middleware;
exports.default = _default;