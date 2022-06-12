"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncEmitter = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AsyncEmitter {
  emitAsync(event, ...args) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // @ts-ignore
      const events = _this._events;
      let callbacks = events[event];

      if (!callbacks) {
        return false;
      } // helper function to reuse as much code as possible


      const run = cb => {
        switch (args.length) {
          // fast cases
          case 0:
            cb = cb.call(_this);
            break;

          case 1:
            cb = cb.call(_this, args[0]);
            break;

          case 2:
            cb = cb.call(_this, args[0], args[1]);
            break;

          case 3:
            cb = cb.call(_this, args[0], args[1], args[2]);
            break;
          // slower

          default:
            cb = cb.apply(_this, args);
        }

        if (cb && (cb instanceof Promise || typeof cb.then === 'function')) {
          return cb;
        }

        return Promise.resolve(true);
      };

      if (typeof callbacks === 'function') {
        yield run(callbacks);
      } else if (typeof callbacks === 'object') {
        callbacks = callbacks.slice().filter(Boolean);
        yield callbacks.reduce((prev, next) => {
          return prev.then(res => {
            return run(next).then(result => Promise.resolve(res.concat(result)));
          });
        }, Promise.resolve([]));
      }

      return true;
    })();
  }

}

exports.AsyncEmitter = AsyncEmitter;