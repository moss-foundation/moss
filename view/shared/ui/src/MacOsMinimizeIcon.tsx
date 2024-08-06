import { twMerge } from "tailwind-merge";

interface MacOsMinimizeIconProps {
  className?: string;
}

export const MacOsMinimizeIcon = ({ className }: MacOsMinimizeIconProps) => {
  return (
    <svg
      className={twMerge("flex items-center fill-current", className)}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.75 6C9.75 5.58579 9.41421 5.25 9 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6C2.25 6.41421 2.58579 6.75 3 6.75H9C9.41421 6.75 9.75 6.41421 9.75 6Z"
      />
    </svg>
  );
};

export default MacOsMinimizeIcon;
