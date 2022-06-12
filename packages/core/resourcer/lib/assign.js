"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.default = isPlainObject;
exports.mergeStrategies = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _deepmerge() {
  const data = _interopRequireDefault(require("deepmerge"));

  _deepmerge = function _deepmerge() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(symbol => target.propertyIsEnumerable(symbol)) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

const mergeStrategies = new Map();
exports.mergeStrategies = mergeStrategies;
mergeStrategies.set('overwrite', (_, y) => {
  return y;
});
mergeStrategies.set('andMerge', (x, y) => {
  if (!x && !y) {
    return;
  }

  if (!x) {
    return y;
  }

  if (!y) {
    return x;
  }

  return {
    $and: [x, y]
  };
});
mergeStrategies.set('orMerge', (x, y) => {
  if (!x && !y) {
    return;
  }

  if (!x) {
    return y;
  }

  if (!y) {
    return x;
  }

  return {
    $or: [x, y]
  };
});
mergeStrategies.set('deepMerge', (x, y) => {
  return isPlainObject(x) && isPlainObject(y) ? (0, _deepmerge().default)(x, y, {
    arrayMerge: (x, y) => y
  }) : y;
});
mergeStrategies.set('merge', (x, y) => {
  return isPlainObject(x) && isPlainObject(y) ? Object.assign(x, y) : y;
});
mergeStrategies.set('union', (x, y) => {
  if (typeof x === 'string') {
    x = x.split(',');
  }

  if (typeof y === 'string') {
    y = y.split(',');
  }

  return _lodash().default.uniq((x || []).concat(y || []));
});
mergeStrategies.set('intersect', (x, y) => {
  if (typeof x === 'string') {
    x = x.split(',');
  }

  if (typeof y === 'string') {
    y = y.split(',');
  }

  if (!Array.isArray(x) || x.length === 0) {
    return y || [];
  }

  if (!Array.isArray(y) || y.length === 0) {
    return x || [];
  }

  return x.filter(v => y.includes(v));
});

function assign(target, source, strategies = {}) {
  getKeys(source).forEach(sourceKey => {
    const strategy = strategies[sourceKey];
    let func = mergeStrategies.get('deepMerge');

    if (typeof strategy === 'function') {
      func = strategy;
    } else if (typeof strategy === 'string' && mergeStrategies.has(strategy)) {
      func = mergeStrategies.get(strategy);
    }

    target[sourceKey] = func(target[sourceKey], source[sourceKey]);
  });
  return target;
}