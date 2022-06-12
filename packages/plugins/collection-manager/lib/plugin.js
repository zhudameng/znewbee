"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CollectionManagerPlugin = void 0;

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
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

var _ = require(".");

var _hooks = require("./hooks");

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class CollectionManagerPlugin extends _server().Plugin {
  beforeLoad() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.app.db.registerModels({
        CollectionModel: _models.CollectionModel,
        FieldModel: _models.FieldModel
      });

      _this.app.db.registerRepositories({
        CollectionRepository: _.CollectionRepository
      });

      _this.app.db.on('fields.beforeUpdate', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (model, options) {
          const newValue = options.values;

          if (model.get('reverseKey') && _lodash().default.get(newValue, 'reverseField') && !_lodash().default.get(newValue, 'reverseField.key')) {
            throw new Error('cant update field without a reverseField key');
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()); // 要在 beforeInitOptions 之前处理


      _this.app.db.on('fields.beforeCreate', (0, _hooks.beforeCreateForReverseField)(_this.app.db));

      _this.app.db.on('fields.beforeCreate', (0, _hooks.beforeCreateForChildrenCollection)(_this.app.db));

      _this.app.db.on('fields.beforeCreate', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (model, options) {
          const type = model.get('type');
          yield _this.app.db.emitAsync(`fields.${type}.beforeInitOptions`, model, _objectSpread(_objectSpread({}, options), {}, {
            database: _this.app.db
          }));
        });

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());

      for (const key in _hooks.beforeInitOptions) {
        if (Object.prototype.hasOwnProperty.call(_hooks.beforeInitOptions, key)) {
          const fn = _hooks.beforeInitOptions[key];

          _this.app.db.on(`fields.${key}.beforeInitOptions`, fn);
        }
      }

      _this.app.db.on('fields.afterCreate', (0, _hooks.afterCreateForReverseField)(_this.app.db));

      _this.app.db.on('collections.afterCreateWithAssociations', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* (model, {
          context,
          transaction
        }) {
          if (context) {
            yield model.migrate({
              transaction
            });
          }
        });

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());

      _this.app.db.on('collections.afterDestroy', /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (model, {
          transaction
        }) {
          const name = model.get('name');
          const fields = yield _this.app.db.getRepository('fields').find({
            filter: {
              'type.$in': ['belongsToMany', 'belongsTo', 'hasMany', 'hasOne']
            },
            transaction
          });
          const deleteFieldsKey = fields.filter(field => {
            var _field$get;

            return ((_field$get = field.get('options')) === null || _field$get === void 0 ? void 0 : _field$get.target) === name;
          }).map(field => field.get('key'));
          yield _this.app.db.getRepository('fields').destroy({
            filter: {
              'key.$in': deleteFieldsKey
            },
            transaction
          });
        });

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());

      _this.app.db.on('fields.afterCreate', /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(function* (model, {
          context,
          transaction
        }) {
          if (context) {
            yield model.migrate({
              transaction
            });
          }
        });

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());

      _this.app.db.on('fields.afterCreateWithAssociations', /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(function* (model, {
          context,
          transaction
        }) {
          var _db$getCollection, _db$getCollection$opt, _db$getCollection2, _db$getCollection2$op;

          if (!context) {
            return;
          }

          if (!model.get('through')) {
            return;
          }

          const _ref7 = [model.get('through'), model.get('collectionName'), model.get('target')],
                throughName = _ref7[0],
                sourceName = _ref7[1],
                targetName = _ref7[2];
          const db = _this.app.db;
          const through = yield db.getRepository('collections').findOne({
            filter: {
              name: throughName
            },
            transaction
          });

          if (!through) {
            return;
          }

          const repository = db.getRepository('collections.fields', throughName);
          yield repository.create({
            transaction,
            values: {
              name: `f_${(0, _utils().uid)()}`,
              type: 'belongsTo',
              target: sourceName,
              targetKey: model.get('sourceKey'),
              foreignKey: model.get('foreignKey'),
              interface: 'linkTo',
              reverseField: {
                interface: 'subTable',
                uiSchema: {
                  type: 'void',
                  title: through.get('title'),
                  'x-component': 'TableField',
                  'x-component-props': {}
                } // uiSchema: {
                //   title: through.get('title'),
                //   'x-component': 'RecordPicker',
                //   'x-component-props': {
                //     // mode: 'tags',
                //     multiple: true,
                //     fieldNames: {
                //       label: 'id',
                //       value: 'id',
                //     },
                //   },
                // },

              },
              uiSchema: {
                title: ((_db$getCollection = db.getCollection(sourceName)) === null || _db$getCollection === void 0 ? void 0 : (_db$getCollection$opt = _db$getCollection.options) === null || _db$getCollection$opt === void 0 ? void 0 : _db$getCollection$opt.title) || sourceName,
                'x-component': 'RecordPicker',
                'x-component-props': {
                  // mode: 'tags',
                  multiple: false,
                  fieldNames: {
                    label: 'id',
                    value: 'id'
                  }
                }
              }
            }
          });
          yield repository.create({
            transaction,
            values: {
              name: `f_${(0, _utils().uid)()}`,
              type: 'belongsTo',
              target: targetName,
              targetKey: model.get('targetKey'),
              foreignKey: model.get('otherKey'),
              interface: 'linkTo',
              reverseField: {
                interface: 'subTable',
                uiSchema: {
                  type: 'void',
                  title: through.get('title'),
                  'x-component': 'TableField',
                  'x-component-props': {}
                } // interface: 'linkTo',
                // uiSchema: {
                //   title: through.get('title'),
                //   'x-component': 'RecordPicker',
                //   'x-component-props': {
                //     // mode: 'tags',
                //     multiple: true,
                //     fieldNames: {
                //       label: 'id',
                //       value: 'id',
                //     },
                //   },
                // },

              },
              uiSchema: {
                title: ((_db$getCollection2 = db.getCollection(targetName)) === null || _db$getCollection2 === void 0 ? void 0 : (_db$getCollection2$op = _db$getCollection2.options) === null || _db$getCollection2$op === void 0 ? void 0 : _db$getCollection2$op.title) || targetName,
                'x-component': 'RecordPicker',
                'x-component-props': {
                  // mode: 'tags',
                  multiple: false,
                  fieldNames: {
                    label: 'id',
                    value: 'id'
                  }
                }
              }
            }
          });
          yield db.getRepository('collections').load({
            filter: {
              'name.$in': [throughName, sourceName, targetName]
            }
          });
        });

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());

      _this.app.on('beforeStart', /*#__PURE__*/_asyncToGenerator(function* () {
        yield _this.app.db.getRepository('collections').load();
      }));

      _this.app.resourcer.use( /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(function* (ctx, next) {
          const _ctx$action = ctx.action,
                resourceName = _ctx$action.resourceName,
                actionName = _ctx$action.actionName;

          if (resourceName === 'collections.fields' && actionName === 'update') {
            const _ctx$action$params$up = ctx.action.params.updateAssociationValues,
                  updateAssociationValues = _ctx$action$params$up === void 0 ? [] : _ctx$action$params$up;
            updateAssociationValues.push('uiSchema');
            ctx.action.mergeParams({
              updateAssociationValues
            });
          }

          yield next();
        });

        return function (_x13, _x14) {
          return _ref9.apply(this, arguments);
        };
      }());

      _this.app.resourcer.use( /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(function* (ctx, next) {
          const _ctx$action2 = ctx.action,
                resourceName = _ctx$action2.resourceName,
                actionName = _ctx$action2.actionName;

          if (actionName === 'update') {
            const _ctx$action$params$up2 = ctx.action.params.updateAssociationValues,
                  updateAssociationValues = _ctx$action$params$up2 === void 0 ? [] : _ctx$action$params$up2;

            const _resourceName$split = resourceName.split('.'),
                  _resourceName$split2 = _slicedToArray(_resourceName$split, 2),
                  collectionName = _resourceName$split2[0],
                  associationName = _resourceName$split2[1];

            if (!associationName) {
              const collection = ctx.db.getCollection(collectionName);

              if (collection) {
                var _iterator = _createForOfIteratorHelper(collection.fields),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    const _step$value = _slicedToArray(_step.value, 2),
                          field = _step$value[1];

                    if (field.options.interface === 'subTable') {
                      updateAssociationValues.push(field.name);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            } else {
              var _ctx$db$getCollection, _ctx$db$getCollection2;

              const association = (_ctx$db$getCollection = ctx.db.getCollection(collectionName)) === null || _ctx$db$getCollection === void 0 ? void 0 : (_ctx$db$getCollection2 = _ctx$db$getCollection.getField) === null || _ctx$db$getCollection2 === void 0 ? void 0 : _ctx$db$getCollection2.call(_ctx$db$getCollection, associationName);

              if (association === null || association === void 0 ? void 0 : association.target) {
                const collection = ctx.db.getCollection(association === null || association === void 0 ? void 0 : association.target);

                if (collection) {
                  var _iterator2 = _createForOfIteratorHelper(collection.fields),
                      _step2;

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      const _step2$value = _slicedToArray(_step2.value, 2),
                            field = _step2$value[1];

                      if (field.options.interface === 'subTable') {
                        updateAssociationValues.push(field.name);
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }
              }
            }

            if (updateAssociationValues.length) {
              ctx.action.mergeParams({
                updateAssociationValues
              });
            }
          }

          yield next();
        });

        return function (_x15, _x16) {
          return _ref10.apply(this, arguments);
        };
      }());

      _this.app.acl.allow('collections', 'list', 'loggedIn');

      _this.app.acl.allow('collections', ['create', 'update', 'destroy'], 'allowConfigure');
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.app.db.import({
        directory: _path().default.resolve(__dirname, './collections')
      });
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.CollectionManagerPlugin = CollectionManagerPlugin;
var _default = CollectionManagerPlugin;
exports.default = _default;
