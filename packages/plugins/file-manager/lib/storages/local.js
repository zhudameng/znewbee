"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _koaStatic() {
  const data = _interopRequireDefault(require("koa-static"));

  _koaStatic = function _koaStatic() {
    return data;
  };

  return data;
}

function _mkdirp() {
  const data = _interopRequireDefault(require("mkdirp"));

  _mkdirp = function _mkdirp() {
    return data;
  };

  return data;
}

function _multer() {
  const data = _interopRequireDefault(require("multer"));

  _multer = function _multer() {
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

function _url() {
  const data = require("url");

  _url = function _url() {
    return data;
  };

  return data;
}

var _constants = require("../constants");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// use koa-mount match logic
function match(basePath, pathname) {
  if (!pathname.startsWith(basePath)) {
    return false;
  }

  const newPath = pathname.replace(basePath, '') || '/';

  if (basePath.slice(-1) === '/') {
    return true;
  }

  return newPath[0] === '/';
}

function update(_x, _x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (app, storages) {
    const Storage = app.db.getCollection('storages');
    const items = yield Storage.repository.find({
      filter: {
        type: _constants.STORAGE_TYPE_LOCAL
      }
    });
    const primaryKey = Storage.model.primaryKeyAttribute;
    storages.clear();

    var _iterator = _createForOfIteratorHelper(items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const storage = _step.value;
        storages.set(storage[primaryKey], storage);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return _update.apply(this, arguments);
}

function createLocalServerUpdateHook(app, storages) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (row) {
      if (row.get('type') === _constants.STORAGE_TYPE_LOCAL) {
        yield update(app, storages);
      }
    });

    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

function getDocumentRoot(storage) {
  const _ref2 = storage.options || {},
        _ref2$documentRoot = _ref2.documentRoot,
        documentRoot = _ref2$documentRoot === void 0 ? 'uploads' : _ref2$documentRoot; // TODO(feature): 后面考虑以字符串模板的方式使用，可注入 req/action 相关变量，以便于区分文件夹


  return _path().default.resolve(_path().default.isAbsolute(documentRoot) ? documentRoot : _path().default.join(process.cwd(), documentRoot));
}

function middleware(_x4, _x5) {
  return _middleware.apply(this, arguments);
}

function _middleware() {
  _middleware = _asyncToGenerator(function* (app, options) {
    const LOCALHOST = `http://localhost:${process.env.APP_PORT || '13000'}`;
    const Storage = app.db.getCollection('storages');
    const storages = new Map();
    const localServerUpdateHook = createLocalServerUpdateHook(app, storages);
    Storage.model.addHook('afterCreate', localServerUpdateHook);
    Storage.model.addHook('afterUpdate', localServerUpdateHook);
    Storage.model.addHook('afterDestroy', localServerUpdateHook);
    app.on('beforeStart', /*#__PURE__*/_asyncToGenerator(function* () {
      yield update(app, storages);
    }));
    app.use( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* (ctx, next) {
        var _iterator2 = _createForOfIteratorHelper(storages.values()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _storage$options;

            const storage = _step2.value;
            const baseUrl = storage.get('baseUrl');
            let url;

            try {
              url = new (_url().URL)(baseUrl);
            } catch (e) {
              url = {
                pathname: baseUrl
              };
            } // 以下情况才认为当前进程所应该提供静态服务
            // 否则都忽略，交给其他 server 来提供（如 nginx/cdn 等）


            if (url.origin && (storage === null || storage === void 0 ? void 0 : (_storage$options = storage.options) === null || _storage$options === void 0 ? void 0 : _storage$options.serve) === false) {
              continue;
            }

            const basePath = url.pathname.startsWith('/') ? url.pathname : `/${url.pathname}`;

            if (!match(basePath, ctx.path)) {
              continue;
            }

            return (0, _koaStatic().default)(getDocumentRoot(storage), {
              // for handle files after any api handlers
              defer: true
            })(ctx, /*#__PURE__*/_asyncToGenerator(function* () {
              if (ctx.path.startsWith(basePath)) {
                ctx.path = ctx.path.replace(basePath, '');
              }

              yield next();
            }));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        yield next();
      });

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());
  });
  return _middleware.apply(this, arguments);
}

var _default = {
  middleware,

  make(storage) {
    return _multer().default.diskStorage({
      destination: function destination(req, file, cb) {
        const destPath = _path().default.join(getDocumentRoot(storage), storage.path);

        (0, _mkdirp().default)(destPath, err => cb(err, destPath));
      },
      filename: _utils.getFilename
    });
  },

  defaults() {
    const _process$env = process.env,
          LOCAL_STORAGE_DEST = _process$env.LOCAL_STORAGE_DEST,
          LOCAL_STORAGE_BASE_URL = _process$env.LOCAL_STORAGE_BASE_URL,
          APP_PORT = _process$env.APP_PORT;
    const documentRoot = LOCAL_STORAGE_DEST || 'uploads';
    return {
      title: '本地存储',
      type: _constants.STORAGE_TYPE_LOCAL,
      name: `local`,
      baseUrl: LOCAL_STORAGE_BASE_URL || `http://localhost:${APP_PORT || '13000'}/${documentRoot}`,
      options: {
        documentRoot
      }
    };
  }

};
exports.default = _default;