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
  PencilIcon,
  CancelIcon,
  CheckIcon,
  SquareIcon,
  CheckSquareIcon,
  Signpost1Icon,
  Signpost2Icon,
  ShipIcon,
  CarIcon,
  TrainIcon,
  PlaneIcon,
  LeftIcon,
  RightIcon,
} from '../../assets/icons';
import { IconProps } from '../_interfaces';

export const Icon = (props: IconProps) => {
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
    case 'pencil':
      return <PencilIcon {...props} />;
    case 'cancel':
      return <CancelIcon {...props} />;
    case 'check':
      return <CheckIcon {...props} />;
    case 'checksquare':
      return <CheckSquareIcon {...props} />;
    case 'square':
      return <SquareIcon {...props} />;
    case 'signpost1':
      return <Signpost1Icon {...props} />;
    case 'signpost2':
      return <Signpost2Icon {...props} />;
    case 'ship':
      return <ShipIcon {...props} />;
    case 'car':
      return <CarIcon {...props} />;
    case 'train':
      return <TrainIcon {...props} />;
    case 'plane':
      return <PlaneIcon {...props} />;
    case 'left':
      return <LeftIcon {...props} />;
    case 'right':
      return <RightIcon {...props} />;
    default:
      return <div />;
  }
};
