"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAttach = void 0;

var _react = require("react");

var useAttach = function useAttach(target) {
  var oldTargetRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (oldTargetRef.current && target !== oldTargetRef.current) {
      oldTargetRef.current.onUnmount();
    }

    oldTargetRef.current = target;
    target.onMount();
    return function () {
      target.onUnmount();
    };
  }, [target]);
  return target;
};

exports.useAttach = useAttach;