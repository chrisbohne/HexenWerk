import React, { FC } from 'react';
import { IIconsProps } from '../../components/Icon/Icon';

export const CloseIcon: FC<IIconsProps> = ({ className, onClick }) => {
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      stroke="currentColor"
      className={className ? className : ''}
      viewBox="0 0 16 16"
      onClick={onClick}
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  );
};
