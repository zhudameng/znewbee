import deepmerge from 'deepmerge';
import uniq from 'lodash/uniq';
export default function isPlainObject(value) {
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

export var mergeStrategies = new Map();
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
  return isPlainObject(x) && isPlainObject(y) ? deepmerge(x, y, {
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

  return uniq((x || []).concat(y || []));
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
export function assign(target, source) {
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