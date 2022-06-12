"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeInitOptions = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

const setTargetKey = (db, model) => {
  if (model.get('targetKey')) {
    return;
  }

  const target = model.get('target');

  if (db.hasCollection(target)) {
    const targetModel = db.getCollection(target).model;
    model.set('targetKey', targetModel.primaryKeyAttribute || 'id');
  } else {
    model.set('targetKey', 'id');
  }
};

const setSourceKey = (db, model) => {
  if (model.get('sourceKey')) {
    return;
  }

  const source = model.get('collectionName');

  if (db.hasCollection(source)) {
    const sourceModel = db.getCollection(source).model;
    model.set('sourceKey', sourceModel.primaryKeyAttribute || 'id');
  } else {
    model.set('sourceKey', 'id');
  }
};

const beforeInitOptions = {
  belongsTo(model, {
    database
  }) {
    const defaults = {
      // targetKey: 'id',
      foreignKey: `f_${(0, _utils().uid)()}`
    };

    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }

      model.set(key, defaults[key]);
    }

    setTargetKey(database, model);
  },

  belongsToMany(model, {
    database
  }) {
    const defaults = {
      // targetKey: 'id',
      // sourceKey: 'id',
      through: `t_${(0, _utils().uid)()}`,
      foreignKey: `f_${(0, _utils().uid)()}`,
      otherKey: `f_${(0, _utils().uid)()}`
    };

    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }

      model.set(key, defaults[key]);
    }

    setTargetKey(database, model);
    setSourceKey(database, model);
  },

  hasMany(model, {
    database
  }) {
    const defaults = {
      // targetKey: 'id',
      // sourceKey: 'id',
      foreignKey: `f_${(0, _utils().uid)()}`,
      target: `t_${(0, _utils().uid)()}`
    };

    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }

      model.set(key, defaults[key]);
    }

    setTargetKey(database, model);
    setSourceKey(database, model);
  },

  hasOne(model, {
    database
  }) {
    const defaults = {
      // sourceKey: 'id',
      foreignKey: `f_${(0, _utils().uid)()}`
    };

    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }

      model.set(key, defaults[key]);
    }

    setSourceKey(database, model);
  }

};
exports.beforeInitOptions = beforeInitOptions;
