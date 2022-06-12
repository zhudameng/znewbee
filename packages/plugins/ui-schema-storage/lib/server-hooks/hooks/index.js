"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hooks = void 0;

var _bindMenuToRole = require("./bind-menu-to-role");

var _factory = require("./factory");

var _removeParentsIfNoChildren = require("./remove-parents-if-no-children");

var _removeSchema = require("./remove-schema");

const hooks = [(0, _factory.hookFactory)('onCollectionDestroy', 'removeSchema', _removeSchema.removeSchema), (0, _factory.hookFactory)('onCollectionFieldDestroy', 'removeSchema', _removeSchema.removeSchema), (0, _factory.hookFactory)('onSelfCreate', 'bindMenuToRole', _bindMenuToRole.bindMenuToRole), (0, _factory.hookFactory)('onSelfMove', 'removeParentsIfNoChildren', _removeParentsIfNoChildren.removeParentsIfNoChildren)];
exports.hooks = hooks;