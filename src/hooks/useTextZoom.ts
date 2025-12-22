import { useEffect, useState } from "react";

export function useTextZoom({ step = 0.1, min = 0.7, max = 2 } = {}) {
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isZoomKey = e.key === "+" || e.key === "-" || e.key === "=";

      if (!isCmdOrCtrl || !isZoomKey || !active) return;

      e.preventDefault();

      setScale((prev) => {
        if (e.key === "-") return Math.max(min, prev - step);
        return Math.min(max, prev + step);
      });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, step, min, max]);

  return {
    scale,
    bind: {
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
      onFocus: () => setActive(true),
      onBlur: () => setActive(false),
      tabIndex: 0,
    },
  };
}
