import { useRef, useEffect } from 'react';
export var useAttach = function useAttach(target) {
  var oldTargetRef = useRef(null);
  useEffect(function () {
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