import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initValue: string) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) || '') || initValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
