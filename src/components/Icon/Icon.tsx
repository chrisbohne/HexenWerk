import { FC } from 'react';
import './Icon.scss';
import {
  CloseIcon,
  CursorIcon,
  DotsIcon,
  EraserIcon,
  HamburgerIcon,
  HandIcon,
  PuzzleIcon,
  SettingsIcon,
  SliderIcon,
  DeleteIcon,
  RouteIcon,
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
    case 'cursor':
      return <CursorIcon {...props} />;
    case 'hand':
      return <HandIcon {...props} />;
    case 'dots':
      return <DotsIcon {...props} />;
    case 'delete':
      return <DeleteIcon {...props} />;
    case 'route':
      return <RouteIcon {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
