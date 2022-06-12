"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addInArrayAtPosition = addInArrayAtPosition;
exports.changeElementOfPositionInArray = changeElementOfPositionInArray;
exports.partialRight = partialRight;
exports.pickPropOut = pickPropOut;
exports.removeFromArrayAtPosition = removeFromArrayAtPosition;
exports.replaceElementOfArray = replaceElementOfArray;
exports.when = when;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (arg) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, arg);
  };
}

function partialRight(fn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, leftArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      leftArgs[_key3] = arguments[_key3];
    }

    return fn.apply(void 0, leftArgs.concat(args));
  };
}

function addInArrayAtPosition(array, element, position) {
  var arrayCopy = _toConsumableArray(array);

  arrayCopy.splice(position, 0, element);
  return arrayCopy;
}

function removeFromArrayAtPosition(array, position) {
  return array.reduce(function (acc, value, idx) {
    return idx === position ? acc : [].concat(_toConsumableArray(acc), [value]);
  }, []);
}

function changeElementOfPositionInArray(array, from, to) {
  var removeFromArrayAtPositionFrom = partialRight(removeFromArrayAtPosition, from);
  var addInArrayAtPositionTo = partialRight(addInArrayAtPosition, array[from], to);
  return compose(removeFromArrayAtPositionFrom, addInArrayAtPositionTo)(array);
}

function identity(value) {
  return value;
}

function when(value) {
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  return function callback(callback) {
    if (predicate(value)) return callback(value);
  };
}

function replaceElementOfArray(array) {
  return function (options) {
    return array.map(function (element) {
      return options.when(element) ? options.for(element) : element;
    });
  };
}

function pickPropOut(object, prop) {
  return Object.keys(object).reduce(function (obj, key) {
    return key === prop ? obj : _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, object[key]));
  }, {});
}