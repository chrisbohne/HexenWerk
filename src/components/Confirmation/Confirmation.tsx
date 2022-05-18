import { Button } from '../Button/Button';

interface ConfirmationProps {
  onConfirmation: () => void;
  onCancel: () => void;
  message: string;
}

export const Confirmation = ({
  onConfirmation,
  onCancel,
  message,
}: ConfirmationProps) => {
  return (
    <div>
      <p>{message}</p>
      <Button onClick={onConfirmation} type="primary">
        Confirm
      </Button>
      <Button onClick={onCancel} type="primary">
        Cancel
      </Button>
    </div>
  );
};
