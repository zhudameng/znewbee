"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toValue = exports.toMap = exports.toItem = exports.toImages = exports.toFileList = exports.toArr = exports.testOpts = exports.normalizeFileList = exports.isImage = exports.getURL = exports.getThumbURL = exports.getState = exports.getImageByUrl = exports.getErrorMessage = void 0;
exports.useUploadProps = useUploadProps;
exports.useValidator = exports.useUploadValidator = void 0;

var _react = require("@formily/react");

var _reactive = require("@formily/reactive");

var _shared = require("@formily/shared");

var _react2 = require("react");

var _apiClient = require("../../../api-client");

var _placeholder = require("./placeholder");

var _excluded = ["serviceErrorMessage"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isImage = function isImage(extName) {
  var reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return reg.test(extName);
};

exports.isImage = isImage;

var toMap = function toMap(fileList) {
  if (!fileList) {
    return [];
  }

  if (_typeof(fileList) !== 'object') {
    return [];
  }

  var list = fileList;

  if (!Array.isArray(fileList)) {
    if (Object.keys(_objectSpread({}, fileList)).length === 0) {
      return [];
    }

    list = [fileList];
  }

  return list.map(function (item) {
    return [item.id || item.uid, toItem(item)];
  });
};

exports.toMap = toMap;

var toImages = function toImages(fileList) {
  if (!fileList) {
    return [];
  }

  if (_typeof(fileList) !== 'object') {
    return [];
  }

  if (Object.keys(fileList).length === 0) {
    return [];
  }

  var list = fileList;

  if (!Array.isArray(fileList) && _typeof(fileList) === 'object') {
    list = [fileList];
  }

  return list.map(function (item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      title: item.title || item.name,
      imageUrl: getImageByUrl(item.url, {
        exclude: ['.png', '.jpg', '.jpeg', '.gif']
      })
    });
  });
};

exports.toImages = toImages;

var toArr = function toArr(value) {
  if (!(0, _shared.isValid)(value)) {
    return [];
  }

  if (Object.keys(value).length === 0) {
    return [];
  }

  return (0, _shared.toArr)(value);
};

exports.toArr = toArr;

var testOpts = function testOpts(ext, options) {
  if (options && (0, _shared.isArr)(options.include)) {
    return options.include.some(function (url) {
      return ext.test(url);
    });
  }

  if (options && (0, _shared.isArr)(options.exclude)) {
    return !options.exclude.some(function (url) {
      return ext.test(url);
    });
  }

  return true;
};

exports.testOpts = testOpts;

var getImageByUrl = function getImageByUrl(url, options) {
  for (var i = 0; i < _placeholder.UPLOAD_PLACEHOLDER.length; i++) {
    if (_placeholder.UPLOAD_PLACEHOLDER[i].ext.test(url) && testOpts(_placeholder.UPLOAD_PLACEHOLDER[i].ext, options)) {
      return _placeholder.UPLOAD_PLACEHOLDER[i].icon || url;
    }
  }

  return url;
};

exports.getImageByUrl = getImageByUrl;

var getURL = function getURL(target) {
  return (target === null || target === void 0 ? void 0 : target['url']) || (target === null || target === void 0 ? void 0 : target['downloadURL']) || (target === null || target === void 0 ? void 0 : target['imgURL']);
};

exports.getURL = getURL;

var getThumbURL = function getThumbURL(target) {
  return (target === null || target === void 0 ? void 0 : target['thumbUrl']) || (target === null || target === void 0 ? void 0 : target['url']) || (target === null || target === void 0 ? void 0 : target['downloadURL']) || (target === null || target === void 0 ? void 0 : target['imgURL']);
};

exports.getThumbURL = getThumbURL;

var getErrorMessage = function getErrorMessage(target) {
  return (target === null || target === void 0 ? void 0 : target.errorMessage) || (target === null || target === void 0 ? void 0 : target.errMsg) || (target === null || target === void 0 ? void 0 : target.errorMsg) || (target === null || target === void 0 ? void 0 : target.message) || typeof (target === null || target === void 0 ? void 0 : target.error) === 'string' ? target.error : '';
};

exports.getErrorMessage = getErrorMessage;

var getState = function getState(target) {
  if ((target === null || target === void 0 ? void 0 : target.success) === false) return 'error';
  if ((target === null || target === void 0 ? void 0 : target.failed) === true) return 'error';
  if (target === null || target === void 0 ? void 0 : target.error) return 'error';
  return (target === null || target === void 0 ? void 0 : target.state) || (target === null || target === void 0 ? void 0 : target.status);
};

exports.getState = getState;

var normalizeFileList = function normalizeFileList(fileList) {
  if (fileList && fileList.length) {
    return fileList.map(function (file, index) {
      return _objectSpread(_objectSpread({}, file), {}, {
        uid: file.uid || "".concat(index),
        status: getState(file.response) || getState(file),
        url: getURL(file) || getURL(file === null || file === void 0 ? void 0 : file.response),
        thumbUrl: getImageByUrl(getThumbURL(file) || getThumbURL(file === null || file === void 0 ? void 0 : file.response), {
          exclude: ['.png', '.jpg', '.jpeg', '.gif']
        })
      });
    });
  }

  return [];
};

exports.normalizeFileList = normalizeFileList;

var useValidator = function useValidator(validator) {
  var field = (0, _react.useField)();
  (0, _react2.useEffect)(function () {
    var dispose = (0, _reactive.reaction)(function () {
      return field.value;
    }, function (value) {
      var message = validator(value);
      field.setFeedback({
        type: 'error',
        code: 'UploadError',
        messages: message ? [message] : []
      });
    });
    return function () {
      dispose();
    };
  }, []);
};

exports.useValidator = useValidator;

var useUploadValidator = function useUploadValidator() {
  var serviceErrorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Upload Service Error';
  useValidator(function (value) {
    var list = toArr(value);

    for (var i = 0; i < list.length; i++) {
      var _list$i;

      if (((_list$i = list[i]) === null || _list$i === void 0 ? void 0 : _list$i.status) === 'error') {
        var _list$i2;

        return getErrorMessage((_list$i2 = list[i]) === null || _list$i2 === void 0 ? void 0 : _list$i2.response) || getErrorMessage(list[i]) || serviceErrorMessage;
      }
    }
  });
};

exports.useUploadValidator = useUploadValidator;

function useUploadProps(_ref) {
  var serviceErrorMessage = _ref.serviceErrorMessage,
      props = _objectWithoutProperties(_ref, _excluded);

  useUploadValidator(serviceErrorMessage);

  var onChange = function onChange(param) {
    var _props$onChange;

    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, normalizeFileList(_toConsumableArray(param.fileList)));
  };

  var api = (0, _apiClient.useAPIClient)();
  return _objectSpread(_objectSpread({}, props), {}, {
    customRequest: function customRequest(_ref2) {
      var action = _ref2.action,
          data = _ref2.data,
          file = _ref2.file,
          filename = _ref2.filename,
          headers = _ref2.headers,
          onError = _ref2.onError,
          onProgress = _ref2.onProgress,
          onSuccess = _ref2.onSuccess,
          withCredentials = _ref2.withCredentials;
      var formData = new FormData();

      if (data) {
        Object.keys(data).forEach(function (key) {
          formData.append(key, data[key]);
        });
      }

      formData.append(filename, file);
      api.axios.post(action, formData, {
        withCredentials: withCredentials,
        headers: headers,
        onUploadProgress: function onUploadProgress(_ref3) {
          var total = _ref3.total,
              loaded = _ref3.loaded;
          onProgress({
            percent: Math.round(loaded / total * 100).toFixed(2)
          }, file);
        }
      }).then(function (_ref4) {
        var data = _ref4.data;
        onSuccess(data, file);
      }).catch(onError);
      return {
        abort: function abort() {
          console.log('upload progress is aborted.');
        }
      };
    },
    onChange: onChange
  });
}

var toItem = function toItem(file) {
  var _file, _file$response;

  if ((_file = file) === null || _file === void 0 ? void 0 : (_file$response = _file.response) === null || _file$response === void 0 ? void 0 : _file$response.data) {
    file = file.response.data;
  }

  return _objectSpread(_objectSpread({}, file), {}, {
    id: file.id || file.uid,
    title: file.title || file.name,
    imageUrl: getImageByUrl(file.url, {
      exclude: ['.png', '.jpg', '.jpeg', '.gif']
    })
  });
};

exports.toItem = toItem;

var toFileList = function toFileList(fileList) {
  return toArr(fileList).map(toItem);
};

exports.toFileList = toFileList;

var toValue = function toValue(fileList) {
  return toArr(fileList).filter(function (file) {
    return !file.response || file.status === 'done';
  }).map(function (file) {
    var _file$response2;

    return (file === null || file === void 0 ? void 0 : (_file$response2 = file.response) === null || _file$response2 === void 0 ? void 0 : _file$response2.data) || file;
  });
};

exports.toValue = toValue;