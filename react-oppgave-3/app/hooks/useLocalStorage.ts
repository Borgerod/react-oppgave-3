"use client";

import { useState, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T | ((current: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
    } catch {}
    return defaultValue;
  });

  const set = useCallback(
    (newValue: T | ((current: T) => T)) => {
      setValue((current) => {
        const next =
          typeof newValue === "function"
            ? (newValue as (c: T) => T)(current)
            : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key],
  );

  return [value, set];
}
