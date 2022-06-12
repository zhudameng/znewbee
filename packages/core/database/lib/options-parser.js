"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsParser = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _filterParser = _interopRequireDefault(require("./filter-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = require('debug')('noco-database');

class OptionsParser {
  constructor(options, context) {
    this.options = void 0;
    this.database = void 0;
    this.collection = void 0;
    this.model = void 0;
    this.filterParser = void 0;
    this.context = void 0;
    const collection = context.collection;
    this.collection = collection;
    this.model = collection.model;
    this.options = options;
    this.database = collection.context.database;
    this.filterParser = new _filterParser.default(options === null || options === void 0 ? void 0 : options.filter, {
      collection,
      app: {
        ctx: options === null || options === void 0 ? void 0 : options.context
      }
    });
    this.context = context;
  }

  isAssociation(key) {
    return this.model.associations[key] !== undefined;
  }

  isAssociationPath(path) {
    return this.isAssociation(path.split('.')[0]);
  }

  toSequelizeParams() {
    var _this$options;

    const queryParams = this.filterParser.toSequelizeParams();

    if ((_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.filterByTk) {
      queryParams.where = {
        [_sequelize().Op.and]: [queryParams.where, {
          [this.context.targetKey || this.collection.filterTargetKey]: this.options.filterByTk
        }]
      };
    }

    return this.parseSort(this.parseFields(queryParams));
  }
  /**
   * parser sort options
   * @param filterParams
   * @protected
   */


  parseSort(filterParams) {
    var _this$options2;

    let sort = ((_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.sort) || [];

    if (typeof sort === 'string') {
      sort = sort.split(',');
    }

    const orderParams = sort.map(sortKey => {
      const direction = sortKey.startsWith('-') ? 'DESC' : 'ASC';
      const sortField = sortKey.replace('-', '').split('.'); // handle sort by association

      if (sortField.length > 1) {
        let associationModel = this.model;

        for (let i = 0; i < sortField.length - 1; i++) {
          const associationKey = sortField[i];
          sortField[i] = associationModel.associations[associationKey].target;
          associationModel = sortField[i];
        }
      }

      sortField.push(direction);
      return sortField;
    });

    if (orderParams.length > 0) {
      return _objectSpread({
        order: orderParams
      }, filterParams);
    }

    return filterParams;
  }

  parseFields(filterParams) {
    var _this$options3, _this$options4, _this$options5;

    const appends = ((_this$options3 = this.options) === null || _this$options3 === void 0 ? void 0 : _this$options3.appends) || [];
    const except = [];
    let attributes = {
      include: [],
      exclude: []
    }; // out put all fields by default

    if ((_this$options4 = this.options) === null || _this$options4 === void 0 ? void 0 : _this$options4.fields) {
      // 将fields拆分为 attributes 和 appends
      var _iterator = _createForOfIteratorHelper(this.options.fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const field = _step.value;

          if (this.isAssociationPath(field)) {
            // field is association field
            appends.push(field);
          } else {
            // field is model attribute, change attributes to array type
            if (!Array.isArray(attributes)) attributes = [];
            attributes.push(field);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if ((_this$options5 = this.options) === null || _this$options5 === void 0 ? void 0 : _this$options5.except) {
      var _iterator2 = _createForOfIteratorHelper(this.options.except),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const exceptKey = _step2.value;

          if (this.isAssociationPath(exceptKey)) {
            // except association field
            except.push(exceptKey);
          } else {
            // if attributes is array form, ignore except
            if (Array.isArray(attributes)) continue;
            attributes.exclude.push(exceptKey);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return _objectSpread({
      attributes
    }, this.parseExcept(except, this.parseAppends(appends, filterParams)));
  }

  parseExcept(except, filterParams) {
    if (!except) return filterParams;

    const setExcept = (queryParams, except) => {
      // split exceptKey to path form
      // posts.comments.content => ['posts', 'comments', 'content']
      // then set except on include attributes
      const exceptPath = except.split('.');
      const association = exceptPath[0];
      const lastLevel = exceptPath.length <= 2;
      let existIncludeIndex = queryParams['include'].findIndex(include => include['association'] == association);

      if (existIncludeIndex == -1) {
        // if include not exists, ignore this except
        return;
      }

      if (lastLevel) {
        // if it not have exclude form
        if (Array.isArray(queryParams['include'][existIncludeIndex]['attributes'])) {
          return;
        } else {
          if (!queryParams['include'][existIncludeIndex]['attributes']['exclude']) {
            queryParams['include'][existIncludeIndex]['attributes']['exclude'] = [];
          }

          queryParams['include'][existIncludeIndex]['attributes']['exclude'].push(exceptPath[1]);
        }
      } else {
        setExcept(queryParams['include'][existIncludeIndex], exceptPath.filter((_, index) => index !== 0).join('.'));
      }
    };

    var _iterator3 = _createForOfIteratorHelper(except),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        const exceptKey = _step3.value;
        setExcept(filterParams, exceptKey);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return filterParams;
  }

  parseAppends(appends, filterParams) {
    if (!appends) return filterParams;
    /**
     * set include params
     * @param includeRoot
     * @param appends
     */

    const setInclude = (model, queryParams, append) => {
      const appendFields = append.split('.');
      const appendAssociation = appendFields[0];
      const associations = model.associations; // if append length less or equal 2
      // example:
      //  appends: ['posts']
      //  appends: ['posts.title']
      //  All of these can be seen as last level

      let lastLevel = false;

      if (appendFields.length == 1) {
        lastLevel = true;
      }

      if (appendFields.length == 2) {
        const associationModel = associations[appendFields[0]].target;

        if (associationModel.rawAttributes[appendFields[1]]) {
          lastLevel = true;
        }
      } // find association index


      if (queryParams['include'] == undefined) {
        queryParams['include'] = [];
      }

      let existIncludeIndex = queryParams['include'].findIndex(include => include['association'] == appendAssociation); // if association not exist, create it

      if (existIncludeIndex == -1) {
        // association not exists
        queryParams['include'].push({
          association: appendAssociation
        });
        existIncludeIndex = queryParams['include'].length - 1;
      } // end appends
      // without nests association


      if (lastLevel) {
        // get exist association attributes
        let attributes = queryParams['include'][existIncludeIndex]['attributes'] || {
          include: [] // all fields are output by default

        }; // if need set attribute

        if (appendFields.length == 2) {
          if (!Array.isArray(attributes)) {
            attributes = [];
          }

          const attributeName = appendFields[1]; // push field to it

          attributes.push(attributeName);
        } else {
          // if attributes is empty array, change it to object
          if (Array.isArray(attributes) && attributes.length == 0) {
            attributes = {
              include: []
            };
          }
        } // set new attributes


        queryParams['include'][existIncludeIndex] = _objectSpread(_objectSpread({}, queryParams['include'][existIncludeIndex]), {}, {
          attributes
        });
      } else {
        setInclude(model.associations[queryParams['include'][existIncludeIndex].association].target, queryParams['include'][existIncludeIndex], appendFields.filter((_, index) => index !== 0).join('.'));
      }
    }; // handle every appends


    var _iterator4 = _createForOfIteratorHelper(appends),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        const append = _step4.value;
        setInclude(this.model, filterParams, append);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    debug('filter params: %o', filterParams);
    return filterParams;
  }

}

exports.OptionsParser = OptionsParser;