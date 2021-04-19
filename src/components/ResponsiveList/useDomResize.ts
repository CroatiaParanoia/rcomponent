import React, { useCallback, useEffect, useMemo, useState } from "react";

function debounce(fn: Function, time = 300) {
  let timer: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn(...args);
    }, time);
  };
}

export interface useDomResizeParams {
  container: React.MutableRefObject<HTMLDivElement>;
  throttleTime?: number;
}

type DomContentRect = Omit<DOMRectReadOnly, "toJSON">;

const useDomResize = ({
  container,
  throttleTime = 2000,
}: useDomResizeParams) => {
  const [domContentRect, setDomContentRect] = useState<DomContentRect>({
    bottom: 22,
    height: 22,
    left: 0,
    right: 765,
    top: 0,
    width: 765,
    x: 0,
    y: 0,
  });

  const handleResize = useMemo(() => {
    return (params: DomContentRect) => {
      setDomContentRect(params);
    };
  }, []);
  // const handleResize = useMemo(() => {
  //   return debounce((params: DomContentRect) => {
  //     setDomContentRect(params);
  //   }, throttleTime);
  // }, [throttleTime]);

  useEffect(() => {
    if (!container.current) return;

    const observe = new ResizeObserver(function ([{ contentRect }]) {
      const { bottom, height, left, right, top, width, x, y } = contentRect;
      handleResize({ bottom, height, left, right, top, width, x, y });
    });

    observe.observe(container.current);

    return () => observe.disconnect();
  }, [container, handleResize]);

  return domContentRect;
};

export default useDomResize;
