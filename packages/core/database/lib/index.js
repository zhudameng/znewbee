"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Op: true
};
Object.defineProperty(exports, "Op", {
  enumerable: true,
  get: function get() {
    return _sequelize().Op;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _database.Database;
  }
});

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _collection = require("./collection");

Object.keys(_collection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _collection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collection[key];
    }
  });
});

var _database = require("./database");

Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _database[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _database[key];
    }
  });
});

var _fields = require("./fields");

Object.keys(_fields).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fields[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fields[key];
    }
  });
});

var _magicAttributeModel = require("./magic-attribute-model");

Object.keys(_magicAttributeModel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _magicAttributeModel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _magicAttributeModel[key];
    }
  });
});

var _mockDatabase = require("./mock-database");

Object.keys(_mockDatabase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mockDatabase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mockDatabase[key];
    }
  });
});

var _model = require("./model");

Object.keys(_model).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _model[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _model[key];
    }
  });
});

var _belongsToManyRepository = require("./relation-repository/belongs-to-many-repository");

Object.keys(_belongsToManyRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _belongsToManyRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _belongsToManyRepository[key];
    }
  });
});

var _belongsToRepository = require("./relation-repository/belongs-to-repository");

Object.keys(_belongsToRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _belongsToRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _belongsToRepository[key];
    }
  });
});

var _hasmanyRepository = require("./relation-repository/hasmany-repository");

Object.keys(_hasmanyRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hasmanyRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hasmanyRepository[key];
    }
  });
});

var _multipleRelationRepository = require("./relation-repository/multiple-relation-repository");

Object.keys(_multipleRelationRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _multipleRelationRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _multipleRelationRepository[key];
    }
  });
});

var _singleRelationRepository = require("./relation-repository/single-relation-repository");

Object.keys(_singleRelationRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _singleRelationRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _singleRelationRepository[key];
    }
  });
});

var _repository = require("./repository");

Object.keys(_repository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _repository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _repository[key];
    }
  });
});

var _updateAssociations = require("./update-associations");

Object.keys(_updateAssociations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _updateAssociations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _updateAssociations[key];
    }
  });
});