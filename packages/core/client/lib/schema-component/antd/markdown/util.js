"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToText = convertToText;
exports.markdown = markdown;

var _marked = require("marked");

function markdown(text) {
  if (!text) {
    return '';
  }

  return _marked.marked.parse(text);
}

function convertToText(markdownText) {
  var content = markdown(markdownText);
  var temp = document.createElement('div');
  temp.innerHTML = content;
  var text = temp.innerText;
  temp = null;
  return text.replace(/[\n\r]/g, '');
}