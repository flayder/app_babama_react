import { useRef } from 'react';

export function useDebounce<T extends(...args: any[]) => any>(
  callback: T, delay = 500): (...args: Parameters<T>) => void {
  const timerIdRef = useRef<NodeJS.Timeout | number>(0);

  return (...args) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current as NodeJS.Timeout);
    }

    timerIdRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
