"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hookFactory = hookFactory;

function hookFactory(hookType, hookName, hookFunc) {
  return {
    hookType,
    hookName,
    hookFunc
  };
}