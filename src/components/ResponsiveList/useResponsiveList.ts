import { useRef, useEffect } from "react";

import useDomResize from "./useDomResize";

const useResponsiveList = () => {
  const container = useRef<HTMLDivElement>(null!);
  const { width } = useDomResize({ container, throttleTime: 0 });
  useEffect(() => {
    const containerEl = container.current;
    if (!containerEl) return;
  }, []);

  return [container, width] as const;
};

export default useResponsiveList;
