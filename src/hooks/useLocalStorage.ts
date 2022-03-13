import { useEffect, useState } from 'react';

const getLocalValue = (
  key: string,
  initValue: (() => string) | string | boolean
) => {
  // Server Side Rendering
  if (typeof window === 'undefined') return initValue;

  // if value already stored
  const item = localStorage.getItem(key);
  const localValue = item !== null ? JSON.parse(item) : '';
  // const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return result of function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

getLocalValue('hello', 'test');

export const useLocalStorage = (
  key: string,
  initValue: (() => string) | string | boolean
) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
