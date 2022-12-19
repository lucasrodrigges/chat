import { useEffect, useRef } from 'react';

export const useDidUpdate = (func, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    console.log(mounted);
    if (!mounted.current) {
      mounted.current = true;
    } else func();
  }, deps);
};

export const v = 'v';
