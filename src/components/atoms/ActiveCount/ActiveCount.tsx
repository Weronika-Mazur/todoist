interface ActiveCountProps {
  count?: number;
  className?: string;
}

const ActiveCount = ({ count, className }: ActiveCountProps) => {
  return (
    <p className={`ml-3 font-light text-main-300 px-1 ${className}`}>{count}</p>
  );
};

export default ActiveCount;
