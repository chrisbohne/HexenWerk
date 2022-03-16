import { FC } from 'react';
import './Icon.scss';
import { CloseIcon, HamburgerIcon } from '../../assets/icons';

export interface IIconsProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

const Icon: FC<IIconsProps> = (props) => {
  switch (props.name.toLowerCase()) {
    case 'hamburger':
      return <HamburgerIcon {...props} />;
    case 'close':
      return <CloseIcon {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
