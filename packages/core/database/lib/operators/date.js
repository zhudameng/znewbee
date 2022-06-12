"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

function _moment() {
  const data = _interopRequireDefault(require("moment"));

  _moment = function _moment() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToDate(value) {
  return (0, _moment().default)(value).toDate();
}

function getNextDay(value) {
  return (0, _moment().default)(value).add(1, 'd').toDate();
}

var _default = {
  $dateOn(value) {
    return {
      [_sequelize().Op.and]: [{
        [_sequelize().Op.gte]: stringToDate(value)
      }, {
        [_sequelize().Op.lt]: getNextDay(value)
      }]
    };
  },

  $dateNotOn(value) {
    return {
      [_sequelize().Op.or]: [{
        [_sequelize().Op.lt]: stringToDate(value)
      }, {
        [_sequelize().Op.gte]: getNextDay(value)
      }]
    };
  },

  $dateBefore(value) {
    return {
      [_sequelize().Op.lt]: stringToDate(value)
    };
  },

  $dateNotBefore(value) {
    return {
      [_sequelize().Op.gte]: stringToDate(value)
    };
  },

  $dateAfter(value) {
    return {
      [_sequelize().Op.gte]: getNextDay(value)
    };
  },

  $dateNotAfter(value) {
    return {
      [_sequelize().Op.lt]: getNextDay(value)
    };
  }

};
exports.default = _default;