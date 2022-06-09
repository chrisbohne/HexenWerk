import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  type: ButtonTypes;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CloseButtonProps {
  onClose: () => void;
  className?: string;
}

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'menu'
  | 'info'
  | 'danger'
  | 'success'
  | 'cancel'
  | 'delete';
