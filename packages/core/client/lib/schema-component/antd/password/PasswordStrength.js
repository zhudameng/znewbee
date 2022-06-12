"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordStrength = void 0;

var _shared = require("@formily/shared");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var isNum = function isNum(c) {
  return c >= 48 && c <= 57;
};

var isLower = function isLower(c) {
  return c >= 97 && c <= 122;
};

var isUpper = function isUpper(c) {
  return c >= 65 && c <= 90;
};

var isSymbol = function isSymbol(c) {
  return !(isLower(c) || isUpper(c) || isNum(c));
};

var isLetter = function isLetter(c) {
  return isLower(c) || isUpper(c);
};

var getStrength = function getStrength(val) {
  if (!val) return 0;
  var num = 0;
  var lower = 0;
  var upper = 0;
  var symbol = 0;
  var MNS = 0;
  var rep = 0;
  var repC = 0;
  var consecutive = 0;
  var sequential = 0;

  var len = function len() {
    return num + lower + upper + symbol;
  };

  var callMe = function callMe() {
    var re = num > 0 ? 1 : 0;
    re += lower > 0 ? 1 : 0;
    re += upper > 0 ? 1 : 0;
    re += symbol > 0 ? 1 : 0;

    if (re > 2 && len() >= 8) {
      return re + 1;
    } else {
      return 0;
    }
  };

  for (var i = 0; i < val.length; i++) {
    var c = val.charCodeAt(i);

    if (isNum(c)) {
      num++;

      if (i !== 0 && i !== val.length - 1) {
        MNS++;
      }

      if (i > 0 && isNum(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else if (isLower(c)) {
      lower++;

      if (i > 0 && isLower(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else if (isUpper(c)) {
      upper++;

      if (i > 0 && isUpper(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else {
      symbol++;

      if (i !== 0 && i !== val.length - 1) {
        MNS++;
      }
    }

    var exists = false;

    for (var j = 0; j < val.length; j++) {
      if (val[i] === val[j] && i !== j) {
        exists = true;
        repC += Math.abs(val.length / (j - i));
      }
    }

    if (exists) {
      rep++;
      var unique = val.length - rep;
      repC = unique ? Math.ceil(repC / unique) : Math.ceil(repC);
    }

    if (i > 1) {
      var last1 = val.charCodeAt(i - 1);
      var last2 = val.charCodeAt(i - 2);

      if (isLetter(c)) {
        if (isLetter(last1) && isLetter(last2)) {
          var v = val.toLowerCase();
          var vi = v.charCodeAt(i);
          var vi1 = v.charCodeAt(i - 1);
          var vi2 = v.charCodeAt(i - 2);

          if (vi - vi1 === vi1 - vi2 && Math.abs(vi - vi1) === 1) {
            sequential++;
          }
        }
      } else if (isNum(c)) {
        if (isNum(last1) && isNum(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++;
          }
        }
      } else {
        if (isSymbol(last1) && isSymbol(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++;
          }
        }
      }
    }
  }

  var sum = 0;
  var length = len();
  sum += 4 * length;

  if (lower > 0) {
    sum += 2 * (length - lower);
  }

  if (upper > 0) {
    sum += 2 * (length - upper);
  }

  if (num !== length) {
    sum += 4 * num;
  }

  sum += 6 * symbol;
  sum += 2 * MNS;
  sum += 2 * callMe();

  if (length === lower + upper) {
    sum -= length;
  }

  if (length === num) {
    sum -= num;
  }

  sum -= repC;
  sum -= 2 * consecutive;
  sum -= 3 * sequential;
  sum = sum < 0 ? 0 : sum;
  sum = sum > 100 ? 100 : sum;

  if (sum >= 80) {
    return 100;
  } else if (sum >= 60) {
    return 80;
  } else if (sum >= 40) {
    return 60;
  } else if (sum >= 20) {
    return 40;
  } else {
    return 20;
  }
};

var PasswordStrength = function PasswordStrength(props) {
  if ((0, _shared.isFn)(props.children)) {
    return props.children(getStrength(String(props.value || '')));
  } else {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, props.children);
  }
};

exports.PasswordStrength = PasswordStrength;