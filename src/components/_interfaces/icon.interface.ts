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
  | 'left'
  | 'left'
  | 'right'
  | 'signpost1'
  | 'signpost2';

export interface IconProps {
  name: IconName;
  onClick?: () => void;
  className?: string;
}
