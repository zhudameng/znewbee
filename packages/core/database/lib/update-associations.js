"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.belongsToManyAssociations = belongsToManyAssociations;
exports.modelAssociationByKey = modelAssociationByKey;
exports.modelAssociations = modelAssociations;
exports.updateAssociation = updateAssociation;
exports.updateAssociations = updateAssociations;
exports.updateModelByValues = updateModelByValues;
exports.updateMultipleAssociation = updateMultipleAssociation;
exports.updateSingleAssociation = updateSingleAssociation;
exports.updateThroughTableValue = updateThroughTableValue;

var _model = require("./model");

var _updateGuard = require("./update-guard");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isUndefinedOrNull(value) {
  return typeof value === 'undefined' || value === null;
}

function isStringOrNumber(value) {
  return typeof value === 'string' || typeof value === 'number';
}

function getKeysByPrefix(keys, prefix) {
  return keys.filter(key => key.startsWith(`${prefix}.`)).map(key => key.substring(prefix.length + 1));
}

function modelAssociations(instance) {
  return instance.constructor.associations;
}

function belongsToManyAssociations(instance) {
  const associations = modelAssociations(instance);
  return Object.entries(associations).filter(entry => {
    const _entry = _slicedToArray(entry, 2),
          key = _entry[0],
          association = _entry[1];

    return association.associationType == 'BelongsToMany';
  }).map(association => {
    return association[1];
  });
}

function modelAssociationByKey(instance, key) {
  return modelAssociations(instance)[key];
}

function updateModelByValues(_x, _x2, _x3) {
  return _updateModelByValues.apply(this, arguments);
}

function _updateModelByValues() {
  _updateModelByValues = _asyncToGenerator(function* (instance, values, options) {
    if (!(options === null || options === void 0 ? void 0 : options.sanitized)) {
      const guard = new _updateGuard.UpdateGuard(); //@ts-ignore

      guard.setModel(instance.constructor);
      guard.setBlackList(options.blacklist);
      guard.setWhiteList(options.whitelist);
      guard.setAssociationKeysToBeUpdate(options.updateAssociationValues);
      values = guard.sanitize(values);
    }

    yield instance.update(values, options);
    yield updateAssociations(instance, values, options);
  });
  return _updateModelByValues.apply(this, arguments);
}

function updateThroughTableValue(_x4, _x5, _x6, _x7) {
  return _updateThroughTableValue.apply(this, arguments);
}
/**
 * update association of instance by values
 * @param instance
 * @param values
 * @param options
 */


function _updateThroughTableValue() {
  _updateThroughTableValue = _asyncToGenerator(function* (instance, throughName, throughValues, source, transaction = null) {
    // update through table values
    var _iterator = _createForOfIteratorHelper(belongsToManyAssociations(instance)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const belongsToMany = _step.value;
        // @ts-ignore
        const throughModel = belongsToMany.through.model;
        const throughModelName = throughModel.name;

        if (throughModelName === throughModelName) {
          const where = {
            [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
            [belongsToMany.otherKey]: source.get(belongsToMany.targetKey)
          };
          return yield throughModel.update(throughValues, {
            where,
            transaction
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return _updateThroughTableValue.apply(this, arguments);
}

function updateAssociations(_x8, _x9) {
  return _updateAssociations.apply(this, arguments);
}

function _updateAssociations() {
  _updateAssociations = _asyncToGenerator(function* (instance, values, options = {}) {
    // if no values set, return
    if (!values) {
      return;
    }

    let newTransaction = false;
    let transaction = options.transaction;

    if (!transaction) {
      newTransaction = true;
      transaction = yield instance.sequelize.transaction();
    }

    const keys = Object.keys(values);

    for (var _i2 = 0, _Object$keys = Object.keys(modelAssociations(instance)); _i2 < _Object$keys.length; _i2++) {
      const key = _Object$keys[_i2];

      if (keys.includes(key)) {
        yield updateAssociation(instance, key, values[key], _objectSpread(_objectSpread({}, options), {}, {
          transaction
        }));
      }
    } // update through table values


    var _iterator2 = _createForOfIteratorHelper(belongsToManyAssociations(instance)),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        const belongsToMany = _step2.value;
        // @ts-ignore
        const throughModel = belongsToMany.through.model;
        const throughModelName = throughModel.name;

        if (values[throughModelName] && options.sourceModel) {
          const where = {
            [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
            [belongsToMany.otherKey]: options.sourceModel.get(belongsToMany.targetKey)
          };
          yield throughModel.update(values[throughModel.name], {
            where,
            context: options.context,
            transaction
          });
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (newTransaction) {
      yield transaction.commit();
    }
  });
  return _updateAssociations.apply(this, arguments);
}

function isReverseAssociationPair(a, b) {
  const typeSet = new Set();
  typeSet.add(a.associationType);
  typeSet.add(b.associationType);

  if (typeSet.size == 1 && typeSet.has('BelongsToMany')) {
    return a.through.tableName === b.through.tableName && a.target.name === b.source.name && b.target.name === a.source.name && a.foreignKey === b.otherKey && a.sourceKey === b.targetKey && a.otherKey === b.foreignKey && a.targetKey === b.sourceKey;
  }

  if (typeSet.has('HasOne') && typeSet.has('BelongsTo') || typeSet.has('HasMany') && typeSet.has('BelongsTo')) {
    const sourceAssoc = a.associationType == 'BelongsTo' ? b : a;
    const targetAssoc = sourceAssoc == a ? b : a;
    return sourceAssoc.source.name === targetAssoc.target.name && sourceAssoc.foreignKey === targetAssoc.foreignKey && sourceAssoc.sourceKey === targetAssoc.targetKey;
  }

  return false;
}
/**
 * update model association by key
 * @param instance
 * @param key
 * @param value
 * @param options
 */


function updateAssociation(_x10, _x11, _x12) {
  return _updateAssociation.apply(this, arguments);
}
/**
 * update belongsTo and HasOne
 * @param model
 * @param key
 * @param value
 * @param options
 */


function _updateAssociation() {
  _updateAssociation = _asyncToGenerator(function* (instance, key, value, options = {}) {
    const association = modelAssociationByKey(instance, key);

    if (!association) {
      return false;
    }

    if (options.associationContext && isReverseAssociationPair(association, options.associationContext)) {
      return false;
    }

    switch (association.associationType) {
      case 'HasOne':
      case 'BelongsTo':
        return updateSingleAssociation(instance, key, value, options);

      case 'HasMany':
      case 'BelongsToMany':
        return updateMultipleAssociation(instance, key, value, options);
    }
  });
  return _updateAssociation.apply(this, arguments);
}

function updateSingleAssociation(_x13, _x14, _x15) {
  return _updateSingleAssociation.apply(this, arguments);
}
/**
 * update multiple association of model by value
 * @param model
 * @param key
 * @param value
 * @param options
 */


function _updateSingleAssociation() {
  _updateSingleAssociation = _asyncToGenerator(function* (model, key, value, options = {}) {
    const association = modelAssociationByKey(model, key);

    if (!association) {
      return false;
    }

    if (!['undefined', 'string', 'number', 'object'].includes(typeof value)) {
      return false;
    }

    const context = options.context,
          _options$updateAssoci = options.updateAssociationValues,
          updateAssociationValues = _options$updateAssoci === void 0 ? [] : _options$updateAssoci,
          _options$transaction = options.transaction,
          transaction = _options$transaction === void 0 ? yield model.sequelize.transaction() : _options$transaction;
    const keys = getKeysByPrefix(updateAssociationValues, key);

    try {
      // set method of association
      const setAccessor = association.accessors.set;

      const removeAssociation = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* () {
          yield model[setAccessor](null, {
            transaction
          });
          model.setDataValue(key, null);

          if (!options.transaction) {
            yield transaction.commit();
          }

          return true;
        });

        return function removeAssociation() {
          return _ref.apply(this, arguments);
        };
      }();

      if (isUndefinedOrNull(value)) {
        return yield removeAssociation();
      }

      if (isStringOrNumber(value)) {
        yield model[setAccessor](value, {
          context,
          transaction
        });

        if (!options.transaction) {
          yield transaction.commit();
        }

        return true;
      }

      if (value instanceof _model.Model) {
        yield model[setAccessor](value, {
          context,
          transaction
        });
        model.setDataValue(key, value);

        if (!options.transaction) {
          yield transaction.commit();
        }

        return true;
      }

      const createAccessor = association.accessors.create;
      let dataKey;
      let M;

      if (association.associationType === 'BelongsTo') {
        M = association.target; // @ts-ignore

        dataKey = association.targetKey;
      } else {
        M = association.source;
        dataKey = M.primaryKeyAttribute;
      }

      if (isStringOrNumber(value[dataKey])) {
        let instance = yield M.findOne({
          where: {
            [dataKey]: value[dataKey]
          },
          transaction
        });

        if (instance) {
          yield model[setAccessor](instance, {
            context,
            transaction
          });

          if (updateAssociationValues.includes(key)) {
            yield instance.update(value, _objectSpread(_objectSpread({}, options), {}, {
              transaction
            }));
          }

          yield updateAssociations(instance, value, _objectSpread(_objectSpread({}, options), {}, {
            transaction,
            associationContext: association,
            updateAssociationValues: keys
          }));
          model.setDataValue(key, instance);

          if (!options.transaction) {
            yield transaction.commit();
          }

          return true;
        }
      }

      const instance = yield model[createAccessor](value, {
        context,
        transaction
      });
      yield updateAssociations(instance, value, _objectSpread(_objectSpread({}, options), {}, {
        transaction,
        associationContext: association,
        updateAssociationValues: keys
      }));
      model.setDataValue(key, instance); // @ts-ignore

      if (association.targetKey) {
        model.setDataValue(association.foreignKey, instance[dataKey]);
      }

      if (!options.transaction) {
        yield transaction.commit();
      }
    } catch (error) {
      if (!options.transaction) {
        yield transaction.rollback();
      }

      throw error;
    }
  });
  return _updateSingleAssociation.apply(this, arguments);
}

function updateMultipleAssociation(_x16, _x17, _x18) {
  return _updateMultipleAssociation.apply(this, arguments);
}

function _updateMultipleAssociation() {
  _updateMultipleAssociation = _asyncToGenerator(function* (model, key, value, options = {}) {
    const association = modelAssociationByKey(model, key);

    if (!association) {
      return false;
    }

    if (!['undefined', 'string', 'number', 'object'].includes(typeof value)) {
      return false;
    }

    const context = options.context,
          _options$updateAssoci2 = options.updateAssociationValues,
          updateAssociationValues = _options$updateAssoci2 === void 0 ? [] : _options$updateAssoci2,
          _options$transaction2 = options.transaction,
          transaction = _options$transaction2 === void 0 ? yield model.sequelize.transaction() : _options$transaction2;
    const keys = getKeysByPrefix(updateAssociationValues, key);

    try {
      const setAccessor = association.accessors.set;
      const createAccessor = association.accessors.create;

      if (isUndefinedOrNull(value)) {
        yield model[setAccessor](null, {
          transaction,
          context
        });
        model.setDataValue(key, null);
        return;
      }

      if (isStringOrNumber(value)) {
        yield model[setAccessor](value, {
          transaction,
          context
        });
        return;
      }

      if (!Array.isArray(value)) {
        value = [value];
      }

      const list1 = []; // to be setted

      const list2 = []; // to be added

      var _iterator3 = _createForOfIteratorHelper(value),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          const item = _step3.value;

          if (isUndefinedOrNull(item)) {
            continue;
          }

          if (isStringOrNumber(item)) {
            list1.push(item);
          } else if (item instanceof _model.Model) {
            list1.push(item);
          } else if (item.sequelize) {
            list1.push(item);
          } else if (typeof item === 'object') {
            list2.push(item);
          }
        } // associate targets in lists1

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      yield model[setAccessor](list1, {
        transaction,
        context
      });
      const list3 = [];

      for (var _i3 = 0, _list = list2; _i3 < _list.length; _i3++) {
        const item = _list[_i3];
        const pk = association.target.primaryKeyAttribute;
        const through = association.through ? association.through.model.name : null;
        const accessorOptions = {
          context,
          transaction
        };
        const throughValue = item[through];

        if (throughValue) {
          accessorOptions['through'] = throughValue;
        }

        if (isUndefinedOrNull(item[pk])) {
          // create new record
          const instance = yield model[createAccessor](item, accessorOptions);
          yield updateAssociations(instance, item, _objectSpread(_objectSpread({}, options), {}, {
            transaction,
            associationContext: association,
            updateAssociationValues: keys
          }));
          list3.push(instance);
        } else {
          // set & update record
          const instance = yield association.target.findByPk(item[pk], {
            transaction
          });
          const addAccessor = association.accessors.add;
          yield model[addAccessor](item[pk], accessorOptions);

          if (updateAssociationValues.includes(key)) {
            yield instance.update(item, _objectSpread(_objectSpread({}, options), {}, {
              transaction
            }));
          }

          yield updateAssociations(instance, item, _objectSpread(_objectSpread({}, options), {}, {
            transaction,
            associationContext: association,
            updateAssociationValues: keys
          }));
          list3.push(instance);
        }
      }

      model.setDataValue(key, list1.concat(list3));

      if (!options.transaction) {
        yield transaction.commit();
      }
    } catch (error) {
      yield transaction.rollback();
      throw error;
    }
  });
  return _updateMultipleAssociation.apply(this, arguments);
}