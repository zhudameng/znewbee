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

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { usePrefixCls } from '@formily/antd/lib/__builtins__';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Button, Progress, Space, Upload as AntdUpload } from 'antd';
import cls from 'classnames';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import { ReadPretty } from './ReadPretty';
import { isImage, toArr, toFileList, toItem, toValue, useUploadProps } from './shared';
import './style.less';
export var Upload = connect(function (props) {
  return /*#__PURE__*/React.createElement(AntdUpload, _objectSpread({}, useUploadProps(props)));
}, mapProps({
  value: 'fileList'
}), mapReadPretty(ReadPretty.Upload));
Upload.Attachment = connect(function (props) {
  var _images$photoIndex, _images, _images2, _images$photoIndex2;

  var disabled = props.disabled,
      multiple = props.multiple,
      value = props.value,
      _onChange = props.onChange;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      sync = _useState4[0],
      setSync = _useState4[1];

  var images = fileList;

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      photoIndex = _useState6[0],
      setPhotoIndex = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      visible = _useState8[0],
      setVisible = _useState8[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  useEffect(function () {
    if (sync) {
      setFileList(toFileList(value));
    }
  }, [value, sync]);
  var uploadProps = useUploadProps(_objectSpread({}, props));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: cls('ant-upload-picture-card-wrapper nb-upload')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ant-upload-list ant-upload-list-picture-card'
  }, fileList.map(function (file) {
    var handleClick = function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var index = fileList.indexOf(file);

      if (isImage(file.extname)) {
        setVisible(true);
        setPhotoIndex(index);
      } else {
        saveAs(file.url, "".concat(file.title).concat(file.extname));
      }
    };

    return /*#__PURE__*/React.createElement("div", {
      className: 'ant-upload-list-picture-card-container'
    }, /*#__PURE__*/React.createElement("div", {
      className: "ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'ant-upload-list-item-info'
    }, /*#__PURE__*/React.createElement("span", {
      className: "ant-upload-span"
    }, /*#__PURE__*/React.createElement("a", {
      className: "ant-upload-list-item-thumbnail",
      href: file.url,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: handleClick
    }, file.imageUrl && /*#__PURE__*/React.createElement("img", {
      src: file.imageUrl,
      alt: file.title,
      className: "ant-upload-list-item-image"
    })), /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      className: "ant-upload-list-item-name",
      title: file.title,
      href: file.url,
      onClick: handleClick
    }, file.status === 'uploading' ? t('Uploading') : file.title))), /*#__PURE__*/React.createElement("span", {
      className: 'ant-upload-list-item-actions'
    }, /*#__PURE__*/React.createElement(Space, {
      size: 3
    }, /*#__PURE__*/React.createElement(Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/React.createElement(DownloadOutlined, null),
      onClick: function onClick() {
        saveAs(file.url, "".concat(file.title).concat(file.extname));
      }
    }), !disabled && /*#__PURE__*/React.createElement(Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/React.createElement(DeleteOutlined, null),
      onClick: function onClick() {
        setSync(false);
        setFileList(function (prevFileList) {
          if (!multiple) {
            _onChange(null);

            return [];
          }

          var index = prevFileList.indexOf(file);
          prevFileList.splice(index, 1);

          _onChange(toValue(_toConsumableArray(prevFileList)));

          return _toConsumableArray(prevFileList);
        });
      }
    }))), file.status === 'uploading' && /*#__PURE__*/React.createElement("div", {
      className: 'ant-upload-list-item-progress'
    }, /*#__PURE__*/React.createElement(Progress, {
      strokeWidth: 2,
      type: 'line',
      showInfo: false,
      percent: file.percent
    }))));
  }), !disabled && (multiple || toArr(value).length < 1) && /*#__PURE__*/React.createElement("div", {
    className: 'ant-upload-list-picture-card-container'
  }, /*#__PURE__*/React.createElement(AntdUpload, _objectSpread(_objectSpread({}, uploadProps), {}, {
    disabled: disabled,
    multiple: multiple,
    listType: 'picture-card',
    fileList: fileList,
    onChange: function onChange(info) {
      setSync(false);

      if (multiple) {
        if (info.file.status === 'done') {
          _onChange(toValue(info.fileList));
        }

        setFileList(info.fileList.map(toItem));
      } else {
        if (info.file.status === 'done') {
          var _info$file, _info$file$response;

          // TODO(BUG): object 的联动有问题，不响应，折中的办法先置空再赋值
          _onChange(null);

          _onChange((_info$file = info.file) === null || _info$file === void 0 ? void 0 : (_info$file$response = _info$file.response) === null || _info$file$response === void 0 ? void 0 : _info$file$response.data);
        }

        setFileList([toItem(info.file)]);
      }
    },
    showUploadList: false
  }), !disabled && (multiple || toArr(value).length < 1) && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("br", null), " ", t('Upload')))))), visible && /*#__PURE__*/React.createElement(Lightbox // discourageDownloads={true}
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
    toolbarButtons: [/*#__PURE__*/React.createElement("button", {
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
        saveAs(file.url, "".concat(file.title).concat(file.extname));
      }
    }, /*#__PURE__*/React.createElement(DownloadOutlined, null))]
  }));
}, mapReadPretty(ReadPretty.Attachment));
Upload.Dragger = connect(function (props) {
  return /*#__PURE__*/React.createElement("div", {
    className: usePrefixCls('upload-dragger')
  }, /*#__PURE__*/React.createElement(AntdUpload.Dragger, _objectSpread({}, useUploadProps(props))));
}, mapProps({
  value: 'fileList'
}));
export default Upload;