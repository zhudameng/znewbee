"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Model extends _sequelize().Model {
  toJSON() {
    const handleObj = (obj, options) => {
      const handles = [data => {
        if (data instanceof Model) {
          return data.toJSON();
        }

        return data;
      }, this.hiddenObjKey];
      return handles.reduce((carry, fn) => fn.apply(this, [carry, options]), obj);
    };

    const handleArray = (arrayOfObj, options) => {
      const handles = [this.sortAssociations];
      return handles.reduce((carry, fn) => fn.apply(this, [carry, options]), arrayOfObj || []);
    };

    const opts = {
      model: this.constructor,
      collection: this.constructor.collection,
      db: this.constructor.database
    };

    const traverseJSON = (data, options) => {
      const model = options.model,
            db = options.db,
            collection = options.collection; // handle Object

      data = handleObj(data, options);
      const result = {};

      for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
        const key = _Object$keys[_i];

        // @ts-ignore
        if (model.hasAlias(key)) {
          const association = model.associations[key];
          const opts = {
            model: association.target,
            collection: db.getCollection(association.target.name),
            db,
            key,
            field: collection.getField(key)
          };

          if (['HasMany', 'BelongsToMany'].includes(association.associationType)) {
            result[key] = handleArray(data[key], opts).map(item => traverseJSON(item, opts));
          } else {
            result[key] = data[key] ? traverseJSON(data[key], opts) : null;
          }
        } else {
          result[key] = data[key];
        }
      }

      return result;
    };

    return traverseJSON(super.toJSON(), opts);
  }

  hiddenObjKey(obj, options) {
    const hiddenFields = Array.from(options.collection.fields.values()).filter(field => field.options.hidden).map(field => field.options.name);
    return _lodash().default.omit(obj, hiddenFields);
  }

  sortAssociations(data, {
    field
  }) {
    const sortBy = field.options.sortBy;
    return sortBy ? this.sortArray(data, sortBy) : data;
  }

  sortArray(data, sortBy) {
    if (!_lodash().default.isArray(sortBy)) {
      sortBy = [sortBy];
    }

    const orderItems = [];
    const orderDirections = [];
    sortBy.forEach(sortItem => {
      orderDirections.push(sortItem.startsWith('-') ? 'desc' : 'asc');
      orderItems.push(sortItem.replace('-', ''));
    });
    return _lodash().default.orderBy(data, orderItems, orderDirections);
  }

}

exports.Model = Model;
Model.database = void 0;
Model.collection = void 0;