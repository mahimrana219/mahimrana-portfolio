import { useEffect, useRef } from "react";

// setTimeout queue for demo animations — all cleared on unmount
export const useTimers = () => {
  const ids = useRef<number[]>([]);

  useEffect(() => {
    const current = ids;
    return () => current.current.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    ids.current.push(window.setTimeout(fn, ms));
  };

  const clear = () => {
    ids.current.forEach(clearTimeout);
    ids.current = [];
  };

  return { later, clear };
};
