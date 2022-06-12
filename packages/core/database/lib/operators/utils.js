"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPg = exports.isMySQL = exports.getDialect = void 0;

const getDialect = ctx => {
  return ctx.db.sequelize.getDialect();
};

exports.getDialect = getDialect;

const isPg = ctx => {
  return getDialect(ctx) === 'postgres';
};

exports.isPg = isPg;

const isMySQL = ctx => {
  return getDialect(ctx) === 'mysql';
};

exports.isMySQL = isMySQL;