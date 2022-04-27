interface DotIconProps {
  className?: string;
}

const DotIcon = ({ className }: DotIconProps) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  );
};

export default DotIcon;
