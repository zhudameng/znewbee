"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = action;
exports.middleware = middleware;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _multer() {
  const data = _interopRequireDefault(require("@koa/multer"));

  _multer = function _multer() {
    return data;
  };

  return data;
}

var _storages = require("../storages");

var Rules = _interopRequireWildcard(require("../rules"));

var _constants = require("../constants");

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

const _excluded = ["size"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getRules(ctx) {
  const resourceField = ctx.resourceField;

  if (!resourceField) {
    return ctx.storage.rules;
  }

  const _ref = resourceField.options.attachment || {},
        _ref$rules = _ref.rules,
        rules = _ref$rules === void 0 ? {} : _ref$rules;

  return Object.assign({}, ctx.storage.rules, rules);
} // TODO(optimize): 需要优化错误处理，计算失败后需要抛出对应错误，以便程序处理


function getFileFilter(ctx) {
  return (req, file, cb) => {
    // size 交给 limits 处理
    const _getRules = getRules(ctx),
          size = _getRules.size,
          rules = _objectWithoutProperties(_getRules, _excluded);

    const ruleKeys = Object.keys(rules);
    const result = !ruleKeys.length || !ruleKeys.some(key => typeof Rules[key] !== 'function' || !Rules[key](file, rules[key], ctx));
    cb(null, result);
  };
}

function middleware(_x, _x2) {
  return _middleware.apply(this, arguments);
}

function _middleware() {
  _middleware = _asyncToGenerator(function* (ctx, next) {
    const _ctx$action$params = ctx.action.params,
          resourceName = _ctx$action$params.resourceName,
          actionName = _ctx$action$params.actionName,
          associatedName = _ctx$action$params.associatedName;

    if (actionName !== 'upload') {
      return next();
    } // NOTE:
    // 1. 存储引擎选择依赖于字段定义
    // 2. 字段定义中需包含引擎的外键值
    // 3. 无字段时按 storages 表的默认项
    // 4. 插件初始化后应提示用户添加至少一个存储引擎并设为默认


    const Storage = ctx.db.getCollection('storages');
    let storage;

    if (resourceName === 'attachments') {
      // 如果没有包含关联，则直接按默认文件上传至默认存储引擎
      storage = yield Storage.repository.findOne({
        filter: {
          default: true
        }
      });
    } else if (associatedName) {
      const AssociatedCollection = ctx.db.getCollection(associatedName);
      const resourceField = AssociatedCollection.getField(resourceName);
      ctx.resourceField = resourceField;
      const _resourceField$option = resourceField.options.attachment,
            attachment = _resourceField$option === void 0 ? {} : _resourceField$option;
      storage = yield Storage.repository.findOne({
        filter: attachment.storage ? {
          name: attachment.storage
        } : {
          default: true
        }
      });
    }

    if (!storage) {
      console.error('[file-manager] no default or linked storage provided');
      return ctx.throw(500);
    } // 传递已取得的存储引擎，避免重查


    ctx.storage = storage;
    const storageConfig = (0, _storages.getStorageConfig)(storage.type);

    if (!storageConfig) {
      console.error(`[file-manager] storage type "${storage.type}" is not defined`);
      return ctx.throw(500);
    }

    const multerOptions = {
      fileFilter: getFileFilter(ctx),
      limits: {
        fileSize: Math.min(getRules(ctx).size || _constants.LIMIT_MAX_FILE_SIZE, _constants.LIMIT_MAX_FILE_SIZE),
        // 每次只允许提交一个文件
        files: _constants.LIMIT_FILES
      },
      storage: storageConfig.make(storage)
    };
    const upload = (0, _multer().default)(multerOptions).single(_constants.FILE_FIELD_NAME);
    return upload(ctx, next);
  });
  return _middleware.apply(this, arguments);
}

function action(_x3, _x4) {
  return _action.apply(this, arguments);
}

function _action() {
  _action = _asyncToGenerator(function* (ctx, next) {
    const file = ctx[_constants.FILE_FIELD_NAME],
          storage = ctx.storage;

    if (!file) {
      return ctx.throw(400, 'file validation failed');
    }

    const storageConfig = (0, _storages.getStorageConfig)(storage.type);
    const name = file[storageConfig.filenameKey || 'filename']; // make compatible filename across cloud service (with path)

    const filename = _path().default.basename(name);

    const extname = _path().default.extname(filename);

    const urlPath = storage.path ? storage.path.replace(/^([^\/])/, '/$1') : '';

    const data = _objectSpread({
      title: file.originalname.replace(extname, ''),
      filename,
      extname,
      // TODO(feature): 暂时两者相同，后面 storage.path 模版化以后，这里只是 file 实际的 path
      path: storage.path,
      size: file.size,
      // 直接缓存起来
      url: `${storage.baseUrl}${urlPath}/${filename}`,
      mimetype: file.mimetype,
      // @ts-ignore
      meta: ctx.request.body
    }, storageConfig.getFileData ? storageConfig.getFileData(file) : {});

    const attachment = yield ctx.db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (transaction) {
        // TODO(optimize): 应使用关联 accessors 获取
        const result = yield storage.createAttachment(data, {
          transaction
        });
        const _ctx$action$params2 = ctx.action.params,
              associatedName = _ctx$action$params2.associatedName,
              associatedIndex = _ctx$action$params2.associatedIndex,
              resourceName = _ctx$action$params2.resourceName;
        const AssociatedCollection = ctx.db.getCollection(associatedName);

        if (AssociatedCollection && associatedIndex && resourceName) {
          const Repo = AssociatedCollection.repository.relation(resourceName).of(associatedIndex);
          const Attachment = ctx.db.getCollection('attachments').model;
          const opts = {
            tk: result[Attachment.primaryKeyAttribute],
            transaction
          };

          if (Repo instanceof _database().BelongsToManyRepository) {
            yield Repo.add(opts);
          } else if (Repo instanceof _database().BelongsToRepository) {
            yield Repo.set(opts);
          }
        }

        return result;
      });

      return function (_x5) {
        return _ref2.apply(this, arguments);
      };
    }()); // 将存储引擎的信息附在已创建的记录里，节省一次查询
    // attachment.setDataValue('storage', storage);

    ctx.body = attachment;
    yield next();
  });
  return _action.apply(this, arguments);
}
