"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasOneRepository = void 0;

var _singleRelationRepository = require("./single-relation-repository");

class HasOneRepository extends _singleRelationRepository.SingleRelationRepository {}

exports.HasOneRepository = HasOneRepository;