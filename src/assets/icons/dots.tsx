import { IconProps } from '../../components/_interfaces';

export const DotsIcon = ({ className, onClick }: IconProps) => {
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
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
};
