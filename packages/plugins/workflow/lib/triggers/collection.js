"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

const MODE_BITMAP = {
  CREATE: 1,
  UPDATE: 2,
  DESTROY: 4
};
const MODE_BITMAP_EVENTS = new Map();
MODE_BITMAP_EVENTS.set(MODE_BITMAP.CREATE, 'afterCreateWithAssociations');
MODE_BITMAP_EVENTS.set(MODE_BITMAP.UPDATE, 'afterUpdateWithAssociations');
MODE_BITMAP_EVENTS.set(MODE_BITMAP.DESTROY, 'afterDestroy');

function getHookId(workflow, type) {
  return `${type}#${workflow.id}`;
} // async function, should return promise


function handler(data, options) {
  const _this$config = this.config,
        condition = _this$config.condition,
        changed = _this$config.changed; // NOTE: if no configured fields changed, do not trigger

  if (changed && changed.length && changed.every(name => !data.changed(name))) {
    return;
  } // NOTE: if no configured condition match, do not trigger


  if (condition && condition.$and.length) {// TODO: check all conditions in condition against data
    // const calculation = toCalculation(condition);
  }

  return this.trigger({
    data: data.get()
  }, options);
}

class CollectionTrigger {
  constructor({
    app
  }) {
    this.db = void 0;
    this.events = new Map();
    this.db = app.db;
  }

  on(workflow) {
    // NOTE: remove previous listener if config updated
    const prev = workflow.previous();

    if (prev.config) {
      this.off(_objectSpread(_objectSpread({}, workflow.get()), prev));
    }

    const _workflow$config = workflow.config,
          collection = _workflow$config.collection,
          mode = _workflow$config.mode;
    const Collection = this.db.getCollection(collection);

    if (!Collection) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(MODE_BITMAP_EVENTS.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        let _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            type = _step$value[1];

        const event = `${collection}.${type}`;
        const name = getHookId(workflow, event);

        if (mode & key) {
          if (!this.events.has(name)) {
            const listener = handler.bind(workflow);
            this.events.set(name, listener);
            this.db.on(event, listener);
          }
        } else {
          const listener = this.events.get(name);

          if (listener) {
            this.db.off(event, listener);
            this.events.delete(name);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  off(workflow) {
    const _workflow$config2 = workflow.config,
          collection = _workflow$config2.collection,
          mode = _workflow$config2.mode;
    const Collection = this.db.getCollection(collection);

    if (!Collection) {
      return;
    }

    var _iterator2 = _createForOfIteratorHelper(MODE_BITMAP_EVENTS.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        let _step2$value = _slicedToArray(_step2.value, 2),
            key = _step2$value[0],
            type = _step2$value[1];

        const event = `${collection}.${type}`;
        const name = getHookId(workflow, event);

        if (mode & key) {
          const listener = this.events.get(name);

          if (listener) {
            this.db.off(event, listener);
            this.events.delete(name);
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

}

exports.default = CollectionTrigger;