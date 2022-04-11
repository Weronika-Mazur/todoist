interface PlusIconProps {
  className?: string;
}

const PlusIcon = ({ className }: PlusIconProps) => {
  return (
    <svg
      fill="hsl(233, 14%, 35%)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="12px"
      height="12px"
      fillRule="evenodd"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
      />
    </svg>
  );
};

export default PlusIcon;
