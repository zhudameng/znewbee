"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIXTURES_DIR = void 0;
exports.fixture = fixture;
exports.getDirs = getDirs;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const FIXTURES_DIR = _path.default.resolve(__dirname, 'fixtures');

exports.FIXTURES_DIR = FIXTURES_DIR;

function getDirs() {
  return _fsExtra.default.readdirSync(FIXTURES_DIR).filter(fixturePath => _fsExtra.default.statSync(_path.default.resolve(FIXTURES_DIR, fixturePath)).isDirectory());
}

function fixture(...args) {
  return _path.default.join(FIXTURES_DIR, ...args);
}

describe('default', () => {
  const fixturePath = fixture('default');
  it('获取所有的包', /*#__PURE__*/_asyncToGenerator(function* () {
    expect.assertions(1);
    const pkgs = yield (0, _.getLernaPackages)(fixturePath);
    const pkgNames = ['bar', 'foo'];
    expect(pkgNames).toEqual(pkgs.map(item => item.name));
  }));
});
describe('customize', () => {
  const fixturePath = fixture('customize');
  it('获取所有的包', /*#__PURE__*/_asyncToGenerator(function* () {
    expect.assertions(1);
    const pkgs = yield (0, _.getLernaPackages)(fixturePath, {});
    const pkgNames = ['core2', 'bar', 'foo', 'core1'];
    expect(pkgNames).toEqual(pkgs.map(item => item.name));
  }));
  it('过滤私有的包', /*#__PURE__*/_asyncToGenerator(function* () {
    expect.assertions(1);
    const pkgs = yield (0, _.getLernaPackages)(fixturePath, {
      skipPrivate: true
    });
    const pkgNames = ['bar', 'foo', 'core1'];
    expect(pkgNames).toEqual(pkgs.map(item => item.name));
  }));
  it('设置包含部分包', /*#__PURE__*/_asyncToGenerator(function* () {
    expect.assertions(1);
    const pkgs = yield (0, _.getLernaPackages)(fixturePath, {
      include: ['core*']
    });
    const pkgNames = ['core1', 'core2'];
    expect(pkgNames).toEqual(pkgs.map(item => item.name));
  }));
  it('设置包含部分包', /*#__PURE__*/_asyncToGenerator(function* () {
    expect.assertions(1);
    const pkgs = yield (0, _.getLernaPackages)(fixturePath, {
      exclude: ['core1']
    });
    const pkgNames = ['core2', 'bar', 'foo'];
    expect(pkgNames).toEqual(pkgs.map(item => item.name));
  }));
});