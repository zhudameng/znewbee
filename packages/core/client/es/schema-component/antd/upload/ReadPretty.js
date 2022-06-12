function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import { useField } from '@formily/react';
import { Button, Space } from 'antd';
import cls from 'classnames';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { isImage, toArr, toImages } from './shared';
export var ReadPretty = function ReadPretty() {
  return null;
};

ReadPretty.Attachment = function (props) {
  var _images$photoIndex, _images, _images2, _images$photoIndex2;

  var field = useField();
  var images = toImages(toArr(field.value));

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      photoIndex = _useState2[0],
      setPhotoIndex = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var size = props.size;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: cls('ant-upload-picture-card-wrapper nb-upload', size ? "nb-upload-".concat(size) : null)
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ant-upload-list ant-upload-list-picture-card'
  }, images.map(function (file) {
    var handleClick = function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var index = images.indexOf(file);

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
      src: "".concat(file.imageUrl, "?x-oss-process=style/thumbnail"),
      alt: file.title,
      className: "ant-upload-list-item-image"
    })), /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      className: "ant-upload-list-item-name",
      title: file.title,
      href: file.url,
      onClick: handleClick
    }, file.title))), size !== 'small' && /*#__PURE__*/React.createElement("span", {
      className: 'ant-upload-list-item-actions'
    }, /*#__PURE__*/React.createElement(Space, {
      size: 3
    }, /*#__PURE__*/React.createElement(Button, {
      size: 'small',
      type: 'text',
      icon: /*#__PURE__*/React.createElement(DownloadOutlined, null),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        saveAs(file.url, "".concat(file.title).concat(file.extname));
      }
    })))));
  }))), visible && /*#__PURE__*/React.createElement(Lightbox // discourageDownloads={true}
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
        e.stopPropagation();
        var file = images[photoIndex];
        saveAs(file.url, "".concat(file.title).concat(file.extname));
      }
    }, /*#__PURE__*/React.createElement(DownloadOutlined, null))]
  }));
};

ReadPretty.Upload = function (props) {
  var field = useField();
  return (field.value || []).map(function (item) {
    return /*#__PURE__*/React.createElement("div", null, item.url ? /*#__PURE__*/React.createElement("a", {
      target: '_blank',
      href: item.url
    }, item.name) : /*#__PURE__*/React.createElement("span", null, item.name));
  });
};