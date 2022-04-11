interface CheckIconProps {
  className?: string;
}

const CheckIcon = ({ className }: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
      className={className}
    >
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
};

export default CheckIcon;
