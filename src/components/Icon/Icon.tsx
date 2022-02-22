import { FC } from 'react';
import { HamburgerIcon } from '../../assets/icons/navigation';

export interface IIconsProps {
  name: string;
  size?: string;
  color?: string;
  className?: string;
}

const Icon: FC<IIconsProps> = (props) => {
  switch (props.name.toLowerCase()) {
    case 'hamburger':
      return <HamburgerIcon {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
