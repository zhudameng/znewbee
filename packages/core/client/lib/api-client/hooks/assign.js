"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.default = isPlainObject;
exports.mergeStrategies = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

var mergeStrategies = new Map();
exports.mergeStrategies = mergeStrategies;
mergeStrategies.set('overwrite', function (_, y) {
  return y;
});
mergeStrategies.set('andMerge', function (x, y) {
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
mergeStrategies.set('orMerge', function (x, y) {
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
mergeStrategies.set('deepMerge', function (x, y) {
  return isPlainObject(x) && isPlainObject(y) ? (0, _deepmerge.default)(x, y, {
    arrayMerge: function arrayMerge(x, y) {
      return y;
    }
  }) : y;
});
mergeStrategies.set('merge', function (x, y) {
  return isPlainObject(x) && isPlainObject(y) ? Object.assign(x, y) : y;
});
mergeStrategies.set('union', function (x, y) {
  if (typeof x === 'string') {
    x = x.split(',');
  }

  if (typeof y === 'string') {
    y = y.split(',');
  }

  return (0, _uniq.default)((x || []).concat(y || []));
});
mergeStrategies.set('intersect', function (x, y) {
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

  return x.filter(function (v) {
    return y.includes(v);
  });
});

function assign(target, source) {
  var strategies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  getKeys(source).forEach(function (sourceKey) {
    var strategy = strategies[sourceKey];
    var func = mergeStrategies.get('deepMerge');

    if (typeof strategy === 'function') {
      func = strategy;
    } else if (typeof strategy === 'string' && mergeStrategies.has(strategy)) {
      func = mergeStrategies.get(strategy);
    }

    target[sourceKey] = func(target[sourceKey], source[sourceKey]);
  });
  return target;
}