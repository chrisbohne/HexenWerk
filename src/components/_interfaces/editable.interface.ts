import { ReactNode, RefObject } from 'react';

export interface EditableProps {
  originalText: string;
  children: ReactNode;
  setInputValue: (text: string) => void;
  inputValue: string;
  showEditIcon: boolean;
  setInputIsActive: (value: boolean) => void;
  inputIsActive: boolean;
  onConfirm: () => void;
  inputRef: RefObject<HTMLInputElement>;
}
