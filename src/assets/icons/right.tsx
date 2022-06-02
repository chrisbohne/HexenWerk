import { IconProps } from '../../components/_interfaces';

export const RightIcon = ({ className, onClick }: IconProps) => {
  return (
    <svg
      width="2rem"
      height="2rem"
      fill="currentColor"
      stroke="currentColor"
      className={className ? className : ''}
      viewBox="0 0 16 16"
      onClick={onClick}
    >
      <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
    </svg>
  );
};
