import { IconProps } from '../../components/_interfaces';

export const ShipIcon = ({ className, onClick }: IconProps) => {
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      stroke="currentColor"
      className={className ? className : ''}
      viewBox="0 0 121 126"
      onClick={onClick}
    >
      <path d="M56.5555 51.1163C58.2193 50.6678 59.9708 50.6568 61.64 51.0845L116.924 65.2481C119.77 65.9773 121.377 68.9915 120.396 71.761L105.086 114.99C104.475 116.714 102.973 117.967 101.167 118.257L59.0947 125.028L19.9965 118.27C18.215 117.962 16.7385 116.716 16.1349 115.012L0.803118 71.7224C-0.16943 68.9764 1.40213 65.9837 4.21488 65.2255L56.5555 51.1163ZM57.1065 57.721C57.1065 56.4047 55.8569 55.4474 54.586 55.79L31 62.1479L27 63.2262L6.29895 68.8065C5.17385 69.1098 4.54523 70.3068 4.93425 71.4052L19.71 113.125C19.9514 113.807 20.542 114.305 21.2546 114.428L54.7659 120.22C55.9885 120.431 57.1065 119.49 57.1065 118.249V57.721ZM61.1065 118.305C61.1065 119.536 62.2085 120.475 63.4243 120.279L99.9459 114.402C100.668 114.286 101.269 113.785 101.513 113.095L116.261 71.4566C116.653 70.3489 116.01 69.1432 114.872 68.8515L63.6029 55.7166C62.3378 55.3924 61.1065 56.348 61.1065 57.654V118.305Z" />
      <path d="M27 29.5C27 28.3954 27.8954 27.5 29 27.5H93C94.1046 27.5 95 28.3954 95 29.5V63.7604L91 62.7357V32.5C91 31.9477 90.5523 31.5 90 31.5H32C31.4477 31.5 31 31.9477 31 32.5V62.1479L27 63.2262V29.5Z" />
      <path d="M34 20.5C34 19.3954 34.8954 18.5 36 18.5H86.5C87.6046 18.5 88.5 19.3954 88.5 20.5V28H84.5V23.5C84.5 22.9477 84.0523 22.5 83.5 22.5H39C38.4477 22.5 38 22.9477 38 23.5V28H34V20.5Z" />
      <path d="M45.5 41C45.5 42.1046 44.6046 43 43.5 43H37C35.8954 43 35 42.1046 35 41V41C35 39.8954 35.8954 39 37 39H43.5C44.6046 39 45.5 39.8954 45.5 41V41Z" />
      <path d="M65.5 41C65.5 42.1046 64.6046 43 63.5 43H57C55.8954 43 55 42.1046 55 41V41C55 39.8954 55.8954 39 57 39H63.5C64.6046 39 65.5 39.8954 65.5 41V41Z" />
      <path d="M85.5 41C85.5 42.1046 84.6046 43 83.5 43H77C75.8954 43 75 42.1046 75 41V41C75 39.8954 75.8954 39 77 39H83.5C84.6046 39 85.5 39.8954 85.5 41V41Z" />
      <path d="M54 2C54 0.895431 54.8954 0 56 0H65.5C66.6046 0 67.5 0.89543 67.5 2V18.5H63.5V5C63.5 4.44772 63.0523 4 62.5 4H59C58.4477 4 58 4.44771 58 5V18.5H54V2Z" />
    </svg>
  );
};
