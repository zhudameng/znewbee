"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _DownloadOutlined = _interopRequireDefault(require("@ant-design/icons/DownloadOutlined"));

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _fileSaver = require("file-saver");

var _react2 = _interopRequireWildcard(require("react"));

var _reactImageLightbox = _interopRequireDefault(require("react-image-lightbox"));

var _shared = require("./shared");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReadPretty = function ReadPretty() {
  return null;
};

exports.ReadPretty = ReadPretty;

ReadPretty.Attachment = function (props) {
  var _images$photoIndex, _images, _images2, _images$photoIndex2;

  var field = (0, _react.useField)();
  var images = (0, _shared.toImages)((0, _shared.toArr)(field.value));

  var _useState = (0, _react2.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      photoIndex = _useState2[0],
      setPhotoIndex = _useState2[1];

  var _useState3 = (0, _react2.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var size = props.size;
  return /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _classnames.default)('ant-upload-picture-card-wrapper nb-upload', size ? "nb-upload-".concat(size) : null)
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: 'ant-upload-list ant-upload-list-picture-card'
  }, images.map(function (file) {
    var handleClick = function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var index = images.indexOf(file);

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
      src: "".concat(file.imageUrl, "?x-oss-process=style/thumbnail"),
      alt: file.title,
      className: "ant-upload-list-item-image"
    })), /*#__PURE__*/_react2.default.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      className: "ant-upload-list-item-name",
      title: file.title,
      href: file.url,
      onClick: handleClick
    }, file.title))), size !== 'small' && /*#__PURE__*/_react2.default.createElement("span", {
      className: 'ant-upload-list-item-actions'
    }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
      size: 3
    }, /*#__PURE__*/_react2.default.createElement(_antd.Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/_react2.default.createElement(_DownloadOutlined.default, null),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        (0, _fileSaver.saveAs)(file.url, "".concat(file.title).concat(file.extname));
      }
    })))));
  }))), visible && /*#__PURE__*/_react2.default.createElement(_reactImageLightbox.default // discourageDownloads={true}
  , {
    // discourageDownloads={true}
    mainSrc: (_images$photoIndex = images[photoIndex]) === null || _images$photoIndex === void 0 ? void 0 : _images$photoIndex.imageUrl,
    nextSrc: (_images = images[(photoIndex + 1) % images.length]) === null || _images === void 0 ? void 0 : _images.imageUrl,
    prevSrc: (_images2 = images[(photoIndex + images.length - 1) % images.length]) === null || _images2 === void 0 ? void 0 : _images2.imageUrl,
    // @ts-ignore
    onCloseRequest: function onCloseRequest(e) {
      e.preventDefault();
      e.stopPropagation();
      setVisible(false);
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
        e.stopPropagation();
        var file = images[photoIndex];
        (0, _fileSaver.saveAs)(file.url, "".concat(file.title).concat(file.extname));
      }
    }, /*#__PURE__*/_react2.default.createElement(_DownloadOutlined.default, null))]
  }));
};

ReadPretty.Upload = function (props) {
  var field = (0, _react.useField)();
  return (field.value || []).map(function (item) {
    return /*#__PURE__*/_react2.default.createElement("div", null, item.url ? /*#__PURE__*/_react2.default.createElement("a", {
      target: '_blank',
      href: item.url
    }, item.name) : /*#__PURE__*/_react2.default.createElement("span", null, item.name));
  });
};