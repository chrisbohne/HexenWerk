type IconName =
  | 'hamburger'
  | 'close'
  | 'slider'
  | 'settings'
  | 'puzzle'
  | 'eraser'
  | 'cursor'
  | 'hand'
  | 'dots'
  | 'delete'
  | 'route'
  | 'pencil'
  | 'cancel'
  | 'check'
  | 'checkSquare'
  | 'square'
  | 'info'
  | 'ship'
  | 'car'
  | 'train'
  | 'plane'
  | 'signpost1'
  | 'signpost2';

export interface IconProps {
  name: IconName;
  onClick?: () => void;
  className?: string;
}
