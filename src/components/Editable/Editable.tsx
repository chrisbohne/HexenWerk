import { useEffect } from 'react';
import { EditableProps } from '../_interfaces';
import { Icon } from '../';

import styles from './Editable.module.scss';

export const Editable = ({
  originalText,
  showEditIcon,
  setInputValue,
  inputValue,
  inputIsActive,
  setInputIsActive,
  onConfirm,
  inputRef,
  children,
}: EditableProps) => {
  useEffect(() => {
    if (inputRef && inputRef.current && inputIsActive) inputRef.current.focus();
  }, [inputIsActive, inputRef]);

  const handleCancel = () => {
    setInputValue(originalText);

    setInputIsActive(false);
  };

  const handleAccept = () => {
    setInputIsActive(false);
    onConfirm();
  };

  return (
    <>
      {inputIsActive ? (
        <div className={styles.editable}>
          {children}
          {originalText !== inputValue && (
            <Icon
              className={styles.editable__confirmIcon}
              name="check"
              onClick={handleAccept}
            />
          )}
          <Icon
            className={styles.editable__cancelIcon}
            name="cancel"
            onClick={handleCancel}
          />
        </div>
      ) : (
        <div className={styles.editable}>
          <p>{originalText}</p>

          {showEditIcon && (
            <Icon
              className={styles.editable__pencil}
              name="pencil"
              onClick={() => {
                setInputIsActive(true);
                setInputValue(originalText);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
