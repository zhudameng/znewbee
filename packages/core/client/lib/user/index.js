"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CurrentUser = require("./CurrentUser");

Object.keys(_CurrentUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CurrentUser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CurrentUser[key];
    }
  });
});

var _CurrentUserProvider = require("./CurrentUserProvider");

Object.keys(_CurrentUserProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CurrentUserProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CurrentUserProvider[key];
    }
  });
});

var _SigninPage = require("./SigninPage");

Object.keys(_SigninPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SigninPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SigninPage[key];
    }
  });
});

var _SignupPage = require("./SignupPage");

Object.keys(_SignupPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SignupPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SignupPage[key];
    }
  });
});