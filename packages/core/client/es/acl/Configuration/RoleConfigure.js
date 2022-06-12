function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { onFieldChange } from '@formily/core';
import { message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient, useRequest } from '../../api-client';
import { useRecord } from '../../record-provider';
import { SchemaComponent } from '../../schema-component';
export var RoleConfigure = function RoleConfigure() {
  var api = useAPIClient();
  var record = useRecord();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: {
      type: 'void',
      name: 'form',
      'x-component': 'Form',
      'x-component-props': {
        useValues: function useValues(options) {
          return useRequest({
            resource: 'roles',
            action: 'get',
            params: {
              filterByTk: record.name
            }
          }, options);
        },
        effects: function effects() {
          onFieldChange('*', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(field, form) {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (form.modified) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return");

                    case 2:
                      _context.next = 4;
                      return api.resource('roles').update({
                        filterByTk: record.name,
                        values: form.values
                      });

                    case 4:
                      message.success(t('Saved successfully'));

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        }
      },
      properties: {
        allowConfigure: {
          title: t('Configure permissions'),
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox',
          'x-content': t('Allows configuration of the whole system, including UI, collections, permissions, etc.')
        },
        'strategy.actions': {
          title: t('Global action permissions'),
          description: t('All collections use general action permissions by default; permission configured individually will override the default one.'),
          'x-component': 'StrategyActions',
          'x-decorator': 'FormItem'
        },
        allowNewMenu: {
          title: t('Menu permissions'),
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox',
          'x-content': t('New menu items are allowed to be accessed by default.')
        }
      }
    }
  });
};