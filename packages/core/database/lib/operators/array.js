"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _utils = require("./utils");

const getFieldName = ctx => {
  const fieldName = ctx.fieldName;
  return fieldName;
};

const escape = (value, ctx) => {
  const sequelize = ctx.db.sequelize;
  return sequelize.escape(value);
};

const sqliteExistQuery = (value, ctx) => {
  const fieldName = getFieldName(ctx);
  const sqlArray = `(${value.map(v => `'${v}'`).join(', ')})`;
  const subQuery = `exists (select * from json_each(${fieldName}) where json_each.value in ${sqlArray})`;
  return subQuery;
};

const emptyQuery = (ctx, operator) => {
  const fieldName = getFieldName(ctx);
  let funcName = 'json_array_length';
  let ifNull = 'IFNULL';

  if ((0, _utils.isPg)(ctx)) {
    funcName = 'jsonb_array_length';
    ifNull = 'coalesce';
  }

  if ((0, _utils.isMySQL)(ctx)) {
    funcName = 'json_length';
  }

  return `(select ${ifNull}(${funcName}(${fieldName}), 0) ${operator} 0)`;
};

var _default = {
  $match(value, ctx) {
    const fieldName = getFieldName(ctx);

    if ((0, _utils.isPg)(ctx)) {
      return {
        [_sequelize().Op.contained]: value,
        [_sequelize().Op.contains]: value
      };
    }

    value = escape(JSON.stringify(value.sort()), ctx);

    if ((0, _utils.isMySQL)(ctx)) {
      return _sequelize().Sequelize.literal(`JSON_CONTAINS(${fieldName}, ${value}) AND JSON_CONTAINS(${value}, ${fieldName})`);
    }

    return {
      [_sequelize().Op.eq]: _sequelize().Sequelize.literal(`json(${value})`)
    };
  },

  $notMatch(value, ctx) {
    const fieldName = getFieldName(ctx);
    value = escape(JSON.stringify(value), ctx);

    if ((0, _utils.isPg)(ctx)) {
      return _sequelize().Sequelize.literal(`not (${fieldName} <@ ${value}::JSONB and ${fieldName} @> ${value}::JSONB)`);
    }

    if ((0, _utils.isMySQL)(ctx)) {
      return _sequelize().Sequelize.literal(`not (JSON_CONTAINS(${fieldName}, ${value}) AND JSON_CONTAINS(${value}, ${fieldName}))`);
    }

    return {
      [_sequelize().Op.ne]: _sequelize().Sequelize.literal(`json(${value})`)
    };
  },

  $anyOf(value, ctx) {
    const fieldName = getFieldName(ctx);

    if ((0, _utils.isPg)(ctx)) {
      return _sequelize().Sequelize.literal(`${fieldName} ?| ${escape(value.map(i => `${i}`), ctx)}`);
    }

    if ((0, _utils.isMySQL)(ctx)) {
      value = escape(JSON.stringify(value), ctx);
      return _sequelize().Sequelize.literal(`JSON_OVERLAPS(${fieldName}, ${value})`);
    }

    const subQuery = sqliteExistQuery(value, ctx);
    return _sequelize().Sequelize.literal(subQuery);
  },

  $noneOf(value, ctx) {
    let where;

    if ((0, _utils.isPg)(ctx)) {
      const fieldName = getFieldName(ctx); // pg single quote

      where = _sequelize().Sequelize.literal(`not (${fieldName} ?| ${escape(value.map(i => `${i}`), ctx)})`);
    } else if ((0, _utils.isMySQL)(ctx)) {
      const fieldName = getFieldName(ctx);
      value = escape(JSON.stringify(value), ctx);
      where = _sequelize().Sequelize.literal(`NOT JSON_OVERLAPS(${fieldName}, ${value})`);
    } else {
      const subQuery = sqliteExistQuery(value, ctx);
      where = _sequelize().Sequelize.literal(`not ${subQuery}`);
    }

    return {
      [_sequelize().Op.or]: [where, {
        [_sequelize().Op.is]: null
      }]
    };
  },

  $arrayEmpty(value, ctx) {
    const subQuery = emptyQuery(ctx, '=');
    return {
      [_sequelize().Op.and]: [_sequelize().Sequelize.literal(`${subQuery}`)]
    };
  },

  $arrayNotEmpty(value, ctx) {
    const subQuery = emptyQuery(ctx, '>');
    return {
      [_sequelize().Op.and]: [_sequelize().Sequelize.literal(`${subQuery}`)]
    };
  }

};
exports.default = _default;