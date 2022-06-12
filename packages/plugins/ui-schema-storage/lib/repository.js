"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UiSchemaRepository = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const nodeKeys = ['properties', 'definitions', 'patternProperties', 'additionalProperties', 'items'];

function transaction(transactionAbleArgPosition) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = /*#__PURE__*/_asyncToGenerator(function* (...args) {
      if (!_lodash().default.isNumber(transactionAbleArgPosition)) {
        transactionAbleArgPosition = originalMethod.length - 1;
      }

      let transaction = _lodash().default.get(args, [transactionAbleArgPosition, 'transaction']);

      let handleTransaction = false;

      if (!transaction) {
        transaction = yield this.database.sequelize.transaction();
        handleTransaction = true;

        _lodash().default.set(args, transactionAbleArgPosition, _objectSpread(_objectSpread({}, _lodash().default.get(args, transactionAbleArgPosition, {})), {}, {
          transaction
        }));
      }

      if (handleTransaction) {
        try {
          const results = yield originalMethod.apply(this, args);
          yield transaction.commit();
          return results;
        } catch (e) {
          yield transaction.rollback();
          throw e;
        }
      } else {
        return yield originalMethod.apply(this, args);
      }
    });
    return descriptor;
  };
}

class UiSchemaRepository extends _database().Repository {
  tableNameAdapter(tableName) {
    if (this.database.sequelize.getDialect() === 'postgres') {
      return `"${tableName}"`;
    }

    return tableName;
  }

  get uiSchemasTableName() {
    return this.tableNameAdapter(this.model.tableName);
  }

  get uiSchemaTreePathTableName() {
    const model = this.database.getCollection('uiSchemaTreePath').model;
    return this.tableNameAdapter(model.tableName);
  }

  sqlAdapter(sql) {
    if (this.database.sequelize.getDialect() === 'mysql') {
      return _lodash().default.replace(sql, /"/g, '`');
    }

    return sql;
  }

  static schemaToSingleNodes(schema, carry = [], childOptions = null) {
    const node = _lodash().default.cloneDeep(_lodash().default.isString(schema) ? {
      'x-uid': schema
    } : schema);

    if (!_lodash().default.get(node, 'name')) {
      node.name = (0, _utils().uid)();
    }

    if (!_lodash().default.get(node, 'x-uid')) {
      node['x-uid'] = (0, _utils().uid)();
    }

    if (childOptions) {
      node.childOptions = childOptions;
    }

    carry.push(node);

    var _iterator = _createForOfIteratorHelper(nodeKeys),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const nodeKey = _step.value;

        const nodeProperty = _lodash().default.get(node, nodeKey);

        const childNodeChildOptions = {
          parentUid: node['x-uid'],
          parentPath: [node['x-uid'], ..._lodash().default.get(childOptions, 'parentPath', [])],
          type: nodeKey
        }; // array items

        if (nodeKey === 'items' && nodeProperty) {
          const handleItems = _lodash().default.isArray(nodeProperty) ? nodeProperty : [nodeProperty];

          var _iterator2 = _createForOfIteratorHelper(handleItems.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              const _step2$value = _slicedToArray(_step2.value, 2),
                    i = _step2$value[0],
                    item = _step2$value[1];

              carry = this.schemaToSingleNodes(item, carry, _objectSpread(_objectSpread({}, childNodeChildOptions), {}, {
                sort: i + 1
              }));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else if (_lodash().default.isPlainObject(nodeProperty)) {
          const subNodeNames = _lodash().default.keys(_lodash().default.get(node, nodeKey));

          delete node[nodeKey];

          var _iterator3 = _createForOfIteratorHelper(subNodeNames.entries()),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              const _step3$value = _slicedToArray(_step3.value, 2),
                    i = _step3$value[0],
                    subNodeName = _step3$value[1];

              const subSchema = _objectSpread({
                name: subNodeName
              }, _lodash().default.get(nodeProperty, subNodeName));

              carry = this.schemaToSingleNodes(subSchema, carry, _objectSpread(_objectSpread({}, childNodeChildOptions), {}, {
                sort: i + 1
              }));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return carry;
  }

  getProperties(uid, options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const db = _this.database;
      const rawSql = `
        SELECT "SchemaTable"."x-uid" as "x-uid", "SchemaTable"."name" as "name", "SchemaTable"."schema" as "schema",
               TreePath.depth as depth,
               NodeInfo.type as type, NodeInfo.async as async,  ParentPath.ancestor as parent, ParentPath.sort as sort
        FROM ${_this.uiSchemaTreePathTableName} as TreePath
                 LEFT JOIN ${_this.uiSchemasTableName} as "SchemaTable" ON "SchemaTable"."x-uid" =  TreePath.descendant
                 LEFT JOIN ${_this.uiSchemaTreePathTableName} as NodeInfo ON NodeInfo.descendant = "SchemaTable"."x-uid" and NodeInfo.descendant = NodeInfo.ancestor and NodeInfo.depth = 0
                 LEFT JOIN ${_this.uiSchemaTreePathTableName} as ParentPath ON (ParentPath.descendant = "SchemaTable"."x-uid" AND ParentPath.depth = 1)
        WHERE TreePath.ancestor = :ancestor  AND (NodeInfo.async  = false or TreePath.depth = 1)`;
      const nodes = yield db.sequelize.query(_this.sqlAdapter(rawSql), {
        replacements: {
          ancestor: uid
        },
        transaction
      });

      if (nodes[0].length == 0) {
        return {};
      }

      const schema = _this.nodesToSchema(nodes[0], uid);

      return _lodash().default.pick(schema, ['type', 'properties']);
    })();
  }

  getJsonSchema(uid, options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const db = _this2.database;
      const treeTable = _this2.uiSchemaTreePathTableName;
      const rawSql = `
        SELECT "SchemaTable"."x-uid" as "x-uid", "SchemaTable"."name" as name, "SchemaTable"."schema" as "schema" ,
               TreePath.depth as depth,
               NodeInfo.type as type, NodeInfo.async as async,  ParentPath.ancestor as parent, ParentPath.sort as sort
        FROM ${treeTable} as TreePath
                 LEFT JOIN ${_this2.uiSchemasTableName} as "SchemaTable" ON "SchemaTable"."x-uid" =  TreePath.descendant
                 LEFT JOIN ${treeTable} as NodeInfo ON NodeInfo.descendant = "SchemaTable"."x-uid" and NodeInfo.descendant = NodeInfo.ancestor and NodeInfo.depth = 0
                 LEFT JOIN ${treeTable} as ParentPath ON (ParentPath.descendant = "SchemaTable"."x-uid" AND ParentPath.depth = 1)
        WHERE TreePath.ancestor = :ancestor  ${(options === null || options === void 0 ? void 0 : options.includeAsyncNode) ? '' : 'AND (NodeInfo.async != true )'}
    `;
      const nodes = yield db.sequelize.query(_this2.sqlAdapter(rawSql), {
        replacements: {
          ancestor: uid
        },
        transaction: options === null || options === void 0 ? void 0 : options.transaction
      });

      if (nodes[0].length == 0) {
        return {};
      }

      const schema = _this2.nodesToSchema(nodes[0], uid);

      return schema;
    })();
  }

  ignoreSchemaProperties(schemaProperties) {
    return _lodash().default.omit(schemaProperties, nodeKeys);
  }

  nodesToSchema(nodes, rootUid) {
    const nodeAttributeSanitize = node => {
      const schema = _objectSpread(_objectSpread(_objectSpread({}, this.ignoreSchemaProperties(_lodash().default.isPlainObject(node.schema) ? node.schema : JSON.parse(node.schema))), _lodash().default.pick(node, [...nodeKeys, 'name'])), {}, {
        ['x-uid']: node['x-uid'],
        ['x-async']: !!node.async
      });

      if (_lodash().default.isNumber(node.sort)) {
        schema['x-index'] = node.sort;
      }

      return schema;
    };

    const buildTree = rootNode => {
      const children = nodes.filter(node => node.parent == rootNode['x-uid']);

      if (children.length > 0) {
        const childrenGroupByType = _lodash().default.groupBy(children, 'type');

        for (var _i2 = 0, _Object$keys = Object.keys(childrenGroupByType); _i2 < _Object$keys.length; _i2++) {
          const childType = _Object$keys[_i2];
          const properties = childrenGroupByType[childType].map(child => buildTree(child)).sort((a, b) => a['x-index'] - b['x-index']);
          rootNode[childType] = childType == 'items' ? properties.length == 1 ? properties[0] : properties : properties.reduce((carry, item) => {
            carry[item.name] = item;
            delete item['name'];
            return carry;
          }, {});
        }
      }

      return nodeAttributeSanitize(rootNode);
    };

    return buildTree(nodes.find(node => node['x-uid'] == rootUid));
  }

  clearAncestor(uid, options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const db = _this3.database;
      const treeTable = _this3.uiSchemaTreePathTableName;
      yield db.sequelize.query(`DELETE
       FROM ${treeTable}
       WHERE descendant IN
             (SELECT descendant FROM (SELECT descendant FROM ${treeTable} WHERE ancestor = :uid) as descendantTable)
         AND ancestor IN (SELECT ancestor
                          FROM (SELECT ancestor FROM ${treeTable} WHERE descendant = :uid AND ancestor != descendant) as ancestorTable)
      `, {
        type: 'DELETE',
        replacements: {
          uid
        },
        transaction: options.transaction
      });
    })();
  }

  patch(newSchema, options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const rootUid = newSchema['x-uid'];
      const oldTree = yield _this4.getJsonSchema(rootUid);

      const traverSchemaTree = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (schema, path = []) {
          const node = schema;
          const oldNode = path.length == 0 ? oldTree : _lodash().default.get(oldTree, path);
          const oldNodeUid = oldNode['x-uid'];
          yield _this4.updateNode(oldNodeUid, node, transaction);
          const properties = node.properties;

          if (_lodash().default.isPlainObject(properties)) {
            for (var _i3 = 0, _Object$keys2 = Object.keys(properties); _i3 < _Object$keys2.length; _i3++) {
              const name = _Object$keys2[_i3];
              yield traverSchemaTree(properties[name], [...path, 'properties', name]);
            }
          }
        });

        return function traverSchemaTree(_x) {
          return _ref2.apply(this, arguments);
        };
      }();

      yield traverSchemaTree(newSchema);
    })();
  }

  updateNode(uid, schema, transaction) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const nodeModel = yield _this5.findOne({
        filter: {
          'x-uid': uid
        }
      });
      yield nodeModel.update({
        schema: _objectSpread(_objectSpread({}, nodeModel.get('schema')), _lodash().default.omit(schema, ['x-async', 'name', 'x-uid', 'properties']))
      }, {
        hooks: false,
        transaction
      });
    })();
  }

  childrenCount(uid, transaction) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const db = _this6.database;
      const countResult = yield db.sequelize.query(`SELECT COUNT(*) as count FROM ${_this6.uiSchemaTreePathTableName} where ancestor = :ancestor and depth  = 1`, {
        replacements: {
          ancestor: uid
        },
        type: 'SELECT',
        transaction
      });
      return parseInt(countResult[0]['count']);
    })();
  }

  isLeafNode(uid, transaction) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const childrenCount = yield _this7.childrenCount(uid, transaction);
      return childrenCount === 0;
    })();
  }

  findParentUid(uid, transaction) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const parent = yield _this8.database.getRepository('uiSchemaTreePath').findOne({
        filter: {
          descendant: uid,
          depth: 1
        },
        transaction
      });
      return parent ? parent.get('ancestor') : null;
    })();
  }

  findNodeSchemaWithParent(uid, transaction) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      const schema = yield _this9.database.getRepository('uiSchemas').findOne({
        filter: {
          'x-uid': uid
        },
        transaction
      });
      return {
        parentUid: yield _this9.findParentUid(uid, transaction),
        schema
      };
    })();
  }

  isSingleChild(uid, transaction) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      const db = _this10.database;
      const parent = yield _this10.findParentUid(uid, transaction);

      if (!parent) {
        return null;
      }

      const parentChildrenCount = yield _this10.childrenCount(parent, transaction);

      if (parentChildrenCount == 1) {
        const schema = yield db.getRepository('uiSchemas').findOne({
          filter: {
            'x-uid': parent
          },
          transaction
        });
        return schema;
      }

      return null;
    })();
  }

  removeEmptyParents(options) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction,
            uid = options.uid,
            breakRemoveOn = options.breakRemoveOn;

      const removeParent = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* (nodeUid) {
          const parent = yield _this11.isSingleChild(nodeUid, transaction);

          if (parent && !_this11.breakOnMatched(parent, breakRemoveOn)) {
            yield removeParent(parent.get('x-uid'));
          } else {
            yield _this11.remove(nodeUid, {
              transaction
            });
          }
        });

        return function removeParent(_x2) {
          return _ref3.apply(this, arguments);
        };
      }();

      yield removeParent(uid);
    })();
  }

  breakOnMatched(schemaInstance, breakRemoveOn) {
    if (!breakRemoveOn) {
      return false;
    }

    for (var _i4 = 0, _Object$keys3 = Object.keys(breakRemoveOn); _i4 < _Object$keys3.length; _i4++) {
      const key = _Object$keys3[_i4];
      const instanceValue = schemaInstance.get(key);
      const breakRemoveOnValue = breakRemoveOn[key];

      if (instanceValue !== breakRemoveOnValue) {
        return false;
      }
    }

    return true;
  }

  recursivelyRemoveIfNoChildren(options) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      const uid = options.uid,
            transaction = options.transaction,
            breakRemoveOn = options.breakRemoveOn;

      const removeLeafNode = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (nodeUid) {
          const isLeafNode = yield _this12.isLeafNode(nodeUid, transaction);

          if (isLeafNode) {
            const _yield$_this12$findNo = yield _this12.findNodeSchemaWithParent(nodeUid, transaction),
                  parentUid = _yield$_this12$findNo.parentUid,
                  schema = _yield$_this12$findNo.schema;

            if (_this12.breakOnMatched(schema, breakRemoveOn)) {
              // break at here
              return;
            } else {
              // remove current node
              yield _this12.remove(nodeUid, {
                transaction
              }); // continue remove

              yield removeLeafNode(parentUid);
            }
          }
        });

        return function removeLeafNode(_x3) {
          return _ref4.apply(this, arguments);
        };
      }();

      yield removeLeafNode(uid);
    })();
  }

  remove(uid, options) {
    var _this13 = this;

    return _asyncToGenerator(function* () {
      let transaction = options.transaction;

      if (options === null || options === void 0 ? void 0 : options.removeParentsIfNoChildren) {
        yield _this13.removeEmptyParents({
          transaction,
          uid,
          breakRemoveOn: options.breakRemoveOn
        });
        return;
      }

      yield _this13.database.sequelize.query(_this13.sqlAdapter(`DELETE FROM ${_this13.uiSchemasTableName} WHERE "x-uid" IN (
            SELECT descendant FROM ${_this13.uiSchemaTreePathTableName} WHERE ancestor = :uid
        )`), {
        replacements: {
          uid
        },
        transaction
      });
      yield _this13.database.sequelize.query(` DELETE FROM ${_this13.uiSchemaTreePathTableName}
            WHERE descendant IN (
                select descendant FROM
                    (SELECT descendant
                     FROM ${_this13.uiSchemaTreePathTableName}
                     WHERE ancestor = :uid)as descendantTable) `, {
        replacements: {
          uid
        },
        transaction
      });
    })();
  }

  insertBeside(targetUid, schema, side, options) {
    var _this14 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const targetParent = yield _this14.findParentUid(targetUid, transaction);
      const db = _this14.database;
      const treeTable = _this14.uiSchemaTreePathTableName;
      const typeQuery = yield db.sequelize.query(`SELECT type from ${treeTable} WHERE ancestor = :uid AND depth = 0;`, {
        type: 'SELECT',
        replacements: {
          uid: targetUid
        },
        transaction
      });
      const nodes = UiSchemaRepository.schemaToSingleNodes(schema);
      const rootNode = nodes[0];
      rootNode.childOptions = {
        parentUid: targetParent,
        type: typeQuery[0]['type'],
        position: {
          type: side,
          target: targetUid
        }
      };
      const insertedNodes = yield _this14.insertNodes(nodes, options);
      return yield _this14.getJsonSchema(insertedNodes[0].get('x-uid'), {
        transaction
      });
    })();
  }

  insertInner(targetUid, schema, position, options) {
    var _this15 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const nodes = UiSchemaRepository.schemaToSingleNodes(schema);
      const rootNode = nodes[0];
      rootNode.childOptions = {
        parentUid: targetUid,
        type: _lodash().default.get(schema, 'x-node-type', 'properties'),
        position
      };
      const insertedNodes = yield _this15.insertNodes(nodes, options);
      return yield _this15.getJsonSchema(insertedNodes[0].get('x-uid'), {
        transaction
      });
    })();
  }

  schemaExists(schema, options) {
    var _this16 = this;

    return _asyncToGenerator(function* () {
      if (_lodash().default.isObject(schema) && !schema['x-uid']) {
        return false;
      }

      const transaction = options.transaction;
      const result = yield _this16.database.sequelize.query(_this16.sqlAdapter(`select "x-uid" from ${_this16.uiSchemasTableName} where "x-uid" = :uid`), {
        type: 'SELECT',
        replacements: {
          uid: _lodash().default.isString(schema) ? schema : schema['x-uid']
        },
        transaction
      });
      return result.length > 0;
    })();
  }

  insertAdjacent(position, target, schema, options) {
    var _this17 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;

      if (options.wrap) {
        // insert wrap schema using insertNewSchema
        const wrapSchemaNodes = yield _this17.insertNewSchema(options.wrap, {
          transaction,
          returnNode: true
        });
        const lastWrapNode = wrapSchemaNodes[wrapSchemaNodes.length - 1]; // insert schema into wrap schema

        yield _this17.insertAdjacent('afterBegin', lastWrapNode['x-uid'], schema, _lodash().default.omit(options, 'wrap'));
        schema = wrapSchemaNodes[0]['x-uid'];
        options.removeParentsIfNoChildren = false;
      } else {
        const schemaExists = yield _this17.schemaExists(schema, {
          transaction
        });

        if (schemaExists) {
          schema = _lodash().default.isString(schema) ? schema : schema['x-uid'];
        } else {
          const insertedSchema = yield _this17.insertNewSchema(schema, {
            transaction,
            returnNode: true
          });
          schema = insertedSchema[0]['x-uid'];
        }
      }

      return yield _this17[`insert${_lodash().default.upperFirst(position)}`](target, schema, options);
    })();
  }

  insertAfterBegin(targetUid, schema, options) {
    var _this18 = this;

    return _asyncToGenerator(function* () {
      return yield _this18.insertInner(targetUid, schema, 'first', options);
    })();
  }

  insertBeforeEnd(targetUid, schema, options) {
    var _this19 = this;

    return _asyncToGenerator(function* () {
      return yield _this19.insertInner(targetUid, schema, 'last', options);
    })();
  }

  insertBeforeBegin(targetUid, schema, options) {
    var _this20 = this;

    return _asyncToGenerator(function* () {
      return yield _this20.insertBeside(targetUid, schema, 'before', options);
    })();
  }

  insertAfterEnd(targetUid, schema, options) {
    var _this21 = this;

    return _asyncToGenerator(function* () {
      return yield _this21.insertBeside(targetUid, schema, 'after', options);
    })();
  }

  insertNodes(nodes, options) {
    var _this22 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const insertedNodes = [];

      var _iterator4 = _createForOfIteratorHelper(nodes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          const node = _step4.value;
          insertedNodes.push(yield _this22.insertSingleNode(node, _objectSpread(_objectSpread({}, options), {}, {
            transaction
          })));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return insertedNodes;
    })();
  }

  insert(schema, options) {
    var _this23 = this;

    return _asyncToGenerator(function* () {
      const nodes = UiSchemaRepository.schemaToSingleNodes(schema);
      const insertedNodes = yield _this23.insertNodes(nodes, options);
      return _this23.getJsonSchema(insertedNodes[0].get('x-uid'), {
        transaction: options === null || options === void 0 ? void 0 : options.transaction
      });
    })();
  }

  insertNewSchema(schema, options) {
    var _this24 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const nodes = UiSchemaRepository.schemaToSingleNodes(schema); // insert schema fist

      yield _this24.database.sequelize.query(_this24.sqlAdapter(`INSERT INTO ${_this24.uiSchemasTableName} ("x-uid", "name", "schema") VALUES ${nodes.map(n => '(?)').join(',')};`), {
        replacements: _lodash().default.cloneDeep(nodes).map(node => {
          const _this24$prepareSingle = _this24.prepareSingleNodeForInsert(node),
                uid = _this24$prepareSingle.uid,
                name = _this24$prepareSingle.name;

          return [uid, name, JSON.stringify(node)];
        }),
        type: 'insert',
        transaction
      });

      const treePathData = _lodash().default.cloneDeep(nodes).reduce((carry, item) => {
        const _this24$prepareSingle2 = _this24.prepareSingleNodeForInsert(item),
              uid = _this24$prepareSingle2.uid,
              childOptions = _this24$prepareSingle2.childOptions,
              async = _this24$prepareSingle2.async;

        return [...carry, // self reference
        [uid, uid, 0, (childOptions === null || childOptions === void 0 ? void 0 : childOptions.type) || null, async, null], // parent references
        ..._lodash().default.get(childOptions, 'parentPath', []).map((parentUid, index) => {
          return [parentUid, uid, index + 1, null, null, childOptions.sort];
        })];
      }, []); // insert tree path


      yield _this24.database.sequelize.query(_this24.sqlAdapter(`INSERT INTO ${_this24.uiSchemaTreePathTableName} (ancestor, descendant, depth, type, async, sort) VALUES ${treePathData.map(item => '(?)').join(',')}`), {
        replacements: treePathData,
        type: 'insert',
        transaction
      });
      const rootNode = nodes[0];

      if (rootNode['x-server-hooks']) {
        const rootModel = yield _this24.findOne({
          filter: {
            'x-uid': rootNode['x-uid']
          },
          transaction
        });
        yield _this24.database.emitAsync(`${_this24.collection.name}.afterCreateWithAssociations`, rootModel, options);
      }

      if (options === null || options === void 0 ? void 0 : options.returnNode) {
        return nodes;
      }

      return _this24.getJsonSchema(nodes[0]['x-uid'], {
        transaction
      });
    })();
  }

  insertSchemaRecord(name, uid, schema, transaction) {
    var _this25 = this;

    return _asyncToGenerator(function* () {
      const serverHooks = schema['x-server-hooks'] || [];
      const node = yield _this25.create({
        values: {
          name,
          ['x-uid']: uid,
          schema,
          serverHooks
        },
        transaction,
        context: {
          disableInsertHook: true
        }
      });
      return node;
    })();
  }

  prepareSingleNodeForInsert(schema) {
    const uid = schema['x-uid'];
    const name = schema['name'];

    const async = _lodash().default.get(schema, 'x-async', false);

    const childOptions = schema['childOptions'];
    delete schema['x-uid'];
    delete schema['x-async'];
    delete schema['name'];
    delete schema['childOptions'];
    return {
      uid,
      name,
      async,
      childOptions
    };
  }

  insertSingleNode(schema, options) {
    var _this26 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const db = _this26.database;

      const _this26$prepareSingle = _this26.prepareSingleNodeForInsert(schema),
            uid = _this26$prepareSingle.uid,
            name = _this26$prepareSingle.name,
            async = _this26$prepareSingle.async,
            childOptions = _this26$prepareSingle.childOptions;

      let savedNode; // check node exists or not

      const existsNode = yield _this26.findOne({
        filter: {
          'x-uid': uid
        },
        transaction
      });
      const treeTable = _this26.uiSchemaTreePathTableName;

      if (existsNode) {
        savedNode = existsNode;
      } else {
        savedNode = yield _this26.insertSchemaRecord(name, uid, schema, transaction);
      }

      if (childOptions) {
        const oldParentUid = yield _this26.findParentUid(uid, transaction);
        const parentUid = childOptions.parentUid;
        const childrenCount = yield _this26.childrenCount(uid, transaction);
        const isTree = childrenCount > 0; // if node is a tree root move tree to new path

        if (isTree) {
          yield _this26.clearAncestor(uid, {
            transaction
          }); // insert new tree path

          yield db.sequelize.query(`INSERT INTO ${treeTable} (ancestor, descendant, depth)
           SELECT supertree.ancestor, subtree.descendant, supertree.depth + subtree.depth + 1
           FROM ${treeTable} AS supertree
                    CROSS JOIN ${treeTable} AS subtree
           WHERE supertree.descendant = :parentUid
             AND subtree.ancestor = :uid;`, {
            type: 'INSERT',
            replacements: {
              uid,
              parentUid
            },
            transaction
          });
        } // update type


        yield db.sequelize.query(`UPDATE ${treeTable} SET type = :type WHERE depth = 0 AND ancestor = :uid AND descendant = :uid`, {
          type: 'update',
          transaction,
          replacements: {
            type: childOptions.type,
            uid
          }
        });

        if (!isTree) {
          if (existsNode) {
            // remove old path
            yield db.sequelize.query(`DELETE FROM ${treeTable} WHERE descendant = :uid AND ancestor != descendant`, {
              type: 'DELETE',
              replacements: {
                uid
              },
              transaction
            });
          } // insert tree path


          yield db.sequelize.query(`INSERT INTO ${treeTable} (ancestor, descendant, depth)
           SELECT t.ancestor, :modelKey, depth + 1 FROM ${treeTable} AS t  WHERE t.descendant = :modelParentKey `, {
            type: 'INSERT',
            transaction,
            replacements: {
              modelKey: savedNode.get('x-uid'),
              modelParentKey: parentUid
            }
          });
        }

        if (!existsNode) {
          // insert type && async
          yield db.sequelize.query(`INSERT INTO ${treeTable}(ancestor, descendant, depth, type, async) VALUES (:modelKey, :modelKey, 0, :type, :async )`, {
            type: 'INSERT',
            replacements: {
              modelKey: savedNode.get('x-uid'),
              type: childOptions.type,
              async
            },
            transaction
          });
        }

        const nodePosition = childOptions.position || 'last';
        let sort; // insert at first

        if (nodePosition === 'first') {
          sort = 1;
          let updateSql = `UPDATE ${treeTable} as TreeTable
                SET sort = TreeTable.sort + 1
                FROM ${treeTable} as NodeInfo
                WHERE NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0
                AND TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`; // Compatible with mysql

          if (_this26.database.sequelize.getDialect() === 'mysql') {
            updateSql = `UPDATE ${treeTable} as TreeTable
          JOIN ${treeTable} as NodeInfo ON (NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0)
          SET TreeTable.sort = TreeTable.sort + 1
          WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`;
          } // move all child last index


          yield db.sequelize.query(updateSql, {
            replacements: {
              ancestor: childOptions.parentUid,
              type: childOptions.type
            },
            transaction
          });
        }

        if (nodePosition === 'last') {
          const maxSort = yield db.sequelize.query(`SELECT ${_this26.database.sequelize.getDialect() === 'postgres' ? 'coalesce' : 'ifnull'}(MAX(TreeTable.sort), 0) as maxsort FROM ${treeTable} as TreeTable
                                                        LEFT JOIN ${treeTable} as NodeInfo
                                                                  ON NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0
           WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`, {
            type: 'SELECT',
            replacements: {
              ancestor: childOptions.parentUid,
              type: childOptions.type
            },
            transaction
          });
          sort = parseInt(maxSort[0]['maxsort']) + 1;
        }

        if (_lodash().default.isPlainObject(nodePosition)) {
          const targetPosition = nodePosition;
          const target = targetPosition.target;
          const targetSort = yield db.sequelize.query(`SELECT TreeTable.sort  as sort FROM ${treeTable} as TreeTable
                                 LEFT JOIN ${treeTable} as NodeInfo
                                           ON NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0   WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor AND TreeTable.descendant = :descendant and NodeInfo.type = :type`, {
            type: 'SELECT',
            replacements: {
              ancestor: childOptions.parentUid,
              descendant: target,
              type: childOptions.type
            },
            transaction
          });
          sort = targetSort[0].sort;

          if (targetPosition.type == 'after') {
            sort += 1;
          }

          let updateSql = `UPDATE ${treeTable} as TreeTable
                         SET sort = TreeTable.sort + 1
                             FROM ${treeTable} as NodeInfo
                         WHERE NodeInfo.descendant = TreeTable.descendant
                           and NodeInfo.depth = 0
                           AND TreeTable.depth = 1
                           AND TreeTable.ancestor = :ancestor
                           and TreeTable.sort >= :sort
                           and NodeInfo.type = :type`;

          if (_this26.database.sequelize.getDialect() === 'mysql') {
            updateSql = `UPDATE  ${treeTable} as TreeTable
JOIN ${treeTable} as NodeInfo ON (NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0)
SET TreeTable.sort = TreeTable.sort + 1
WHERE TreeTable.depth = 1 AND  TreeTable.ancestor = :ancestor and TreeTable.sort >= :sort and NodeInfo.type = :type`;
          }

          yield db.sequelize.query(updateSql, {
            replacements: {
              ancestor: childOptions.parentUid,
              sort,
              type: childOptions.type
            },
            transaction
          });
        } // update order


        const updateSql = `UPDATE ${treeTable} SET sort = :sort WHERE depth = 1 AND ancestor = :ancestor AND descendant = :descendant`;
        yield db.sequelize.query(updateSql, {
          type: 'UPDATE',
          replacements: {
            ancestor: childOptions.parentUid,
            sort,
            descendant: uid
          },
          transaction
        }); // move node to new parent

        if (oldParentUid !== null && oldParentUid !== parentUid) {
          yield _this26.database.emitAsync('uiSchemaMove', savedNode, {
            transaction,
            oldParentUid,
            parentUid
          });

          if (options.removeParentsIfNoChildren) {
            yield _this26.recursivelyRemoveIfNoChildren({
              transaction,
              uid: oldParentUid,
              breakRemoveOn: options.breakRemoveOn
            });
          }
        }
      } else {
        // insert root node path
        yield db.sequelize.query(`INSERT INTO ${treeTable}(ancestor, descendant, depth, async) VALUES (:modelKey, :modelKey, 0, :async )`, {
          type: 'INSERT',
          replacements: {
            modelKey: savedNode.get('x-uid'),
            async
          },
          transaction
        });
      }

      return savedNode;
    })();
  }

}

exports.UiSchemaRepository = UiSchemaRepository;

__decorate([transaction()], UiSchemaRepository.prototype, "clearAncestor", null);

__decorate([transaction()], UiSchemaRepository.prototype, "patch", null);

__decorate([transaction()], UiSchemaRepository.prototype, "remove", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertBeside", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertInner", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertAdjacent", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertAfterBegin", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertBeforeEnd", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertBeforeBegin", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertAfterEnd", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertNodes", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insert", null);

__decorate([transaction()], UiSchemaRepository.prototype, "insertNewSchema", null);

var _default = UiSchemaRepository;
exports.default = _default;
