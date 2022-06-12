"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSchemaDAO = void 0;

class UiSchemaDAO {
  constructor(schema) {
    this.nodeKeys = ['properties', 'patternProperties', 'additionalProperties'];
  }

}

exports.UiSchemaDAO = UiSchemaDAO;