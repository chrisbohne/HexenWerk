import { FC } from 'react';
import './Icon.scss';
import {
  CloseIcon,
  EraserIcon,
  HamburgerIcon,
  PuzzleIcon,
  SettingsIcon,
  SliderIcon,
} from '../../assets/icons';

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
    case 'slider':
      return <SliderIcon {...props} />;
    case 'settings':
      return <SettingsIcon {...props} />;
    case 'puzzle':
      return <PuzzleIcon {...props} />;
    case 'eraser':
      return <EraserIcon {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
