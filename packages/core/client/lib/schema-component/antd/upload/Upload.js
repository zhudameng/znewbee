"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Upload = void 0;

var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons/DeleteOutlined"));

var _DownloadOutlined = _interopRequireDefault(require("@ant-design/icons/DownloadOutlined"));

var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));

var _builtins__ = require("@formily/antd/lib/__builtins__");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _fileSaver = require("file-saver");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _reactImageLightbox = _interopRequireDefault(require("react-image-lightbox"));

require("react-image-lightbox/style.css");

var _ReadPretty = require("./ReadPretty");

var _shared = require("./shared");

require("./style.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Upload = (0, _react.connect)(function (props) {
  return /*#__PURE__*/_react2.default.createElement(_antd.Upload, _objectSpread({}, (0, _shared.useUploadProps)(props)));
}, (0, _react.mapProps)({
  value: 'fileList'
}), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty.Upload));
exports.Upload = Upload;
Upload.Attachment = (0, _react.connect)(function (props) {
  var _images$photoIndex, _images, _images2, _images$photoIndex2;

  var disabled = props.disabled,
      multiple = props.multiple,
      value = props.value,
      _onChange = props.onChange;

  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1];

  var _useState3 = (0, _react2.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      sync = _useState4[0],
      setSync = _useState4[1];

  var images = fileList;

  var _useState5 = (0, _react2.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      photoIndex = _useState6[0],
      setPhotoIndex = _useState6[1];

  var _useState7 = (0, _react2.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      visible = _useState8[0],
      setVisible = _useState8[1];

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  (0, _react2.useEffect)(function () {
    if (sync) {
      setFileList((0, _shared.toFileList)(value));
    }
  }, [value, sync]);
  var uploadProps = (0, _shared.useUploadProps)(_objectSpread({}, props));
  return /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _classnames.default)('ant-upload-picture-card-wrapper nb-upload')
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: 'ant-upload-list ant-upload-list-picture-card'
  }, fileList.map(function (file) {
    var handleClick = function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var index = fileList.indexOf(file);

      if ((0, _shared.isImage)(file.extname)) {
        setVisible(true);
        setPhotoIndex(index);
      } else {
        (0, _fileSaver.saveAs)(file.url, "".concat(file.title).concat(file.extname));
      }
    };

    return /*#__PURE__*/_react2.default.createElement("div", {
      className: 'ant-upload-list-picture-card-container'
    }, /*#__PURE__*/_react2.default.createElement("div", {
      className: "ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
    }, /*#__PURE__*/_react2.default.createElement("div", {
      className: 'ant-upload-list-item-info'
    }, /*#__PURE__*/_react2.default.createElement("span", {
      className: "ant-upload-span"
    }, /*#__PURE__*/_react2.default.createElement("a", {
      className: "ant-upload-list-item-thumbnail",
      href: file.url,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: handleClick
    }, file.imageUrl && /*#__PURE__*/_react2.default.createElement("img", {
      src: file.imageUrl,
      alt: file.title,
      className: "ant-upload-list-item-image"
    })), /*#__PURE__*/_react2.default.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      className: "ant-upload-list-item-name",
      title: file.title,
      href: file.url,
      onClick: handleClick
    }, file.status === 'uploading' ? t('Uploading') : file.title))), /*#__PURE__*/_react2.default.createElement("span", {
      className: 'ant-upload-list-item-actions'
    }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
      size: 3
    }, /*#__PURE__*/_react2.default.createElement(_antd.Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/_react2.default.createElement(_DownloadOutlined.default, null),
      onClick: function onClick() {
        (0, _fileSaver.saveAs)(file.url, "".concat(file.title).concat(file.extname));
      }
    }), !disabled && /*#__PURE__*/_react2.default.createElement(_antd.Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/_react2.default.createElement(_DeleteOutlined.default, null),
      onClick: function onClick() {
        setSync(false);
        setFileList(function (prevFileList) {
          if (!multiple) {
            _onChange(null);

            return [];
          }

          var index = prevFileList.indexOf(file);
          prevFileList.splice(index, 1);

          _onChange((0, _shared.toValue)(_toConsumableArray(prevFileList)));

          return _toConsumableArray(prevFileList);
        });
      }
    }))), file.status === 'uploading' && /*#__PURE__*/_react2.default.createElement("div", {
      className: 'ant-upload-list-item-progress'
    }, /*#__PURE__*/_react2.default.createElement(_antd.Progress, {
      strokeWidth: 2,
      type: 'line',
      showInfo: false,
      percent: file.percent
    }))));
  }), !disabled && (multiple || (0, _shared.toArr)(value).length < 1) && /*#__PURE__*/_react2.default.createElement("div", {
    className: 'ant-upload-list-picture-card-container'
  }, /*#__PURE__*/_react2.default.createElement(_antd.Upload, _objectSpread(_objectSpread({}, uploadProps), {}, {
    disabled: disabled,
    multiple: multiple,
    listType: 'picture-card',
    fileList: fileList,
    onChange: function onChange(info) {
      setSync(false);

      if (multiple) {
        if (info.file.status === 'done') {
          _onChange((0, _shared.toValue)(info.fileList));
        }

        setFileList(info.fileList.map(_shared.toItem));
      } else {
        if (info.file.status === 'done') {
          var _info$file, _info$file$response;

          // TODO(BUG): object 的联动有问题，不响应，折中的办法先置空再赋值
          _onChange(null);

          _onChange((_info$file = info.file) === null || _info$file === void 0 ? void 0 : (_info$file$response = _info$file.response) === null || _info$file$response === void 0 ? void 0 : _info$file$response.data);
        }

        setFileList([(0, _shared.toItem)(info.file)]);
      }
    },
    showUploadList: false
  }), !disabled && (multiple || (0, _shared.toArr)(value).length < 1) && /*#__PURE__*/_react2.default.createElement("span", null, /*#__PURE__*/_react2.default.createElement(_PlusOutlined.default, null), /*#__PURE__*/_react2.default.createElement("br", null), " ", t('Upload')))))), visible && /*#__PURE__*/_react2.default.createElement(_reactImageLightbox.default // discourageDownloads={true}
  , {
    // discourageDownloads={true}
    mainSrc: (_images$photoIndex = images[photoIndex]) === null || _images$photoIndex === void 0 ? void 0 : _images$photoIndex.imageUrl,
    nextSrc: (_images = images[(photoIndex + 1) % images.length]) === null || _images === void 0 ? void 0 : _images.imageUrl,
    prevSrc: (_images2 = images[(photoIndex + images.length - 1) % images.length]) === null || _images2 === void 0 ? void 0 : _images2.imageUrl,
    onCloseRequest: function onCloseRequest() {
      return setVisible(false);
    },
    onMovePrevRequest: function onMovePrevRequest() {
      return setPhotoIndex((photoIndex + images.length - 1) % images.length);
    },
    onMoveNextRequest: function onMoveNextRequest() {
      return setPhotoIndex((photoIndex + 1) % images.length);
    },
    imageTitle: (_images$photoIndex2 = images[photoIndex]) === null || _images$photoIndex2 === void 0 ? void 0 : _images$photoIndex2.title,
    toolbarButtons: [/*#__PURE__*/_react2.default.createElement("button", {
      style: {
        fontSize: 22,
        background: 'none',
        lineHeight: 1
      },
      type: "button",
      "aria-label": "Zoom in",
      title: "Zoom in",
      className: "ril-zoom-in ril__toolbarItemChild ril__builtinButton",
      onClick: function onClick(e) {
        e.preventDefault();
        var file = images[photoIndex];
        (0, _fileSaver.saveAs)(file.url, "".concat(file.title).concat(file.extname));
      }
    }, /*#__PURE__*/_react2.default.createElement(_DownloadOutlined.default, null))]
  }));
}, (0, _react.mapReadPretty)(_ReadPretty.ReadPretty.Attachment));
Upload.Dragger = (0, _react.connect)(function (props) {
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _builtins__.usePrefixCls)('upload-dragger')
  }, /*#__PURE__*/_react2.default.createElement(_antd.Upload.Dragger, _objectSpread({}, (0, _shared.useUploadProps)(props))));
}, (0, _react.mapProps)({
  value: 'fileList'
}));
var _default = Upload;
exports.default = _default;