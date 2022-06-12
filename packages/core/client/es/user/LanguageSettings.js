function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Menu, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient, useCurrentUserContext } from '..';
export var LanguageSettings = function LanguageSettings() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var api = useAPIClient();
  var ctx = useCurrentUserContext();
  return /*#__PURE__*/React.createElement(Menu.Item, {
    eventKey: 'LanguageSettings',
    onClick: function onClick() {
      setOpen(true);
    }
  }, t('Language'), ' ', /*#__PURE__*/React.createElement(Select, {
    style: {
      minWidth: 100
    },
    bordered: false,
    open: open,
    onDropdownVisibleChange: function onDropdownVisibleChange(open) {
      setOpen(open);
    },
    options: [{
      label: '简体中文',
      value: 'zh-CN'
    }, {
      label: 'English',
      value: 'en-US'
    }],
    value: i18n.language,
    onChange: function () {
      var _onChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(lang) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return api.resource('users').updateProfile({
                  values: {
                    appLang: lang
                  }
                });

              case 2:
                api.auth.setLocale(lang);
                _context.next = 5;
                return i18n.changeLanguage(lang);

              case 5:
                window.location.reload();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      return onChange;
    }()
  }));
};