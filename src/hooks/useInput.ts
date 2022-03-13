import { ChangeEvent } from 'react';
import { useLocalStorage } from '.';

type useInputHook<T> = [
  value: T,
  reset: () => void,
  attributeObj: { value: T; onChange: (e: ChangeEvent) => void }
];

export const useInput = (
  key: string,
  initValue: string
): useInputHook<string> => {
  const [value, setValue] = useLocalStorage(key, initValue || '');

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e: ChangeEvent) => {
      const element = e.target as HTMLInputElement;
      setValue(element.value);
    },
  };

  return [value, reset, attributeObj];
};
