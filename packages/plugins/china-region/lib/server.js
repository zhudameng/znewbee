"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChinaRegionPlugin = void 0;

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _chinaDivision() {
  const data = require("china-division");

  _chinaDivision = function _chinaDivision() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ChinaRegionPlugin extends _server().Plugin {
  install() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.importData();
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });

      _this2.app.acl.allow('chinaRegions', 'list', 'loggedIn');
    })();
  }

  importData() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const timer = Date.now();

      const ChinaRegion = _this3.db.getModel('chinaRegions');

      yield ChinaRegion.bulkCreate(_chinaDivision().provinces.map(item => ({
        code: item.code,
        name: item.name,
        level: 1
      })));
      yield ChinaRegion.bulkCreate(_chinaDivision().cities.map(item => ({
        code: item.code,
        name: item.name,
        level: 2,
        parentCode: item.provinceCode
      })));
      yield ChinaRegion.bulkCreate(_chinaDivision().areas.map(item => ({
        code: item.code,
        name: item.name,
        level: 3,
        parentCode: item.cityCode
      }))); // // 乡级数据 2856 条
      // await ChinaRegion.bulkCreate(streets.map(item => ({
      //   code: item.code,
      //   name: item.name,
      //   level: 4,
      //   parentCode: item.areaCode
      // })));
      // // 村级数据 658001 条
      // await ChinaRegion.bulkCreate(villages.map(item => ({
      //   code: item.code,
      //   name: item.name,
      //   level: 5,
      //   parentCode: item.streetCode
      // })));

      const count = yield ChinaRegion.count(); // console.log(`${count} rows of region data imported in ${(Date.now() - timer) / 1000}s`);
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.ChinaRegionPlugin = ChinaRegionPlugin;
var _default = ChinaRegionPlugin;
exports.default = _default;
