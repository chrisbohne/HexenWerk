import { ButtonTypes } from './button.interface';

export interface ConfirmationProps {
  onConfirmation: () => void;
  onCancel: () => void;
  message: string;
  confirmButtonText: string;
  confirmationButtonType?: ButtonTypes;
}
