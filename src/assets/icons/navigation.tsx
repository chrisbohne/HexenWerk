import React, { FC } from 'react';
import { IIconsProps } from '../../components/Icon/Icon';

export const HamburgerIcon: FC<IIconsProps> = ({ color, size, className }) => {
  return (
    <svg
      data-testid="test-icon"
      width={size ? size : '16'}
      height={size ? size : '16'}
      fill={color ? color : 'black'}
      className={className ? className : ''}
      viewBox="0 0 16 16"
    >
      <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
    </svg>
  );
};
