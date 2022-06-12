"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BelongsToRepository = void 0;

var _singleRelationRepository = require("./single-relation-repository");

class BelongsToRepository extends _singleRelationRepository.SingleRelationRepository {}

exports.BelongsToRepository = BelongsToRepository;