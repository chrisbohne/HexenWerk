import { useEffect, useState } from 'react';

const getLocalValue = (key: string, initValue: (() => string) | string) => {
  // Server Side Rendering
  if (typeof window === 'undefined') return initValue;

  // if value already stored
  const localValue = JSON.parse(localStorage.getItem(key) || '');
  if (localValue) return localValue;

  // return result of function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

getLocalValue('hello', 'test');

export const useLocalStorage = (key: string, initValue: string) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) || '') || initValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
